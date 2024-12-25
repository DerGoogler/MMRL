package com.dergoogler.mmrl.viewmodel

import androidx.lifecycle.ViewModel
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.datastore.UserPreferencesCompat
import com.dergoogler.mmrl.datastore.developerMode
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.ext.isLocalWifiUrl
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

    fun isDomainSafe(userPrefs: UserPreferencesCompat, domain: String): Boolean {
        val default = Const.WEBUI_DOMAIN_SAFE_REGEX.matches(domain)

        return userPrefs.developerMode({ useWebUiDevUrl }, default) {
            webUiDevUrl.isLocalWifiUrl()
        }
    }

    fun domainUrl(userPrefs: UserPreferencesCompat): String {
        val default = "https://mui.kernelsu.org/index.html"

        return userPrefs.developerMode({ useWebUiDevUrl }, default) {
            webUiDevUrl
        }
    }
}
