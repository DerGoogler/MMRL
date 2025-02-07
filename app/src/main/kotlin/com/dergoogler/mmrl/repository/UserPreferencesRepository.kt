package com.dergoogler.mmrl.repository

import com.dergoogler.mmrl.datastore.DarkMode
import com.dergoogler.mmrl.datastore.UserPreferencesDataSource
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
import com.dergoogler.mmrl.datastore.repositories.RepositoriesMenuCompat
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import java.io.File
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class UserPreferencesRepository @Inject constructor(
    private val userPreferencesDataSource: UserPreferencesDataSource
) {
    val data get() = userPreferencesDataSource.data

    suspend fun setWorkingMode(value: WorkingMode) = userPreferencesDataSource.setWorkingMode(value)

    suspend fun setDarkTheme(value: DarkMode) = userPreferencesDataSource.setDarkTheme(value)

    suspend fun setThemeColor(value: Int) = userPreferencesDataSource.setThemeColor(value)

    suspend fun setDeleteZipFile(value: Boolean) = userPreferencesDataSource.setDeleteZipFile(value)

    suspend fun setUseDoh(value: Boolean) = userPreferencesDataSource.setUseDoh(value)

    suspend fun setDownloadPath(value: File) = userPreferencesDataSource.setDownloadPath(value)

    suspend fun setConfirmReboot(value: Boolean) = userPreferencesDataSource.setConfirmReboot(value)

    suspend fun setTerminalTextWrap(value: Boolean) =
        userPreferencesDataSource.setTerminalTextWrap(value)

    suspend fun setDatePattern(value: String) = userPreferencesDataSource.setDatePattern(value)

    suspend fun setAutoUpdateRepos(value: Boolean) =
        userPreferencesDataSource.setAutoUpdateRepos(value)

    suspend fun setAutoUpdateReposInterval(value: Int) =
        userPreferencesDataSource.setAutoUpdateReposInterval(value)

    suspend fun setCheckModuleUpdates(value: Boolean) =
        userPreferencesDataSource.setCheckModuleUpdates(value)

    suspend fun setCheckModuleUpdatesInterval(value: Int) =
        userPreferencesDataSource.setCheckModuleUpdatesInterval(value)

    suspend fun setCheckAppUpdates(value: Boolean) =
        userPreferencesDataSource.setCheckAppUpdates(value)

    suspend fun setCheckAppUpdatesPreReleases(value: Boolean) =
        userPreferencesDataSource.setCheckAppUpdatesPreReleases(value)

    suspend fun setHideFingerprintInHome(value: Boolean) =
        userPreferencesDataSource.setHideFingerprintInHome(value)

    suspend fun setHomepage(value: String) =
        userPreferencesDataSource.setHomepage(value)

    suspend fun setWebUiDevUrl(value: String) =
        userPreferencesDataSource.setWebUiDevUrl(value)

    suspend fun setDeveloperMode(value: Boolean) =
        userPreferencesDataSource.setDeveloperMode(value)

    suspend fun setUseWebUiDevUrl(value: Boolean) =
        userPreferencesDataSource.setUseWebUiDevUrl(value)

    suspend fun setUseShellForModuleStateChange(value: Boolean) =
        userPreferencesDataSource.setUseShellForModuleStateChange(value)

    suspend fun setUseShellForModuleAction(value: Boolean) =
        userPreferencesDataSource.setUseShellForModuleAction(value)

    suspend fun setWebuiAllowRestrictedPaths(value: Boolean) =
        userPreferencesDataSource.setWebuiAllowRestrictedPaths(value)

    suspend fun setClearInstallTerminal(value: Boolean) =
        userPreferencesDataSource.setClearInstallTerminal(value)

    suspend fun setAllowCancelInstall(value: Boolean) =
        userPreferencesDataSource.setAllowCancelInstall(value)

    suspend fun setAllowCancelAction(value: Boolean) =
        userPreferencesDataSource.setAllowCancelAction(value)

    suspend fun setUseShellToLoadWebUIAssets(value: Boolean) =
        userPreferencesDataSource.setUseShellToLoadWebUIAssets(value)

    suspend fun setBlacklistAlerts(value: Boolean) =
        userPreferencesDataSource.setBlacklistAlerts(value)

    suspend fun setInjectEruda(value: List<String>) =
        userPreferencesDataSource.setInjectEruda(value)

    suspend fun setAllowedFsModules(value: List<String>) =
        userPreferencesDataSource.setAllowedFsModules(value)

    suspend fun setAllowedKsuModules(value: List<String>) =
        userPreferencesDataSource.setAllowedKsuModules(value)

    suspend fun setRepositoryMenu(value: RepositoryMenuCompat) =
        userPreferencesDataSource.setRepositoryMenu(value)

    suspend fun setRepositoriesMenu(value: RepositoriesMenuCompat) =
        userPreferencesDataSource.setRepositoriesMenu(value)

    suspend fun setModulesMenu(value: ModulesMenuCompat) =
        userPreferencesDataSource.setModulesMenu(value)
}