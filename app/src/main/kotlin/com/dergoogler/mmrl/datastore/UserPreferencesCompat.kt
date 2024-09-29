package com.dergoogler.mmrl.datastore

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import com.dergoogler.mmrl.app.Const
import dev.dergoogler.mmrl.compat.BuildCompat
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import com.dergoogler.mmrl.ui.theme.Colors
import java.io.File

data class UserPreferencesCompat(
    val workingMode: WorkingMode,
    val darkMode: DarkMode,
    val themeColor: Int,
    val deleteZipFile: Boolean,
    val useDoh: Boolean,
    val downloadPath: File,
    val confirmReboot: Boolean,
    val repositoryMenu: RepositoryMenuCompat,
    val modulesMenu: ModulesMenuCompat
) {
    constructor(original: UserPreferences) : this(
        workingMode = original.workingMode,
        darkMode = original.darkMode,
        themeColor = original.themeColor,
        deleteZipFile = original.deleteZipFile,
        useDoh = original.useDoh,
        downloadPath = original.downloadPath.ifEmpty{ Const.PUBLIC_DOWNLOADS.absolutePath }.let(::File),
        confirmReboot = original.confirmReboot,
        repositoryMenu = when {
            original.hasRepositoryMenu() -> RepositoryMenuCompat(original.repositoryMenu)
            else -> RepositoryMenuCompat.default()
        },
        modulesMenu = when {
            original.hasModulesMenu() -> ModulesMenuCompat(original.modulesMenu)
            else -> ModulesMenuCompat.default()
        }
    )

    @Composable
    fun isDarkMode() = when (darkMode) {
        DarkMode.ALWAYS_OFF -> false
        DarkMode.ALWAYS_ON -> true
        else -> isSystemInDarkTheme()
    }

    fun toProto(): UserPreferences = UserPreferences.newBuilder()
        .setWorkingMode(workingMode)
        .setDarkMode(darkMode)
        .setThemeColor(themeColor)
        .setDeleteZipFile(deleteZipFile)
        .setUseDoh(useDoh)
        .setDownloadPath(downloadPath.path)
        .setConfirmReboot(confirmReboot)
        .setRepositoryMenu(repositoryMenu.toProto())
        .setModulesMenu(modulesMenu.toProto())
        .build()

    companion object {
        fun default() = UserPreferencesCompat(
            workingMode = WorkingMode.FIRST_SETUP,
            darkMode = DarkMode.FOLLOW_SYSTEM,
            themeColor = if (BuildCompat.atLeastS) Colors.Dynamic.id else Colors.Pourville.id,
            deleteZipFile = false,
            useDoh = false,
            downloadPath = Const.PUBLIC_DOWNLOADS,
            confirmReboot = true,
            repositoryMenu = RepositoryMenuCompat.default(),
            modulesMenu = ModulesMenuCompat.default()
        )

        val WorkingMode.isRoot: Boolean get() {
            return this == WorkingMode.MODE_ROOT ||this == WorkingMode.MODE_SHIZUKU
        }

        val WorkingMode.isNonRoot: Boolean get() {
            return this == WorkingMode.MODE_NON_ROOT
        }

        val WorkingMode.isSetup: Boolean get() {
            return this == WorkingMode.FIRST_SETUP
        }
    }
}