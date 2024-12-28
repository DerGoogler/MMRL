package com.dergoogler.mmrl.datastore

import androidx.datastore.core.DataStore
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import javax.inject.Inject

class UserPreferencesDataSource @Inject constructor(
    private val userPreferences: DataStore<UserPreferencesCompat>,
) {
    val data get() = userPreferences.data

    suspend fun setWorkingMode(value: WorkingMode) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                workingMode = value
            )
        }
    }

    suspend fun setDarkTheme(value: DarkMode) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                darkMode = value
            )
        }
    }

    suspend fun setThemeColor(value: Int) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                themeColor = value
            )
        }
    }

    suspend fun setDeleteZipFile(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                deleteZipFile = value
            )
        }
    }

    suspend fun setUseDoh(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                useDoh = value
            )
        }
    }

    suspend fun setDownloadPath(value: File) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                downloadPath = value
            )
        }
    }

    suspend fun setConfirmReboot(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                confirmReboot = value
            )
        }
    }

    suspend fun setTerminalTextWrap(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                terminalTextWrap = value
            )
        }
    }

    suspend fun setDatePattern(value: String) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                datePattern = value
            )
        }
    }

    suspend fun setAutoUpdateRepos(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                autoUpdateRepos = value
            )
        }
    }

    suspend fun setAutoUpdateReposInterval(value: Int) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                autoUpdateReposInterval = value
            )
        }
    }

    suspend fun setCheckModuleUpdates(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                checkModuleUpdates = value
            )
        }
    }

    suspend fun setCheckModuleUpdatesInterval(value: Int) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                checkModuleUpdatesInterval = value
            )
        }
    }

    suspend fun setCheckAppUpdates(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                checkAppUpdates = value
            )
        }
    }

    suspend fun setCheckAppUpdatesPreReleases(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                checkAppUpdatesPreReleases = value
            )
        }
    }

    suspend fun setHideFingerprintInHome(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                hideFingerprintInHome = value
            )
        }
    }

    suspend fun setHomepage(value: String) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                homepage = value
            )
        }
    }

    suspend fun setWebUiDevUrl(value: String) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                webUiDevUrl = value
            )
        }
    }

    suspend fun setDeveloperMode(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                developerMode = value
            )
        }
    }

    suspend fun setUseWebUiDevUrl(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                useWebUiDevUrl = value
            )
        }
    }

    suspend fun setUseShellForModuleStateChange(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                useShellForModuleStateChange = value
            )
        }
    }

    suspend fun setUseShellForModuleAction(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                useShellForModuleAction = value
            )
        }
    }

    suspend fun setWebuiAllowRestrictedPaths(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                webuiAllowRestrictedPaths = value
            )
        }
    }

    suspend fun setClearInstallTerminal(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                clearInstallTerminal = value
            )
        }
    }

    suspend fun setAllowCancelInstall(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                allowCancelInstall = value
            )
        }
    }

    suspend fun setAllowCancelAction(value: Boolean) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                allowCancelAction = value
            )
        }
    }

    suspend fun setAllowedFsModules(value: List<String>) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                allowedFsModules = value
            )
        }
    }

    suspend fun setAllowedKsuModules(value: List<String>) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                allowedKsuModules = value
            )
        }
    }


    suspend fun setRepositoryMenu(value: RepositoryMenuCompat) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                repositoryMenu = value
            )
        }
    }

    suspend fun setModulesMenu(value: ModulesMenuCompat) = withContext(Dispatchers.IO) {
        userPreferences.updateData {
            it.copy(
                modulesMenu = value
            )
        }
    }
}