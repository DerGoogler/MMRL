package com.dergoogler.mmrl.viewmodel

import android.app.Application
import android.os.Bundle
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.Platform
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.ext.isNotNull
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import timber.log.Timber

@HiltViewModel(assistedFactory = ModulePermissionsViewModel.Factory::class)
class ModulePermissionsViewModel @AssistedInject constructor(
    @Assisted arguments: Bundle,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
    application: Application,
) : MMRLViewModel(
    localRepository = localRepository,
    modulesRepository = modulesRepository,
    userPreferencesRepository = userPreferencesRepository,
    application = application,
) {
    val isProviderAlive get() = Compat.isAlive

    val platform: Platform
        get() = Compat.platform

    private val moduleId = arguments.getString("moduleId")

    var local: LocalModule? by mutableStateOf(null)
        private set
    var allLocal: List<LocalModule> by mutableStateOf(listOf<LocalModule>())
        private set

    init {
        Timber.d("ModulePermissionsViewModel init: $moduleId")
        loadData()
    }

    private fun loadData() = viewModelScope.launch {
        if (moduleId.isNotNull()) {
            localRepository.getLocalByIdOrNull(moduleId)?.let {
                local = it
            }
        }

        allLocal = localRepository.getLocalAllAsFlow().first()
    }

    @AssistedFactory
    interface Factory {
        fun create(arguments: Bundle): ModulePermissionsViewModel
    }
}