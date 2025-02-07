package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.datastore.DarkMode
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import timber.log.Timber
import java.io.File
import javax.inject.Inject

@HiltViewModel
class SettingsViewModel @Inject constructor(
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

    init {
        Timber.d("SettingsViewModel init")
    }

    val allBlacklistEntriesAsFlow
        get(): List<Blacklist> = runBlocking {
            return@runBlocking localRepository.getAllBlacklistEntriesAsFlow().first()
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

    fun setCheckAppUpdates(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setCheckAppUpdates(value)
        }
    }

    fun setCheckAppUpdatesPreReleases(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setCheckAppUpdatesPreReleases(value)
        }
    }

    fun setHideFingerprintInHome(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setHideFingerprintInHome(value)
        }
    }

    fun setHomepage(value: String) {
        viewModelScope.launch {
            userPreferencesRepository.setHomepage(value)
        }
    }

    fun setWebUiDevUrl(value: String) {
        viewModelScope.launch {
            userPreferencesRepository.setWebUiDevUrl(value)
        }
    }

    fun setDeveloperMode(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setDeveloperMode(value)
        }
    }

    fun setUseWebUiDevUrl(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setUseWebUiDevUrl(value)
        }
    }

    fun setUseShellForModuleStateChange(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setUseShellForModuleStateChange(value)
        }
    }

    fun setUseShellForModuleAction(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setUseShellForModuleAction(value)
        }
    }

    fun setWebuiAllowRestrictedPaths(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setWebuiAllowRestrictedPaths(value)
        }
    }

    fun setClearInstallTerminal(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setClearInstallTerminal(value)
        }
    }

    fun setAllowCancelInstall(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setAllowCancelInstall(value)
        }
    }

    fun setAllowCancelAction(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setAllowCancelAction(value)
        }
    }

    fun setUseShellToLoadWebUIAssets(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setUseShellToLoadWebUIAssets(value)
        }
    }

    fun setBlacklistAlerts(value: Boolean) {
        viewModelScope.launch {
            userPreferencesRepository.setBlacklistAlerts(value)
        }
    }

    fun setInjectEruda(value: List<String>) {
        viewModelScope.launch {
            userPreferencesRepository.setInjectEruda(value)
        }
    }

    fun setAllowedFsModules(value: List<String>) {
        viewModelScope.launch {
            userPreferencesRepository.setAllowedFsModules(value)
        }
    }

    fun setAllowedKsuModules(value: List<String>) {
        viewModelScope.launch {
            userPreferencesRepository.setAllowedKsuModules(value)
        }
    }
}