package com.dergoogler.mmrl.viewmodel

import android.app.Application
import android.content.BroadcastReceiver
import android.content.Context
import android.content.IntentFilter
import android.net.Uri
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.app.Const.CLEAR_CMD
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.compat.MediaStoreCompat.copyToDir
import com.dergoogler.mmrl.compat.MediaStoreCompat.getPathForUri
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.activity.terminal.Actions
import com.dergoogler.mmrl.ui.activity.terminal.ShellBroadcastReceiver
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.ext.tmpDir
import dev.dergoogler.mmrl.compat.stub.IShell
import dev.dergoogler.mmrl.compat.stub.IShellCallback
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
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
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {

    val logs = mutableListOf<String>()
    val console = mutableStateListOf<String>()
    var shell = mutableStateOf<IShell?>(null)
        private set
    var event by mutableStateOf(Event.LOADING)
        private set

    val logfile get() = "Install_${LocalDateTime.now()}.log"

    init {
        Timber.d("InstallViewModel initialized")
    }

    private var receiver: BroadcastReceiver? = null

    fun registerReceiver() {
        if (receiver == null) {
            receiver = ShellBroadcastReceiver(context, console, logs)

            val filter = IntentFilter().apply {
                addAction(Actions.SET_LAST_LINE)
                addAction(Actions.REMOVE_LAST_LINE)
                addAction(Actions.CLEAR_TERMINAL)
                addAction(Actions.LOG)
            }

            if (BuildCompat.atLeastT) {
                context.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED)
            } else {
                @Suppress("UnspecifiedRegisterReceiverFlag")
                context.registerReceiver(receiver, filter)
            }
        }
    }

    fun unregisterReceiver() {
        if (receiver == null) {
            Timber.w("ShellBroadcastReceiver is already null")
            return
        }

        context.unregisterReceiver(receiver)
        receiver = null
    }

    private fun IntentFilter.addAction(action: Actions) {
        addAction("${context.packageName}.${action.name}")
    }

    fun reboot(reason: String = "") {
        Compat.moduleManager.reboot(reason)
    }

    suspend fun writeLogsTo(uri: Uri) = withContext(Dispatchers.IO) {
        runCatching {
            context.contentResolver.openOutputStream(uri)?.use {
                it.write(logs.joinToString(separator = "\n").toByteArray())
            }
        }.onFailure {
            Timber.e(it)
        }
    }

    private fun devLog(dev: Boolean): (String) -> Unit {
        return { msg: String ->
            Timber.d(msg)
            if (dev) console.add(msg)
        }
    }

    suspend fun installModules(uris: List<Uri>) = viewModelScope.launch {
        val userPreferences = userPreferencesRepository.data.first()
        event = Event.LOADING
        var allSucceeded = true

        if (!Compat.init(userPreferences.workingMode)) {
            event = Event.FAILED
            console.add("! Service is not available")
            return@launch
        }

        val devLog = devLog(userPreferences.developerMode)

        val bulkModules = uris.mapNotNull { uri ->
            val path = context.getPathForUri(uri)
            val info = Compat.moduleManager.getModuleInfo(path)

            if (info == null) {
                devLog("! Unable to gather module info of file: $path")
                return@mapNotNull null
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

            val result = loadAndInstallModule(uri, bulkModules, devLog)
            if (!result) {
                allSucceeded = false
                console.add("! Installation aborted due to an error")
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
        devLog: (String) -> Unit,
    ): Boolean =
        withContext(Dispatchers.IO) {
            val path = context.getPathForUri(uri)

            devLog("- Path: $path")

            Compat.moduleManager.getModuleInfo(path)?.let {
                devLog("- Module info: $it")
                return@withContext install(path, bulkModules)
            }

            console.add("- Copying zip to temp directory")
            val tmpFile = context.copyToDir(uri, context.tmpDir) ?: run {
                event = Event.FAILED
                console.add("! Copying failed")
                return@withContext false
            }


            val io = context.contentResolver.openInputStream(uri)

            if (io == null) {
                event = Event.FAILED
                console.add("! Copying failed")
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
                console.add("! Unable to gather module info")
                return@withContext false
            } else {
                devLog("- Module info: $moduleInfo")
                return@withContext install(tmpFile.path, bulkModules)

            }
        }

    private suspend fun install(zipPath: String, bulkModules: List<BulkModule>): Boolean =
        withContext(Dispatchers.IO) {
            val zipFile = File(zipPath)
            val userPreferences = userPreferencesRepository.data.first()

            val installationResult = CompletableDeferred<Boolean>()

            val callback = object : IShellCallback.Stub() {
                override fun onStdout(msg: String) {
                    viewModelScope.launch {
                        if (msg.startsWith(CLEAR_CMD)) {
                            console.clear()
                        } else {
                            console.add(msg)
                            logs.add(msg)
                        }
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

            console.add("- Installing ${zipFile.name}")

            val installer = Compat.moduleManager.install(zipPath, bulkModules, callback)
            shell.value = installer
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
