package com.dergoogler.mmrl.viewmodel

import android.app.Application
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.Compat.moduleManager
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.content.ModuleInfo
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    val isProviderAlive get() = Compat.isAlive
    val platform get() = Compat.platform

    val version
        get() = Compat.get("") {
            with(moduleManager) { "$version (${versionCode})" }
        }

    val stats: ModuleInfo get() = moduleManager.fetchModuleInfo()


    init {
        Timber.d("HomeViewModel init")
    }

    fun reboot(reason: String = "") {
        with(moduleManager) {
            reboot(reason)
        }
    }
}