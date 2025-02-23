package com.dergoogler.mmrl.viewmodel

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import android.os.Process.myUid
import android.webkit.WebView
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.Platform
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.app.moshi
import com.dergoogler.mmrl.datastore.developerMode
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.topjohnwu.superuser.Shell
import dagger.assisted.Assisted
import dagger.assisted.AssistedFactory
import dagger.assisted.AssistedInject
import dagger.hilt.android.lifecycle.HiltViewModel
import dalvik.system.DexClassLoader
import dev.dergoogler.mmrl.compat.ext.isLocalWifiUrl
import dev.dergoogler.mmrl.compat.impl.FilePermissions
import dev.dergoogler.mmrl.compat.stub.IFileManager
import dev.dergoogler.mmrl.compat.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import timber.log.Timber
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

    val fileManager: IFileManager? = Compat.get(null) {
        fileManager
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
    var hasRequestedAdvancedKernelSUAPI by mutableStateOf(false)
    var hasRequestFileSystemAPI by mutableStateOf(false)

    var topInset by mutableStateOf<Int?>(null)
        private set
    var bottomInset by mutableStateOf<Int?>(null)
        private set
    var leftInset by mutableStateOf<Int?>(null)
        private set
    var rightInset by mutableStateOf<Int?>(null)
        private set

    fun initInsets(density: Density, layoutDirection: LayoutDirection, insets: WindowInsets) {
        topInset = (insets.getTop(density) / density.density).toInt()
        bottomInset = (insets.getBottom(density) / density.density).toInt()
        leftInset = (insets.getLeft(density, layoutDirection) / density.density).toInt()
        rightInset = (insets.getRight(density, layoutDirection) / density.density).toInt()
    }

    @SuppressLint("JavascriptInterface")
    fun loadDexPlugins(context: Context, webView: WebView) {
        if (fileManager == null) {
            Timber.e("IFileManager is null! Plugins not loaded.")
            return
        }

        val pluginsListFile = "/data/adb/modules/$modId/webroot/plugins.json"

        if (!fileManager.exists(pluginsListFile)) {
            Timber.w("plugins.json does not exist! Plugins not loaded.")
            return
        }

        val pluginsListJson = fileManager.readText(pluginsListFile)

        val jsonAdapter = moshi.adapter<List<String>>(List::class.java)
        val pluginsList: List<String>? = jsonAdapter.fromJson(pluginsListJson)

        if (pluginsList.isNullOrEmpty()) {
            Timber.d("plugins.json for $modId is invalid or empty! Plugins not loaded.")
            return
        }

        val pluginDir = File(context.filesDir, "plugins")
        val pluginsDirExists = pluginDir.exists()
        Timber.d("pluginDir: $pluginDir -> exists: $pluginsDirExists")
        if (!pluginsDirExists) {
            pluginDir.mkdirs()
            Timber.d("Created plugins directory: $pluginDir")
        }

        pluginDir.listFiles { file ->
            file.extension == "dex" || file.extension == "jar" || file.extension == "apk"
        }?.forEach { dexFile ->

            val uid = myUid()
            fileManager.setOwner(dexFile.path, uid, uid)
            fileManager.setPermissions(dexFile.path, FilePermissions.PERMISSION_444)

            val optimizedDir = File(context.codeCacheDir, "dex_opt")
            val loader = DexClassLoader(
                dexFile.absolutePath,
                optimizedDir.absolutePath,
                null,
                context.classLoader
            )

            try {
                pluginsList.forEach { className ->
                    try {
                        val clazz = loader.loadClass(className)

                        val interfaceName = clazz.getPluginField<String>("interfaceName")
                        val instance = clazz.getPluginMethod<Any>(
                            name = "instance",
                            parameterTypes = listOf(Context::class.java, WebView::class.java),
                            args = listOf(context, webView)
                        )

                        if (interfaceName == null) {
                            Timber.e("Class $className does not have an interfaceName field")
                            return
                        }

                        if (instance == null) {
                            Timber.e("Class $className does not have an instance method")
                            return
                        }

                        clazz.setPluginField("isProviderAlive", isProviderAlive)
                        clazz.setPluginField("rootShell", rootShell)
                        clazz.setPluginField("rootVersionName", versionName)
                        clazz.setPluginField("rootVersionCode", versionCode)
                        clazz.setPluginField("fileManager", fileManager)
                        clazz.setPluginField("rootPlatform", platform)

                        Timber.d("Added plugin $interfaceName from dex file ${dexFile.name}")

                        webView.addJavascriptInterface(
                            instance,
                            interfaceName
                        )
                    } catch (e: ClassNotFoundException) {
                        Timber.e("Class $className not found in dex file ${dexFile.name}")
                    } catch (e: Exception) {
                        Timber.e(
                            "Error instantiating class $className from dex file ${dexFile.name}",
                            e
                        )
                    }
                }
            } catch (e: Exception) {
                Timber.e("Error loading plugin from dex file: ${dexFile.name}", e)
            }
        }
    }

    private fun Class<*>.setPluginField(name: String, value: Any) {
        try {
            val field = getDeclaredField(name)
            field.isAccessible = true
            field.set(null, value)
        } catch (e: Exception) {
            Timber.w("Failed to set field $name in $modId")
        }
    }

    private inline fun <reified T> Class<*>.getPluginField(name: String, instance: Any): T? =
        try {
            getDeclaredField(name).apply { isAccessible = true }.get(instance) as? T
        } catch (e: Exception) {
            null
        }

    private inline fun <reified T> Class<*>.getPluginMethod(
        name: String,
        parameterTypes: List<Class<*>>,
        args: List<Any>,
    ): T? =
        try {
            getDeclaredMethod(name, *parameterTypes.toTypedArray()).apply { isAccessible = true }
                .invoke(null, *args.toTypedArray()) as? T
        } catch (e: Exception) {
            null
        }


    private inline fun <reified T> Class<*>.getPluginField(name: String): T? = try {
        getDeclaredField(name).apply { isAccessible = true }.get(null) as? T
    } catch (e: Exception) {
        null
    }

    @AssistedFactory
    interface Factory {
        fun create(
            modId: String,
        ): WebUIViewModel
    }
}


