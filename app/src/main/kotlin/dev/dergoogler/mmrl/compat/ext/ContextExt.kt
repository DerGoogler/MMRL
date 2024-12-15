package dev.dergoogler.mmrl.compat.ext

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.core.app.ShareCompat
import androidx.core.content.pm.PackageInfoCompat
import com.dergoogler.mmrl.R
import com.topjohnwu.superuser.Shell

val Context.tmpDir
    get() = cacheDir.resolve("tmp")
        .apply {
            if (!exists()) mkdirs()
        }

fun Context.shareText(text: String, type: String = "text/plain") {
    ShareCompat.IntentBuilder(this)
        .setType(type)
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