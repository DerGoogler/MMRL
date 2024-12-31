package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.datastore.repository.Option
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.state.OnlineState
import com.dergoogler.mmrl.model.state.OnlineState.Companion.createState
import com.dergoogler.mmrl.model.state.RepoState
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.navigation.graphs.RepositoriesScreen
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.ext.toDecodedUrl
import dev.dergoogler.mmrl.compat.ext.toEncodedUrl
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class RepositoryViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
    savedStateHandle: SavedStateHandle,
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    val isProviderAlive get() = Compat.isAlive

    private val repositoryMenu
        get() = userPreferencesRepository.data
            .map { it.repositoryMenu }

    var isSearch by mutableStateOf(false)
        private set
    private val keyFlow = MutableStateFlow("")
    val query get() = keyFlow.asStateFlow()

    private val repoUrl = getRepoUrl(savedStateHandle)

    private val cacheFlow = MutableStateFlow(listOf<Pair<OnlineState, OnlineModule>>())
    private val onlineFlow = MutableStateFlow(listOf<Pair<OnlineState, OnlineModule>>())
    val online get() = onlineFlow.asStateFlow()

    private val onlineAllFlow = MutableStateFlow(listOf<Pair<OnlineState, OnlineModule>>())
    val onlineAll get() = onlineAllFlow.asStateFlow()

    var isLoading by mutableStateOf(true)
        private set

    init {
        Timber.d("RepositoryViewModel init")
        dataObserverAll()
        dataObserver()
        keyObserver()
    }

    private fun dataObserverAll() {
        combine(
            localRepository.getOnlineAllAsFlow()
        ) { list ->
            onlineAllFlow.value = list.first().map {
                it.createState(
                    local = localRepository.getLocalByIdOrNull(it.id),
                    hasUpdatableTag = localRepository.hasUpdatableTag(it.id)
                ) to it
            }

            isLoading = false
        }.launchIn(viewModelScope)
    }

    private fun dataObserver() {
        val onlineModules = if (repoUrl != null) {
            localRepository.getOnlineAllByUrlAsFlow(repoUrl)
        } else {
            localRepository.getOnlineAllAsFlow()
        }

        combine(
            onlineModules,
            repositoryMenu
        ) { list, menu ->
            cacheFlow.value = list.map {
                it.createState(
                    local = localRepository.getLocalByIdOrNull(it.id),
                    hasUpdatableTag = localRepository.hasUpdatableTag(it.id)
                ) to it
            }.sortedWith(
                comparator(menu.option, menu.descending)
            ).let { v ->
                val a = if (menu.pinInstalled) {
                    v.sortedByDescending { it.first.installed }
                } else {
                    v
                }

                if (menu.pinUpdatable) {
                    a.sortedByDescending { it.first.updatable }
                } else {
                    a
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
                key.startsWith("category:", ignoreCase = true) -> key.removePrefix("category:")
                else -> key
            }.trim()

            onlineFlow.value = source.filter { (_, m) ->
                if (key.isNotBlank() || newKey.isNotBlank()) {
                    when {
                        key.startsWith("id:", ignoreCase = true) ->
                            m.id.equals(newKey, ignoreCase = true)

                        key.startsWith("name:", ignoreCase = true) ->
                            m.name.equals(newKey, ignoreCase = true)

                        key.startsWith("author:", ignoreCase = true) ->
                            m.author.equals(newKey, ignoreCase = true)

                        key.startsWith("category:", ignoreCase = true) ->
                            m.categories?.any {
                                it.equals(
                                    newKey,
                                    ignoreCase = true
                                )
                            } ?: false

                        else ->
                            m.name.contains(key, ignoreCase = true) ||
                                    m.author.contains(key, ignoreCase = true) ||
                                    m.description.contains(key, ignoreCase = true)
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
    ): Comparator<Pair<OnlineState, OnlineModule>> = if (descending) {
        when (option) {
            Option.NAME -> compareByDescending { it.second.name.lowercase() }
            Option.UPDATED_TIME -> compareBy { it.first.lastUpdated }
            else -> compareByDescending { null }
        }

    } else {
        when (option) {
            Option.NAME -> compareBy { it.second.name.lowercase() }
            Option.UPDATED_TIME -> compareByDescending { it.first.lastUpdated }
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

    fun setRepositoryMenu(value: RepositoryMenuCompat) {
        viewModelScope.launch {
            userPreferencesRepository.setRepositoryMenu(value)
        }
    }

    companion object {
        fun putSearch(type: String, value: String, repoUrl: String) =
            RepositoriesScreen.RepoSearch.route
                .replace(
                    "{type}", type.toEncodedUrl(),
                    ignoreCase = true
                )
                .replace(
                    "{value}", value.toEncodedUrl(),
                    ignoreCase = true
                )
                .replace(
                    "{repoUrl}", repoUrl.toEncodedUrl(),
                    ignoreCase = true
                )

        fun putRepo(repo: RepoState, route: String = RepositoriesScreen.RepositoryView.route) =
            route.replace(
                "{repoUrl}", repo.url.toEncodedUrl()
            ).replace(
                "{repoName}", repo.name.toEncodedUrl()
            )

        fun getRepoUrl(savedStateHandle: SavedStateHandle): String? {
            val url: String = savedStateHandle["repoUrl"] ?: return null
            return url.toDecodedUrl()
        }
    }
}