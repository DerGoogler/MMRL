package com.dergoogler.mmrl.viewmodel

import androidx.lifecycle.ViewModel
import com.dergoogler.mmrl.Compat
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
}
