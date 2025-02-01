package com.dergoogler.mmrl.viewmodel

import android.app.Application
import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
import com.dergoogler.mmrl.datastore.repository.Option
import com.dergoogler.mmrl.model.json.UpdateJson
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.State
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.service.DownloadService
import com.dergoogler.mmrl.utils.Utils
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.content.ModuleCompatibility
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import timber.log.Timber
import java.io.File
import javax.inject.Inject

data class ModulesScreenState(
    val items: List<LocalModule> = listOf(),
    val isRefreshing: Boolean = false,
)

@HiltViewModel
class ModulesViewModel @Inject constructor(
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
    application: Application,
) : MMRLViewModel(
    application = application,
    localRepository = localRepository,
    modulesRepository = modulesRepository,
    userPreferencesRepository = userPreferencesRepository
) {
    val isProviderAlive get() = Compat.isAlive
    val platform get() = Compat.platform

    val moduleCompatibility
        get() = Compat.get(
            ModuleCompatibility(
                hasMagicMount = false,
                canRestoreModules = false
            )
        ) {
            with(moduleManager) {
                moduleCompatibility
            }
        }

    fun getBlacklist(id: String?) = runBlocking { getBlacklistById(id) }

    private val modulesMenu
        get() = userPreferencesRepository.data
            .map { it.modulesMenu }

    var isSearch by mutableStateOf(false)
        private set
    private val keyFlow = MutableStateFlow("")
    val query get() = keyFlow.asStateFlow()

    private val cacheFlow = MutableStateFlow(listOf<LocalModule>())
    private val localFlow = MutableStateFlow(listOf<LocalModule>())
    val local get() = localFlow.asStateFlow()

    var isLoading by mutableStateOf(true)
        private set

    private val versionItemCache = mutableStateMapOf<String, VersionItem?>()

    private val opsTasks = mutableStateListOf<String>()
    private val opsCallback = object : IModuleOpsCallback.Stub() {
        override fun onSuccess(id: String) {
            viewModelScope.launch {
                modulesRepository.getLocal(id)
                opsTasks.remove(id)
            }
        }

        override fun onFailure(id: String, msg: String?) {
            opsTasks.remove(id)
            Timber.w("$id: $msg")
        }
    }

    init {
        Timber.d("ModulesViewModel init")
        providerObserver()
        dataObserver()
        keyObserver()
    }

    private fun providerObserver() {
        Compat.isAliveFlow
            .onEach {
                if (it) getLocalAll()

            }.launchIn(viewModelScope)
    }

    private val _isRefreshing = MutableStateFlow(false)

    val screenState: StateFlow<ModulesScreenState> = localRepository.getLocalAllAsFlow()
        .combine(_isRefreshing) { items, isRefreshing ->
            ModulesScreenState(items = items, isRefreshing = isRefreshing)
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = ModulesScreenState()
        )

    fun onPullToRefreshTrigger() {
        _isRefreshing.update { true }
        viewModelScope.launch {
            providerObserver()
            dataObserver()
            keyObserver()
            delay(1000L)
            _isRefreshing.update { false }
        }
    }

    private fun dataObserver() {
        combine(
            localRepository.getLocalAllAsFlow(),
            modulesMenu
        ) { list, menu ->
            if (list.isEmpty()) return@combine

            cacheFlow.value = list.sortedWith(
                comparator(menu.option, menu.descending)
            ).let { v ->
                val a = if (menu.pinEnabled) {
                    v.sortedByDescending { it.state == State.ENABLE }
                } else {
                    v
                }

                val b = if (menu.pinAction) {
                    a.sortedByDescending { it.features.action }
                } else {
                    a
                }

                if (menu.pinWebUI) {
                    b.sortedByDescending { it.features.webui }
                } else {
                    b
                }
            }

            isLoading = false

        }.launchIn(viewModelScope)
    }

    private fun keyObserver() {
        combine(
            keyFlow,
            cacheFlow
        ) { key, source ->
            val newKey = when {
                key.startsWith("id:", ignoreCase = true) -> key.removePrefix("id:")
                key.startsWith("name:", ignoreCase = true) -> key.removePrefix("name:")
                key.startsWith("author:", ignoreCase = true) -> key.removePrefix("author:")
                else -> key
            }.trim()

            localFlow.value = source.filter {
                if (key.isNotBlank() || newKey.isNotBlank()) {
                    when {
                        key.startsWith("id:", ignoreCase = true) ->
                            it.id.equals(newKey, ignoreCase = true)

                        key.startsWith("name:", ignoreCase = true) ->
                            it.name.equals(newKey, ignoreCase = true)

                        key.startsWith("author:", ignoreCase = true) ->
                            it.author.equals(newKey, ignoreCase = true) ?: false

                        else ->
                            it.name.contains(key, ignoreCase = true) ||
                                    it.author.contains(key, ignoreCase = true) ||
                                    it.description.contains(key, ignoreCase = true)
                    }
                } else {
                    true
                }
            }
        }.launchIn(viewModelScope)
    }

    private fun comparator(
        option: Option,
        descending: Boolean,
    ): Comparator<LocalModule> = if (descending) {
        when (option) {
            Option.NAME -> compareByDescending { it.name.lowercase() }
            Option.UPDATED_TIME -> compareBy { it.lastUpdated }
            else -> compareByDescending { null }
        }

    } else {
        when (option) {
            Option.NAME -> compareBy { it.name.lowercase() }
            Option.UPDATED_TIME -> compareByDescending { it.lastUpdated }
            else -> compareByDescending { null }
        }
    }

    fun search(key: String) {
        keyFlow.value = key
    }

    fun openSearch() {
        isSearch = true
    }

    fun closeSearch() {
        isSearch = false
        keyFlow.value = ""
    }

    private fun getLocalAll() {
        viewModelScope.launch {
            modulesRepository.getLocalAll()
        }
    }

    fun setModulesMenu(value: ModulesMenuCompat) {
        viewModelScope.launch {
            userPreferencesRepository.setModulesMenu(value)
        }
    }

    fun createModuleOps(useShell: Boolean, module: LocalModule) = when (module.state) {
        State.ENABLE -> ModuleOps(
            isOpsRunning = opsTasks.contains(module.id),
            toggle = {
                opsTasks.add(module.id)
                Compat.moduleManager
                    .disable(module.id, useShell, opsCallback)
            },
            change = {
                opsTasks.add(module.id)
                Compat.moduleManager
                    .remove(module.id, useShell, opsCallback)
            }
        )

        State.DISABLE -> ModuleOps(
            isOpsRunning = opsTasks.contains(module.id),
            toggle = {
                opsTasks.add(module.id)
                Compat.moduleManager
                    .enable(module.id, useShell, opsCallback)
            },
            change = {
                opsTasks.add(module.id)
                Compat.moduleManager
                    .remove(module.id, useShell, opsCallback)
            }
        )

        State.REMOVE -> ModuleOps(
            isOpsRunning = opsTasks.contains(module.id),
            toggle = {},
            change = {
                opsTasks.add(module.id)
                Compat.moduleManager
                    .enable(module.id, useShell, opsCallback)
            }
        )

        State.UPDATE -> ModuleOps(
            isOpsRunning = opsTasks.contains(module.id),
            toggle = {},
            change = {}
        )
    }

    @Composable
    fun getVersionItem(module: LocalModule): VersionItem? {
        val item by remember {
            derivedStateOf { versionItemCache[module.id] }
        }

        LaunchedEffect(key1 = module) {
            if (!localRepository.hasUpdatableTag(module.id)) {
                versionItemCache.remove(module.id)
                return@LaunchedEffect
            }

            if (versionItemCache.containsKey(module.id)) return@LaunchedEffect

            val versionItem = if (module.updateJson.isNotBlank()) {
                UpdateJson.loadToVersionItem(module.updateJson)
            } else {
                localRepository.getVersionById(module.id)
                    .firstOrNull()
            }

            versionItemCache[module.id] = versionItem
        }

        return item
    }

    fun downloader(
        context: Context,
        module: LocalModule,
        item: VersionItem,
        onSuccess: (File) -> Unit,
    ) {
        viewModelScope.launch {
            val downloadPath = userPreferencesRepository.data
                .first().downloadPath

            val filename = Utils.getFilename(
                name = module.name,
                version = item.version,
                versionCode = item.versionCode,
                extension = "zip"
            )

            val task = DownloadService.TaskItem(
                key = item.hashCode(),
                url = item.zipUrl,
                filename = filename,
                title = module.name,
                desc = item.versionDisplay
            )

            val listener = object : DownloadService.IDownloadListener {
                override fun getProgress(value: Float) {}
                override fun onSuccess() {
                    onSuccess(downloadPath.resolve(filename))
                }

                override fun onFailure(e: Throwable) {
                    Timber.d(e)
                }
            }

            DownloadService.start(
                context = context,
                task = task,
                listener = listener
            )
        }
    }

    @Composable
    fun getProgress(item: VersionItem?): Float {
        val progress by DownloadService.getProgressByKey(item.hashCode())
            .collectAsStateWithLifecycle(initialValue = 0f)

        return progress
    }

    data class ModuleOps(
        val isOpsRunning: Boolean,
        val toggle: (Boolean) -> Unit,
        val change: () -> Unit,
    )
}