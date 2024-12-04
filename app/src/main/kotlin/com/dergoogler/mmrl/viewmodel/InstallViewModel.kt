package com.dergoogler.mmrl.viewmodel

import android.content.Context
import android.net.Uri
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.compat.MediaStoreCompat.copyToDir
import com.dergoogler.mmrl.compat.MediaStoreCompat.getPathForUri
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.stub.IInstallCallback
import ext.dergoogler.mmrl.ext.tmpDir
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
    private val localRepository: LocalRepository,
    private val userPreferencesRepository: UserPreferencesRepository,
) : ViewModel() {

    val logs = mutableListOf<String>()
    val console = mutableStateListOf<String>()
    var event by mutableStateOf(Event.LOADING)
        private set

    val logfile get() = "Install_${LocalDateTime.now()}.log"

    init {
        Timber.d("InstallViewModel initialized")
    }

    fun reboot(reason: String = "") {
        Compat.moduleManager.reboot(reason)
    }

    suspend fun writeLogsTo(context: Context, uri: Uri) = withContext(Dispatchers.IO) {
        runCatching {
            context.contentResolver.openOutputStream(uri)?.use {
                it.write(logs.joinToString(separator = "\n").toByteArray())
            }
        }.onFailure {
            Timber.e(it)
        }
    }

    fun installModules(context: Context, uris: List<Uri>) {
        viewModelScope.launch {
            event = Event.LOADING
            var allSucceeded = true

            for (uri in uris) {
                val result = loadAndInstallModule(context, uri)
                if (!result) {
                    allSucceeded = false
                    console.add("- Installation aborted due to an error")
                    break
                }
            }

            event = if (allSucceeded) {
                Event.SUCCEEDED
            } else {
                Event.FAILED
            }
        }
    }

    private suspend fun loadAndInstallModule(context: Context, uri: Uri): Boolean = withContext(Dispatchers.IO) {
        val userPreferences = userPreferencesRepository.data.first()

        if (!Compat.init(userPreferences.workingMode)) {
            event = Event.FAILED
            console.add("- Service is not available")
            return@withContext false
        }

        val path = context.getPathForUri(uri)

        Timber.d("Path: $path")

        Compat.moduleManager.getModuleInfo(path)?.let {
            Timber.d("Module info: $it")
            return@withContext install(path)
        }

        console.add("- Copying zip to temp directory")
        val tmpFile = context.copyToDir(uri, context.tmpDir) ?: run {
            event = Event.FAILED
            console.add("- Copying failed")
            return@withContext false
        }

        context.contentResolver.openInputStream(uri)?.use { input ->
            tmpFile.outputStream().use { output ->
                input.copyTo(output)
            }
        }

        Compat.moduleManager.getModuleInfo(tmpFile.path)?.let {
            Timber.d("Module info: $it")
            return@withContext install(tmpFile.path)
        }

        event = Event.FAILED
        console.add("- Zip parsing failed")
        false
    }

    private suspend fun install(zipPath: String): Boolean = withContext(Dispatchers.IO) {
        val zipFile = File(zipPath)
        val deleteZipFile = userPreferencesRepository.data.first().deleteZipFile

        val installationResult = CompletableDeferred<Boolean>()

        val callback = object : IInstallCallback.Stub() {
            override fun onStdout(msg: String) {
                console.add(msg)
                logs.add(msg)
            }

            override fun onStderr(msg: String) {
                logs.add(msg)
            }

            override fun onSuccess(module: LocalModule?) {
                module?.let(::insertLocal)
                if (deleteZipFile) {
                    deleteBySu(zipPath)
                }
                installationResult.complete(true)
            }

            override fun onFailure() {
                installationResult.complete(false)
            }
        }

        console.add("- Installing ${zipFile.name}")
        Compat.moduleManager.install(zipPath, callback)

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
