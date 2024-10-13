package com.dergoogler.mmrl.repository

import com.dergoogler.mmrl.datastore.DarkMode
import com.dergoogler.mmrl.datastore.UserPreferencesDataSource
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
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

    suspend fun setRepositoryMenu(value: RepositoryMenuCompat) =
        userPreferencesDataSource.setRepositoryMenu(value)

    suspend fun setModulesMenu(value: ModulesMenuCompat) =
        userPreferencesDataSource.setModulesMenu(value)
}