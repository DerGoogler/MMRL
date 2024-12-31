package com.dergoogler.mmrl.viewmodel

import android.app.Application
import android.content.Context
import android.os.Environment
import android.os.StatFs
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.Compat.moduleManager
import com.dergoogler.mmrl.model.local.ModuleAnalytics
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
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

    val versionName: String
        get() = Compat.get("") {
            with(moduleManager) { version }
        }

    val versionCode
        get() = Compat.get(0) {
            with(moduleManager) { versionCode }
        }

    val seLinuxContext: String
        get() = Compat.get("Failed") {
            with(moduleManager) {
                seLinuxContext
            }
        }

    fun analytics(context: Context): ModuleAnalytics? = Compat.get(null) {
        with(moduleManager) {
            val local = runBlocking { localRepository.getLocalAllAsFlow().first() }
            return@get ModuleAnalytics(
                context = context,
                local = local,
                fileManager = fileManager
            )
        }
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