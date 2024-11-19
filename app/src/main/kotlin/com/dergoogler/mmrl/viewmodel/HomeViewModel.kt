package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.Compat.moduleManager
import com.dergoogler.mmrl.datastore.DarkMode
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import ext.dergoogler.mmrl.viewmodel.MMRLViewModel
import kotlinx.coroutines.launch
import timber.log.Timber
import java.io.File
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    val isProviderAlive get() = Compat.isAlive

    val version
        get() = Compat.get("") {
            with(moduleManager) { "$version (${versionCode})" }
        }

    init {
        Timber.d("HomeViewModel init")
    }

    fun reboot(reason: String = "") {
        with(moduleManager) {
            reboot(reason)
        }
    }
}