package com.dergoogler.mmrl.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.database.entity.Repo.Companion.toRepo
import com.dergoogler.mmrl.model.state.RepoState
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class RepositoriesViewModel @Inject constructor(
    private val localRepository: LocalRepository,
    private val modulesRepository: ModulesRepository
) : ViewModel() {
    private val reposFlow = MutableStateFlow(listOf<RepoState>())
    val repos get() = reposFlow.asStateFlow()

    var isLoading by mutableStateOf(true)
        private set
    var progress by mutableStateOf(false)
        private set

    private inline fun <T> T.refreshing(callback: T.() -> Unit) {
        progress = true
        callback()
        progress = false
    }

    init {
        Timber.d("RepositoriesViewModel init")
        dataObserver()
    }

    private fun dataObserver() {
        localRepository.getRepoAllAsFlow()
            .onEach { list ->
                reposFlow.value = list.map { RepoState(it) }
                    .sortedBy { it.name }

                isLoading = false

            }.launchIn(viewModelScope)
    }

    fun insert(
        url: String,
        onSuccess: (() -> Unit)? = null,
        onFailure: (Throwable) -> Unit,
    ) = viewModelScope.launch {
        refreshing {
            modulesRepository.getRepo(url.toRepo()).apply {
                onFailure(onFailure)
                onSuccess?.let {
                    onSuccess {
                        it()
                    }
                }
            }
        }
    }

    fun update(repo: RepoState) = viewModelScope.launch {
        localRepository.insertRepo(repo.toRepo())
    }

    fun delete(repo: RepoState) = viewModelScope.launch {
        localRepository.deleteRepo(repo.toRepo())
        localRepository.deleteOnlineByUrl(repo.url)
    }

    fun getUpdate(
        repo: RepoState,
        onFailure: (Throwable) -> Unit
    ) = viewModelScope.launch {
        refreshing {
            modulesRepository.getRepo(repo.toRepo())
                .onFailure(onFailure)
        }
    }

    fun getRepoAll() = viewModelScope.launch {
        refreshing {
            modulesRepository.getRepoAll(onlyEnable = false)
        }
    }
}