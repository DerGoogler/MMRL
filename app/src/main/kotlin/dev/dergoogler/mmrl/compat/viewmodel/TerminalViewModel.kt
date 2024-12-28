package dev.dergoogler.mmrl.compat.viewmodel

import android.app.Application
import android.content.BroadcastReceiver
import android.content.Context
import android.content.IntentFilter
import android.net.Uri
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.dergoogler.mmrl.app.Const.CLEAR_CMD
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.activity.terminal.Actions
import com.dergoogler.mmrl.ui.activity.terminal.ShellBroadcastReceiver
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.stub.IShell
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import timber.log.Timber
import javax.inject.Inject

open class TerminalViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    internal val logs = mutableListOf<String>()
    internal val console = mutableStateListOf<String>()
    var event by mutableStateOf(Event.LOADING)
        internal set
    var shell by mutableStateOf<IShell?>(null)
        internal set

    private val localFlow = MutableStateFlow<LocalModule?>(null)
    val local get() = localFlow.asStateFlow()

    internal suspend fun initModule(id: String): LocalModule? {
        return localRepository.getLocalByIdOrNullAsFlow(id).map { it }.first()
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

    internal fun log(message: String) {
        if (message.startsWith(CLEAR_CMD)) {
            console.clear()
        } else {
            console.add(message)
            logs.add(message)

        }
    }

    internal fun devLog(dev: Boolean): (String) -> Unit {
        return { message: String ->
            Timber.d(message)
            if (dev) console.add(message)
        }
    }
}
