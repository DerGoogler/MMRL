package ext.dergoogler.mmrl.ext

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.browser.customtabs.CustomTabColorSchemeParams
import androidx.browser.customtabs.CustomTabsIntent
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Composer
import androidx.compose.ui.res.stringResource
import androidx.core.app.ShareCompat
import androidx.core.content.pm.PackageInfoCompat
import com.dergoogler.mmrl.R
import com.topjohnwu.superuser.Shell
import timber.log.Timber

val Context.tmpDir
    get() = cacheDir.resolve("tmp")
        .apply {
            if (!exists()) mkdirs()
        }

fun Context.openUrl(url: String) {
    Intent.parseUri(url, Intent.URI_INTENT_SCHEME).apply {
        startActivity(this)
    }
}

// TODO: add colors from theme
fun Context.launchCustomTab(url: String) {
    try {
        val colorSchemeParams = CustomTabColorSchemeParams.Builder()
            .build()

        val customTabsIntent = CustomTabsIntent.Builder()
            .setDefaultColorSchemeParams(colorSchemeParams)
            .build()

        customTabsIntent.launchUrl(this, Uri.parse(url))
    } catch (activityNotFoundException: Exception) {
        Timber.e(activityNotFoundException, "unable to launch custom tab")
        this.openUrl(url)
    }
}

@get:Composable
val Context.currentComposer
    get(): Composer? {
        return try {
            val composerField = Class.forName("androidx.compose.runtime.ComposerKt")
                .getDeclaredField("currentComposer")
            composerField.isAccessible = true
            composerField.get(null) as? Composer
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

fun Context.shareText(text: String) {
    ShareCompat.IntentBuilder(this)
        .setType("text/plain")
        .setText(text)
        .startChooser()
}

val Context.managerVersion
    get(): Pair<String, Long> {
        return try {
            val packageInfo = this.packageManager.getPackageInfo(this.packageName, 0)
            val versionCode = PackageInfoCompat.getLongVersionCode(packageInfo)
            val versionName = packageInfo.versionName
            Pair(versionName, versionCode)
        } catch (e: Exception) {
            Pair("Unknown", 0)
        }
    }

val Context.seLinuxStatus
    @Composable get(): String {
        val shell = Shell.Builder.create().setFlags(Shell.FLAG_REDIRECT_STDERR).build("sh")

        val list = ArrayList<String>()
        val result = shell.use {
            it.newJob().add("getenforce").to(list, list).exec()
        }
        val output = result.out.joinToString("\n").trim()

        if (result.isSuccess) {
            return when (output) {
                "Enforcing" -> stringResource(R.string.selinux_status_enforcing)
                "Permissive" -> stringResource(R.string.selinux_status_permissive)
                "Disabled" -> stringResource(R.string.selinux_status_disabled)
                else -> stringResource(R.string.selinux_status_unknown)
            }
        }

        return if (output.endsWith("Permission denied")) {
            stringResource(R.string.selinux_status_enforcing)
        } else {
            stringResource(R.string.selinux_status_unknown)
        }
    }