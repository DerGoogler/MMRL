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
        get() = Compat.get("") {
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

    fun createRootShell(globalMnt: Boolean = false, devMode: Boolean = false): Shell {
        Shell.enableVerboseLogging = devMode
        val builder = Shell.Builder.create()
        if (globalMnt) {
            builder.setFlags(Shell.FLAG_MOUNT_MASTER)
        }
        return builder.build()
    }

}
