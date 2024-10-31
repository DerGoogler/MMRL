package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.datastore.repository.Option
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.state.OnlineState
import com.dergoogler.mmrl.model.state.OnlineState.Companion.createState
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import ext.dergoogler.mmrl.viewmodel.MMRLViewModel
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
    userPreferencesRepository: UserPreferencesRepository
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    private val repositoryMenu
        get() = userPreferencesRepository.data
            .map { it.repositoryMenu }

    var isSearch by mutableStateOf(false)
        private set
    private val keyFlow = MutableStateFlow("")
    val query get() = keyFlow.asStateFlow()

    private val cacheFlow = MutableStateFlow(listOf<Pair<OnlineState, OnlineModule>>())
    private val onlineFlow = MutableStateFlow(listOf<Pair<OnlineState, OnlineModule>>())
    val online get() = onlineFlow.asStateFlow()

    var isLoading by mutableStateOf(true)
        private set

    init {
        Timber.d("RepositoryViewModel init")
        dataObserver()
        keyObserver()
    }

    private fun dataObserver() {
        combine(
            localRepository.getOnlineAllAsFlow(),
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
            onlineFlow.value = source
                .filter { (_, m) ->
                    if (key.isNotBlank()) {
                        m.name.contains(key, ignoreCase = true)
                                || m.author.contains(key, ignoreCase = true)
                                || m.description.contains(key, ignoreCase = true)
                    } else {
                        true
                    }
                }

        }.launchIn(viewModelScope)
    }

    private fun comparator(
        option: Option,
        descending: Boolean
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
}