package dev.dergoogler.mmrl.compat.activity

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.annotation.StringRes
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionContext
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.compose.rememberNavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.compat.PermissionCompat
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.activity.CrashHandlerActivity
import com.dergoogler.mmrl.ui.activity.terminal.action.ActionActivity
import com.dergoogler.mmrl.ui.activity.terminal.install.InstallActivity
import com.dergoogler.mmrl.ui.activity.webui.WebUIActivity
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.theme.AppTheme
import dagger.hilt.android.AndroidEntryPoint
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.core.BrickException
import dev.dergoogler.mmrl.compat.core.MMRLUriHandler
import timber.log.Timber
import javax.inject.Inject
import kotlin.system.exitProcess

@AndroidEntryPoint
open class MMRLComponentActivity : ComponentActivity() {
    @Inject
    lateinit var userPreferencesRepository: UserPreferencesRepository

    @Inject
    lateinit var localRepository: LocalRepository

    @Inject
    lateinit var modulesRepository: ModulesRepository

    open val requirePermissions = listOf<String>()
    var permissionsGranted = true

    /**
     * The window flags to apply to the activity window. These flags will be cleared once the activity is destroyed.
     */
    open val windowFlags: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//
//        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
//            startCrashActivity(thread, throwable)
//        }

        if (windowFlags != 0) {
            Timber.d("Setting window flags")
            this.window.addFlags(windowFlags)
        }

        val granted = if (BuildCompat.atLeastT) {
            PermissionCompat.checkPermissions(
                this,
                requirePermissions
            ).allGranted
        } else {
            true
        }

        if (!granted) {
            PermissionCompat.requestPermissions(this, requirePermissions) { state ->
                permissionsGranted = state.allGranted
            }
        }
    }

    private fun startCrashActivity(thread: Thread, throwable: Throwable) {
        val intent = Intent(this, CrashHandlerActivity::class.java).apply {
            putExtra("message", throwable.message)
            if (throwable is BrickException) {
                putExtra("helpMessage", throwable.helpMessage)
            }
            putExtra("stacktrace", formatStackTrace(throwable))
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        startActivity(intent)
        finish()

        exitProcess(0)
    }

    private fun formatStackTrace(throwable: Throwable, numberOfLines: Int = 88): String {
        val stackTrace = throwable.stackTrace
        val stackTraceElements = stackTrace.joinToString("\n") { it.toString() }

        return if (stackTrace.size > numberOfLines) {
            val trimmedStackTrace =
                stackTraceElements.lines().take(numberOfLines).joinToString("\n")
            val moreCount = stackTrace.size - numberOfLines

            getString(R.string.stack_trace_truncated, trimmedStackTrace, moreCount)
        } else {
            stackTraceElements
        }
    }

    override fun onDestroy() {
        super.onDestroy()

        if (windowFlags != 0) {
            Timber.d("Clearing window flags")
            this.window.clearFlags(windowFlags)
        }
    }

    fun createNotificationChannel(
        channelName: String,
        @StringRes channelTitle: Int,
        @StringRes channelDesc: Int,
    ) {
        val notificationManager =
            applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        val channel = NotificationChannel(
            channelName,
            applicationContext.getString(channelTitle),
            NotificationManager.IMPORTANCE_DEFAULT
        )

        channel.description = applicationContext.getString(channelDesc)

        notificationManager.createNotificationChannel(channel)
    }

    companion object {
        fun startWebUIActivity(context: Context, modId: String) {
            val intent = Intent(context, WebUIActivity::class.java)
                .apply {
                    putExtra("MOD_ID", modId)
                }

            context.startActivity(intent)
        }

        fun startActionActivity(context: Context, module: LocalModule) {
            val intent = Intent(context, ActionActivity::class.java)
                .apply {
                    putExtra("MOD_ID", module.id)
                }

            context.startActivity(intent)
        }

        fun startInstallActivity(context: Context, uri: List<Uri>) {
            val intent = Intent(context, InstallActivity::class.java)
                .apply {
                    putParcelableArrayListExtra("uris", ArrayList(uri))
                }

            context.startActivity(intent)
        }

        fun startInstallActivity(context: Context, uri: Uri) {
            startInstallActivity(context, listOf(uri))
        }
    }
}

fun MMRLComponentActivity.setBaseContent(
    parent: CompositionContext? = null,
    content: @Composable () -> Unit,
) = this.setContent(
    parent = parent,
) {
    val userPreferences by userPreferencesRepository.data.collectAsStateWithLifecycle(
        initialValue = null
    )
    val navController = rememberNavController()

    val preferences = if (userPreferences == null) {
        return@setContent
    } else {
        checkNotNull(userPreferences)
    }

    val context = LocalContext.current

    AppTheme(
        darkMode = preferences.isDarkMode(), themeColor = preferences.themeColor
    ) {
        val toolbarColor = MaterialTheme.colorScheme.surface

        CompositionLocalProvider(
            LocalUserPreferences provides preferences,
            LocalUriHandler provides MMRLUriHandler(context, toolbarColor),
            LocalNavController provides navController
        ) {
            content()
        }
    }
}