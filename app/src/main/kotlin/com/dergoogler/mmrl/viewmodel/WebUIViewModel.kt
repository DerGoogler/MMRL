package com.dergoogler.mmrl.viewmodel

import android.app.Application
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.unit.Density
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.Platform
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.datastore.developerMode
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.topjohnwu.superuser.Shell
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.dergoogler.mmrl.compat.ext.isLocalWifiUrl
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import java.io.File


@HiltViewModel(assistedFactory = WebUIViewModel.Factory::class)
class WebUIViewModel @AssistedInject constructor(
    @Assisted val modId: String,
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : MMRLViewModel(
    application,
    localRepository,
    modulesRepository,
    userPreferencesRepository
) {
    private val userPrefs = runBlocking { userPreferencesRepository.data.first() }

    val isProviderAlive get() = Compat.isAlive

    val versionName: String
        get() = Compat.get("") {
            with(moduleManager) { version }
        }

    val versionCode: Int
        get() = Compat.get(-1) {
            with(moduleManager) { versionCode }
        }

    val platform: Platform
        get() = Compat.get(Platform.EMPTY) {
            platform
        }

    val moduleDir = "/data/adb/modules/$modId"
    val webRoot = File("$moduleDir/webroot")

    val sanitizedModId: String
        get() {
            return modId.replace(Regex("[^a-zA-Z0-9._]"), "_")
        }

    val sanitizedModIdWithFile
        get(): String {
            return "$${
                when {
                    sanitizedModId.length >= 2 -> sanitizedModId[0].uppercase() + sanitizedModId[1]
                    sanitizedModId.isNotEmpty() -> sanitizedModId[0].uppercase()
                    else -> ""
                }
            }File"
        }

    var dialogRequestAdvancedKernelSUAPI by mutableStateOf(false)
    var dialogRequestFileSystemAPI by mutableStateOf(false)

    fun isDomainSafe(domain: String): Boolean {
        val default = Const.WEBUI_DOMAIN_SAFE_REGEX.matches(domain)
        return userPrefs.developerMode({ useWebUiDevUrl }, default) {
            webUiDevUrl.isLocalWifiUrl()
        }
    }

    val domainUrl
        get(): String {
            val default = "https://mui.kernelsu.org/index.html"
            return userPrefs.developerMode({ useWebUiDevUrl }, default) {
                webUiDevUrl
            }
        }

    val rootShell
        get(): Shell {
            return Compat.createRootShell(
                globalMnt = true,
                devMode = userPrefs.developerMode
            )
        }

    var recomposeCount by mutableIntStateOf(0)

    var topInset by mutableStateOf<Int?>(null)
        private set
    var bottomInset by mutableStateOf<Int?>(null)
        private set

    fun initInsets(density: Density, insets: WindowInsets) {
        topInset = (insets.getTop(density) / density.density).toInt()
        bottomInset = (insets.getBottom(density) / density.density).toInt()
    }

    @AssistedFactory
    interface Factory {
        fun create(
            modId: String,
        ): WebUIViewModel
    }
}