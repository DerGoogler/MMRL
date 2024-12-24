package com.dergoogler.mmrl.ui.activity

import android.Manifest
import android.content.ComponentName
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.annotation.RequiresApi
import androidx.compose.animation.Crossfade
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.lifecycleScope
import androidx.navigation.compose.rememberNavController
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.background.BootBroadcastReceiver
import com.dergoogler.mmrl.database.entity.Repo.Companion.toRepo
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isSetup
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.network.NetworkUtils
import com.dergoogler.mmrl.ui.activity.terminal.action.ActionActivity
import com.dergoogler.mmrl.ui.activity.terminal.install.InstallActivity
import com.dergoogler.mmrl.ui.activity.webui.WebUIActivity
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.activity.setBaseContent
import kotlinx.coroutines.launch
import timber.log.Timber

class MainActivity : MMRLComponentActivity() {
    private var isLoading by mutableStateOf(true)

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override val requirePermissions = listOf(Manifest.permission.POST_NOTIFICATIONS)

    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)

        splashScreen.setKeepOnScreenCondition { isLoading }

        createNotificationChannel(
            channelName = REPO_WORKER_CHANNEL_NAME,
            channelTitle = REPO_WORKER_CHANNEL_TITLE,
            channelDesc = REPO_WORKER_CHANNEL_DESC
        )

        createNotificationChannel(
            channelName = MODULE_WORKER_CHANNEL_NAME,
            channelTitle = MODULE_WORKER_CHANNEL_TITLE,
            channelDesc = MODULE_WORKER_CHANNEL_DESC
        )

        setBaseContent {
            val userPreferences by userPreferencesRepository.data
                .collectAsStateWithLifecycle(initialValue = null)

            val preferences = if (userPreferences == null) {
                return@setBaseContent
            } else {
                isLoading = false
                checkNotNull(userPreferences)
            }


            LaunchedEffect(userPreferences) {
                if (preferences.workingMode.isSetup) {
                    Timber.d("add default repository")
                    localRepository.insertRepo(Const.DEMO_REPO_URL.toRepo())
                }

                Compat.init(preferences.workingMode)

                if (!preferences.workingMode.isSetup) BootBroadcastReceiver.startWorkManagers(
                    this@MainActivity,
                    preferences
                )

                NetworkUtils.setEnableDoh(preferences.useDoh)
                setInstallActivityEnabled(preferences.workingMode.isRoot)
                setWebUIActivityEnabled(preferences.workingMode.isRoot)
                setActionActivityEnabled(preferences.workingMode.isRoot)
            }

            Crossfade(
                targetState = preferences.workingMode.isSetup,
                label = "MainActivity"
            ) { isSetup ->
                if (isSetup) {
                    SetupScreen(
                        setMode = ::setWorkingMode
                    )
                } else {
                    MainScreen()
                }
            }
        }
    }

    private fun setWorkingMode(value: WorkingMode) {
        lifecycleScope.launch {
            userPreferencesRepository.setWorkingMode(value)
        }
    }

    private fun setWebUIActivityEnabled(enable: Boolean) {
        val component = ComponentName(
            this, WebUIActivity::class.java
        )

        val state = if (enable) {
            PackageManager.COMPONENT_ENABLED_STATE_ENABLED
        } else {
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED
        }

        packageManager.setComponentEnabledSetting(
            component,
            state,
            PackageManager.DONT_KILL_APP
        )
    }

    private fun setActionActivityEnabled(enable: Boolean) {
        val component = ComponentName(
            this, ActionActivity::class.java
        )

        val state = if (enable) {
            PackageManager.COMPONENT_ENABLED_STATE_ENABLED
        } else {
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED
        }

        packageManager.setComponentEnabledSetting(
            component,
            state,
            PackageManager.DONT_KILL_APP
        )
    }

    private fun setInstallActivityEnabled(enable: Boolean) {
        val component = ComponentName(
            this, InstallActivity::class.java
        )

        val state = if (enable) {
            PackageManager.COMPONENT_ENABLED_STATE_ENABLED
        } else {
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED
        }

        packageManager.setComponentEnabledSetting(
            component,
            state,
            PackageManager.DONT_KILL_APP
        )
    }

    companion object {
        const val REPO_UPDATE_WORK_NAME = "RepoUpdateWork"
        const val REPO_WORKER_ID = 1
        const val REPO_WORKER_CHANNEL_NAME = "RepoUpdateChannel"
        val REPO_WORKER_CHANNEL_TITLE = R.string.work_repository_updates
        val REPO_WORKER_CHANNEL_DESC = R.string.work_updates_for_repositories

        const val MODULE_UPDATE_WORK_NAME = "ModuleUpdateWork"
        const val MODULE_WORKER_ID = 2
        const val MODULE_WORKER_CHANNEL_NAME = "ModuleUpdateChannel"
        val MODULE_WORKER_CHANNEL_TITLE = R.string.work_module_updates
        val MODULE_WORKER_CHANNEL_DESC = R.string.work_update_checker_for_modules
    }
}