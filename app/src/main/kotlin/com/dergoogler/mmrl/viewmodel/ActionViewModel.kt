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
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.activity.terminal.Actions
import com.dergoogler.mmrl.ui.activity.terminal.ShellBroadcastReceiver
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.stub.IShellCallback
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import timber.log.Timber
import java.time.LocalDateTime
import javax.inject.Inject

@HiltViewModel
class ActionViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {

    val logs = mutableListOf<String>()
    val console = mutableStateListOf<String>()
    var event by mutableStateOf(Event.LOADING)
        private set

    val logfile get() = "Action_${LocalDateTime.now()}.log"

    init {
        Timber.d("ActionViewModel initialized")
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

    suspend fun writeLogsTo(uri: Uri) = withContext(Dispatchers.IO) {
        runCatching {
            context.contentResolver.openOutputStream(uri)?.use {
                it.write(logs.joinToString(separator = "\n").toByteArray())
            }
        }.onFailure {
            Timber.e(it)
        }
    }

    suspend fun runAction(modId: String) {
        val userPreferences = userPreferencesRepository.data.first()

        viewModelScope.launch {
            event = Event.LOADING

            if (!Compat.init(userPreferences.workingMode)) {
                event = Event.FAILED
                console.add("- Service is not available")
                return@launch
            }

            val result = action(modId, userPreferences.useShellForModuleAction)

            event = if (result) {
                Event.SUCCEEDED
            } else {
                Event.FAILED
            }
        }
    }

    private suspend fun action(modId: String, legacy: Boolean): Boolean =
        withContext(Dispatchers.IO) {
            val actionResult = CompletableDeferred<Boolean>()

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
                        logs.add(msg)
                    }
                }

                override fun onSuccess(module: LocalModule?) {
                    actionResult.complete(true)
                }

                override fun onFailure() {
                    console.add("- Execution failed. Try to use Shell for the Action execution, Settings > Module > Use Shell for Module Action")
                    actionResult.complete(false)
                }
            }

            Compat.moduleManager.action(modId, legacy, callback)

            return@withContext actionResult.await()
        }

}
