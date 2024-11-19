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
import com.dergoogler.mmrl.Compat.moduleManager
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.compat.MediaStoreCompat.copyToDir
import com.dergoogler.mmrl.compat.MediaStoreCompat.getPathForUri
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import ext.dergoogler.mmrl.ext.tmpDir
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.stub.IInstallCallback
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
        Timber.d("InstallViewModel init")
    }

    fun reboot(reason: String = "") {
        with(moduleManager) {
            reboot(reason)
        }
    }


    suspend fun writeLogsTo(context: Context, uri: Uri) = withContext(Dispatchers.IO) {
        runCatching {
            val cr = context.contentResolver
            cr.openOutputStream(uri)?.use {
                it.write(logs.joinToString(separator = "\n").toByteArray())
            }
        }.onFailure {
            Timber.d(it)
        }
    }

    suspend fun loadModule(context: Context, uri: Uri) = withContext(Dispatchers.IO) {
        val userPreferences = userPreferencesRepository.data.first()

        if (!Compat.init(userPreferences.workingMode)) {
            event = Event.FAILED
            console.add("- Service is not available")
            return@withContext
        }

        val path = context.getPathForUri(uri)
        Timber.d("path = $path")

        Compat.moduleManager
            .getModuleInfo(path)?.let {
                Timber.d("module = $it")
                install(path)

                return@withContext
            }

        console.add("- Copying zip to temp directory")
        val tmpFile = context.copyToDir(uri, context.tmpDir)
        val cr = context.contentResolver
        cr.openInputStream(uri)?.use { input ->
            tmpFile.outputStream().use { output ->
                input.copyTo(output)
            }
        }

        Compat.moduleManager
            .getModuleInfo(tmpFile.path)?.let {
                Timber.d("module = $it")
                install(tmpFile.path)

                return@withContext
            }

        event = Event.FAILED
        console.add("- Zip parsing failed")
    }

    private suspend fun install(zipPath: String) = withContext(Dispatchers.IO) {
        val zipFile = File(zipPath)
        val deleteZipFile = userPreferencesRepository
            .data.first().deleteZipFile

        val callback = object : IInstallCallback.Stub() {
            override fun onStdout(msg: String) {
                console.add(msg)
                logs.add(msg)
            }

            override fun onStderr(msg: String) {
                logs.add(msg)
            }

            override fun onSuccess(module: LocalModule?) {
                event = Event.SUCCEEDED
                module?.let(::insertLocal)

                if (deleteZipFile) {
                    deleteBySu(zipPath)
                }
            }

            override fun onFailure() {
                event = Event.FAILED
            }
        }

        console.add("- Installing ${zipFile.name}")
        Compat.moduleManager.install(zipPath, callback)
    }

    private fun insertLocal(module: LocalModule) {
        viewModelScope.launch {
            localRepository.insertLocal(
                module.copy(state = State.UPDATE)
            )
        }
    }

    private fun deleteBySu(zipPath: String) {
        runCatching {
            Compat.fileManager.deleteOnExit(zipPath)
        }.onFailure {
            Timber.e(it)
        }.onSuccess {
            Timber.d("deleteOnExit: $it")
        }
    }
}