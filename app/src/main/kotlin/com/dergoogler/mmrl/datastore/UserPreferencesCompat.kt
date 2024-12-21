package com.dergoogler.mmrl.datastore

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.theme.Colors
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.thenComposeInvoke
import java.io.File

data class UserPreferencesCompat(
    val workingMode: WorkingMode,
    val darkMode: DarkMode,
    val themeColor: Int,
    val deleteZipFile: Boolean,
    val useDoh: Boolean,
    val downloadPath: File,
    val confirmReboot: Boolean,
    val terminalTextWrap: Boolean,
    val datePattern: String,
    val autoUpdateRepos: Boolean,
    val autoUpdateReposInterval: Int,
    val checkModuleUpdates: Boolean,
    val checkModuleUpdatesInterval: Int,
    val checkAppUpdates: Boolean,
    val checkAppUpdatesPreReleases: Boolean,
    val hideFingerprintInHome: Boolean,
    val homepage: String,
    val developerMode: Boolean,
    val useShellForModuleStateChange: Boolean,
    val useShellForModuleAction: Boolean,
    val webuiAllowRestrictedPaths: Boolean,
    val clearInstallTerminal: Boolean,
    val allowedFsModules: List<String>,
    val allowedKsuModules: List<String>,
    val repositoryMenu: RepositoryMenuCompat,
    val modulesMenu: ModulesMenuCompat,
) {
    constructor(original: UserPreferences) : this(workingMode = original.workingMode,
        darkMode = original.darkMode,
        themeColor = original.themeColor,
        deleteZipFile = original.deleteZipFile,
        useDoh = original.useDoh,
        downloadPath = original.downloadPath.ifEmpty { Const.PUBLIC_DOWNLOADS.absolutePath }
            .let(::File),
        confirmReboot = original.confirmReboot,
        terminalTextWrap = original.terminalTextWrap,
        datePattern = original.datePattern,
        autoUpdateRepos = original.autoUpdateRepos,
        autoUpdateReposInterval = original.autoUpdateReposInterval,
        checkModuleUpdates = original.checkModuleUpdates,
        checkModuleUpdatesInterval = original.checkModuleUpdatesInterval,
        checkAppUpdates = original.checkAppUpdates,
        checkAppUpdatesPreReleases = original.checkAppUpdatesPreReleases,
        hideFingerprintInHome = original.hideFingerprintInHome,
        homepage = original.homepage,
        developerMode = original.developerMode,
        useShellForModuleStateChange = original.useShellForModuleStateChange,
        useShellForModuleAction = original.useShellForModuleAction,
        webuiAllowRestrictedPaths = original.webuiAllowRestrictedPaths,
        clearInstallTerminal = original.clearInstallTerminal,
        allowedFsModules = original.allowedFsModules.split(","),
        allowedKsuModules = original.allowedKsuModules.split(","),
        repositoryMenu = when {
            original.hasRepositoryMenu() -> RepositoryMenuCompat(original.repositoryMenu)
            else -> RepositoryMenuCompat.default()
        },
        modulesMenu = when {
            original.hasModulesMenu() -> ModulesMenuCompat(original.modulesMenu)
            else -> ModulesMenuCompat.default()
        })

    @Composable
    fun isDarkMode() = when (darkMode) {
        DarkMode.ALWAYS_OFF -> false
        DarkMode.ALWAYS_ON -> true
        else -> isSystemInDarkTheme()
    }

    fun toProto(): UserPreferences =
        UserPreferences.newBuilder()
            .setWorkingMode(workingMode)
            .setDarkMode(darkMode)
            .setThemeColor(themeColor).setDeleteZipFile(deleteZipFile)
            .setUseDoh(useDoh)
            .setDownloadPath(downloadPath.path)
            .setConfirmReboot(confirmReboot)
            .setTerminalTextWrap(terminalTextWrap)
            .setDatePattern(datePattern)
            .setAutoUpdateRepos(autoUpdateRepos)
            .setAutoUpdateReposInterval(autoUpdateReposInterval)
            .setCheckModuleUpdates(checkModuleUpdates)
            .setCheckModuleUpdatesInterval(checkModuleUpdatesInterval)
            .setCheckAppUpdates(checkAppUpdates)
            .setCheckAppUpdatesPreReleases(checkAppUpdatesPreReleases)
            .setHideFingerprintInHome(hideFingerprintInHome)
            .setHomepage(homepage)
            .setDeveloperMode(developerMode)
            .setUseShellForModuleStateChange(useShellForModuleStateChange)
            .setUseShellForModuleAction(useShellForModuleAction)
            .setWebuiAllowRestrictedPaths(webuiAllowRestrictedPaths)
            .setClearInstallTerminal(clearInstallTerminal)
            .setAllowedFsModules(allowedFsModules.joinToString(","))
            .setAllowedKsuModules(allowedKsuModules.joinToString(","))
            .setRepositoryMenu(repositoryMenu.toProto())
            .setModulesMenu(modulesMenu.toProto())
            .build()

    /**
     * A generic Composable function to execute a given block based on a provided type parameter [T].
     *
     * @param block A composable lambda that receives a value of type [T].
     *              The block will be invoked with the value determined by the `developerMode` state.
     * @return Unit? Returns the result of invoking the block or `null` if no invocation occurred.
     *
     * This function allows flexibility by using a reified type parameter [T], making it possible to
     * perform type-specific operations at runtime without requiring explicit casting.
     *
     * @see thenComposeInvoke For handling the invocation of the block with the provided developerMode state.
     */
    @Composable
    inline fun <reified T> developerMode(crossinline block: @Composable (T) -> Unit): Unit? =
        this.thenComposeInvoke<T>(developerMode, block)?.invoke()

    companion object {
        fun default() = UserPreferencesCompat(
            workingMode = WorkingMode.FIRST_SETUP,
            darkMode = DarkMode.FOLLOW_SYSTEM,
            themeColor = if (BuildCompat.atLeastS) Colors.Dynamic.id else Colors.Pourville.id,
            deleteZipFile = false,
            useDoh = false,
            downloadPath = Const.PUBLIC_DOWNLOADS,
            confirmReboot = true,
            terminalTextWrap = false,
            datePattern = "d MMMM yyyy",
            autoUpdateRepos = true,
            autoUpdateReposInterval = 6,
            checkModuleUpdates = true,
            checkModuleUpdatesInterval = 2,
            checkAppUpdates = true,
            checkAppUpdatesPreReleases = false,
            hideFingerprintInHome = true,
            homepage = MainScreen.Home.route,
            developerMode = false,
            clearInstallTerminal = true,
            useShellForModuleStateChange = true,
            useShellForModuleAction = true,
            webuiAllowRestrictedPaths = false,
            allowedFsModules = emptyList(),
            allowedKsuModules = emptyList(),
            repositoryMenu = RepositoryMenuCompat.default(),
            modulesMenu = ModulesMenuCompat.default()
        )

        val WorkingMode.isRoot: Boolean
            get() {
                return this == WorkingMode.MODE_MAGISK || this == WorkingMode.MODE_KERNEL_SU || this == WorkingMode.MODE_KERNEL_SU_NEXT || this == WorkingMode.MODE_APATCH
            }

        val WorkingMode.isNonRoot: Boolean
            get() {
                return this == WorkingMode.MODE_NON_ROOT
            }

        val WorkingMode.isSetup: Boolean
            get() {
                return this == WorkingMode.FIRST_SETUP
            }
    }
}