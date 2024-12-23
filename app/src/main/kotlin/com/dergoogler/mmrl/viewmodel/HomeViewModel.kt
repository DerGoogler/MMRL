package com.dergoogler.mmrl.viewmodel

import android.app.Application
import android.os.Environment
import android.os.StatFs
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

    val versionName
        get() = Compat.get("") {
            with(moduleManager) { version }
        }

    val versionCode
        get() = Compat.get(0) {
            with(moduleManager) { versionCode }
        }

    val seLinuxContext
        get() = Compat.get("Failed") {
            with(moduleManager) { seLinuxContext }
        }

    val stats: ModuleInfo
        get() = Compat.get(ModuleInfo.EMPTY) {
            with(moduleManager) { fetchModuleInfo() }
        }

    init {
        Timber.d("HomeViewModel init")
        Timber.d("${Compat.isAlive}")
    }

    fun reboot(reason: String = "") {
        with(moduleManager) {
            reboot(reason)
        }
    }

    val totalStorageGB: Long
        get() {
            val statFs = StatFs(Environment.getExternalStorageDirectory().absolutePath)
            val totalBytes = statFs.blockSizeLong * statFs.blockCountLong
            return totalBytes / (1024 * 1024 * 1024)
        }
}