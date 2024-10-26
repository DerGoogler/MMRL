package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.datastore.DarkMode
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import ext.dergoogler.mmrl.viewmodel.MMRLViewModel
import kotlinx.coroutines.launch
import timber.log.Timber
import java.io.File
import javax.inject.Inject

@HiltViewModel
class SettingsViewModel @Inject constructor(
    application: Application,
    userPreferencesRepository: UserPreferencesRepository
) : MMRLViewModel(application, userPreferencesRepository) {
    val isProviderAlive get() = Compat.isAlive

    val version
        get() = Compat.get("") {
            with(moduleManager) { "$version (${versionCode})" }
        }

    init {
        Timber.d("SettingsViewModel init")
    }

    fun setWorkingMode(value: WorkingMode) {
        viewModelScope.launch {
            userPreferencesRepository.setWorkingMode(value)
        }
    }

    fun setDarkTheme(value: DarkMode) {
        viewModelScope.launch {
            userPreferencesRepository.setDarkTheme(value)
        }
    }

    fun setThemeColor(value: Int) {
        viewModelScope.launch {
            userPreferencesRepository.setThemeColor(value)
        }
    }

    fun setDeleteZipFile(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setDeleteZipFile(value)
        }
    }

    fun setUseDoh(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setUseDoh(value)
        }
    }

    fun setDownloadPath(value: File) {
        viewModelScope.launch {
            userPreferencesRepository.setDownloadPath(value)
        }
    }

    fun setConfirmReboot(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setConfirmReboot(value)
        }
    }

    fun setTerminalTextWrap(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setTerminalTextWrap(value)
        }
    }

    fun setDatePattern(value: String) {
        viewModelScope.launch {
            userPreferencesRepository.setDatePattern(value)
        }
    }

    fun setAutoUpdateRepos(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setAutoUpdateRepos(value)
        }
    }

    fun setAutoUpdateReposInterval(value: Int) {
        viewModelScope.launch {
            userPreferencesRepository.setAutoUpdateReposInterval(value)
        }
    }

    fun setCheckModuleUpdates(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setCheckModuleUpdates(value)
        }
    }

    fun setCheckModuleUpdatesInterval(value: Int) {
        viewModelScope.launch {
            userPreferencesRepository.setCheckModuleUpdatesInterval(value)
        }
    }
}