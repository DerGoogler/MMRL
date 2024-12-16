package com.dergoogler.mmrl.viewmodel

import androidx.lifecycle.ViewModel
import com.dergoogler.mmrl.Compat
import com.topjohnwu.superuser.Shell
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject


@HiltViewModel
class WebUIViewModel @Inject constructor(
) : ViewModel() {
    val isProviderAlive get() = Compat.isAlive
    private lateinit var pluginClass: Class<*>

    val versionName: String
        get() = Compat.get("") {
            with(moduleManager) { version }
        }

    val versionCode
        get() = Compat.get(-1) {
            with(moduleManager) { versionCode }
        }

    val managerName: String
        get() = Compat.get("") {
            with(moduleManager) { managerName }
        }

    inline fun <T> withNewRootShell(
        globalMnt: Boolean = false,
        devMode: Boolean = false,
        block: Shell.() -> T,
    ): T {
        return createRootShell(globalMnt, devMode).use(block)
    }

    fun sanitizeModId(id: String): String {
        return id.replace(Regex("[^a-zA-Z0-9._-]"), "_")
    }

    fun sanitizeModIdWithFile(input: String): String {
        return if (input.length >= 2) {
            input[0].uppercase() + input[1].toString()
        } else if (input.isNotEmpty()) {
            input[0].uppercase()
        } else {
            ""
        }
    }

    fun createRootShell(globalMnt: Boolean = false, devMode: Boolean = false): Shell {
        Shell.enableVerboseLogging = devMode
        val builder = Shell.Builder.create()
        if (globalMnt) {
            builder.setFlags(Shell.FLAG_MOUNT_MASTER)
        }
        return builder.build()
    }
}
