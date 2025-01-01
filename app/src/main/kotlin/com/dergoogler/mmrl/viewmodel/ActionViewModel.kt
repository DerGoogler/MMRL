package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.lifecycle.viewModelScope
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.stub.IShellCallback
import dev.dergoogler.mmrl.compat.viewmodel.TerminalViewModel
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
) : TerminalViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    val logfile get() = "Action_${LocalDateTime.now()}.log"

    init {
        Timber.d("ActionViewModel initialized")
    }

    suspend fun runAction(modId: String) {
        val module = localModule(modId)
        val userPreferences = userPreferencesRepository.data.first()

        viewModelScope.launch {
            event = Event.LOADING

            if (!Compat.init(userPreferences.workingMode)) {
                event = Event.FAILED
                log(R.string.service_is_not_available)
                return@launch
            }

            if (module == null) {
                event = Event.FAILED
                log(R.string.module_not_found)
                return@launch
            }

            if (!module.features.action) {
                event = Event.FAILED
                log(R.string.this_module_don_t_have_an_action)
                return@launch
            }

            if (module.state == State.DISABLE || module.state == State.REMOVE) {
                event = Event.FAILED
                log(R.string.module_is_disabled_or_removed_unable_to_execute_action)
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
                        log(msg)
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
                    log(R.string.execution_failed_try_to_use_shell_for_the_action_execution_settings_module_use_shell_for_module_action)
                    actionResult.complete(false)
                }
            }

            val action = Compat.moduleManager.action(modId, legacy, callback)
            shell = action
            action.exec()

            return@withContext actionResult.await()
        }

}
