package com.dergoogler.mmrl.viewmodel

import android.app.Application
import android.net.Uri
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.compat.MediaStoreCompat.copyToDir
import com.dergoogler.mmrl.compat.MediaStoreCompat.getPathForUri
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.ext.tmpDir
import dev.dergoogler.mmrl.compat.stub.IShellCallback
import dev.dergoogler.mmrl.compat.viewmodel.TerminalViewModel
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import timber.log.Timber
import java.io.File
import java.time.LocalDateTime
import javax.inject.Inject

@HiltViewModel
class InstallViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : TerminalViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    val logfile get() = "Install_${LocalDateTime.now()}.log"

    init {
        Timber.d("InstallViewModel initialized")
    }

    fun reboot(reason: String = "") {
        Compat.moduleManager.reboot(reason)
    }

    suspend fun installModules(uris: List<Uri>) = viewModelScope.launch {
        val userPreferences = userPreferencesRepository.data.first()
        event = Event.LOADING
        var allSucceeded = true

        if (!Compat.init(userPreferences.workingMode)) {
            event = Event.FAILED
            log(R.string.service_is_not_available)
            return@launch
        }

        val bulkModules = uris.mapNotNull { uri ->
            val path = context.getPathForUri(uri)
            val info = Compat.moduleManager.getModuleInfo(path)

            if (info == null) {
                devLog(R.string.unable_to_gather_module_info_of_file, path)
                return@mapNotNull null
            }

            val blacklist = getBlacklistById(info.id)
            val isBlacklisted = Blacklist.isBlacklisted(userPreferences.blacklistAlerts, blacklist)
            if (isBlacklisted) {
                event = Event.FAILED
                allSucceeded = false
                log(R.string.cannot_install_blacklisted_modules_settings_security_blacklist_alerts)
                return@launch
            }

            BulkModule(
                id = info.id,
                name = info.name
            )
        }

        for (uri in uris) {
            if (userPreferences.clearInstallTerminal && uris.size > 1) {
                console.clear()
            }

            val result = loadAndInstallModule(uri, bulkModules)
            if (!result) {
                allSucceeded = false
                log(context.getString(R.string.installation_aborted_due_to_an_error))
                break
            }
        }

        event = if (allSucceeded) {
            Event.SUCCEEDED
        } else {
            Event.FAILED
        }
    }

    private suspend fun loadAndInstallModule(
        uri: Uri,
        bulkModules: List<BulkModule>,
    ): Boolean =
        withContext(Dispatchers.IO) {
            val path = context.getPathForUri(uri)

            if (path == null) {
                log(R.string.unable_to_find_path_for_uri, uri)
                return@withContext false
            }

            devLog(R.string.install_view_path, path)

            Compat.moduleManager.getModuleInfo(path)?.let {
                devLog(R.string.install_view_module_info, it.toString())
                return@withContext install(path, bulkModules)
            }

            log(R.string.copying_zip_to_temp_directory)
            val tmpFile = context.copyToDir(uri, context.tmpDir) ?: run {
                event = Event.FAILED
                log(context.getString(R.string.copying_failed))
                return@withContext false
            }


            val io = context.contentResolver.openInputStream(uri)

            if (io == null) {
                event = Event.FAILED
                log(R.string.copying_failed)
                return@withContext false
            }

            io.use { input ->
                tmpFile.outputStream().use { output ->
                    input.copyTo(output)
                }
            }

            val moduleInfo = Compat.moduleManager.getModuleInfo(tmpFile.path)

            if (moduleInfo == null) {
                event = Event.FAILED
                log(R.string.unable_to_gather_module_info)
                return@withContext false
            }

            devLog(R.string.install_view_module_info)
            return@withContext install(tmpFile.path, bulkModules)
        }

    private suspend fun install(zipPath: String, bulkModules: List<BulkModule>): Boolean =
        withContext(Dispatchers.IO) {
            val zipFile = File(zipPath)
            val userPreferences = userPreferencesRepository.data.first()

            val installationResult = CompletableDeferred<Boolean>()

            val callback = object : IShellCallback.Stub() {
                override fun onStdout(msg: String) {
                    viewModelScope.launch {
                        log(msg)
                    }
                }

                override fun onStderr(msg: String) {
                    viewModelScope.launch {
                        if (userPreferences.developerMode) console.add(msg)
                        logs.add(msg)
                    }
                }

                override fun onSuccess(module: LocalModule?) {
                    module?.let(::insertLocal)
                    if (userPreferences.deleteZipFile) {
                        deleteBySu(zipPath)
                    }
                    installationResult.complete(true)
                }

                override fun onFailure() {
                    installationResult.complete(false)
                }
            }

            log(R.string.install_view_installing, zipFile.name)

            val installer = Compat.moduleManager.install(zipPath, bulkModules, callback)
            shell = installer
            installer.exec()

            return@withContext installationResult.await()
        }


    private fun insertLocal(module: LocalModule) {
        viewModelScope.launch {
            localRepository.insertLocal(module.copy(state = State.UPDATE))
        }
    }

    private fun deleteBySu(zipPath: String) {
        runCatching {
            Compat.fileManager.deleteOnExit(zipPath)
        }.onFailure {
            Timber.e(it)
        }.onSuccess {
            Timber.d("Deleted: $zipPath")
        }
    }
}
