package com.dergoogler.mmrl.viewmodel

import android.annotation.SuppressLint
import android.content.Context
import android.content.res.AssetManager
import android.graphics.drawable.Drawable
import android.os.Build
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Composer
import androidx.lifecycle.ViewModel
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.Compat
import dagger.hilt.android.lifecycle.HiltViewModel
import dalvik.system.DexClassLoader
import ext.dergoogler.mmrl.findFileGlob
import timber.log.Timber
import java.io.File
import java.io.IOException
import java.nio.file.FileSystems
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import javax.inject.Inject


@HiltViewModel
class ModConfViewModel @Inject constructor(
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

    @SuppressLint("PrivateApi")
    fun loadComposablePlugin(
        context: Context,
        isDebug: Boolean,
        id: String,
        fixedModId: String,
        composer: Composer,
        hash: Int
    ): Composable? {
        return try {
            val optimizedDir = File(context.cacheDir, "dex_optimized").apply { mkdirs() }

            val dexFilePath: Path = if (isDebug) {
                context.filesDir.path.findFileGlob(fixedModId)
            } else {
                if (Build.SUPPORTED_64_BIT_ABIS.isNotEmpty()) {
                    "/system/lib64".findFileGlob(fixedModId)
                } else {
                    "/system/lib".findFileGlob(fixedModId)
                }
            } ?: return null


            val dexFile = dexFilePath.toFile()
            val isAPK = getFileExtension(dexFile).equals("apk", ignoreCase = true)

            Timber.d("Dex file type: ${getFileExtension(dexFile)}")
            Timber.d("Dex file path: ${dexFile.path}")

            try {
                dexFile.setReadOnly()
            } catch (e: Exception) {
                Timber.e("Unable to set readonly to ${dexFile.path}: %s", e)
            }

            val classLoader = DexClassLoader(
                dexFile.path, optimizedDir.absolutePath, null, context.classLoader
            )

            val pluginClassName = "com.dergoogler.modconf.$fixedModId.ModConfScreenKt"
            pluginClass = classLoader.loadClass(pluginClassName)

            setField("isProviderAlive", isProviderAlive)
            setField("managerName", managerName)
            setField("versionName", versionName)
            setField("versionCode", versionCode)
            setField("modId", id)
            setField("fixedModId", fixedModId)
            setField("mmrlPackageName", BuildConfig.APPLICATION_ID)
            setField("dexFilePath", dexFile.path)

            val pluginInstance = pluginClass.getDeclaredMethod(
                "ModConfScreen", Composer::class.java, Int::class.java
            )

            pluginInstance.isAccessible = true

            pluginInstance.invoke(null, composer, hash) as? Composable
        } catch (e: Exception) {
            Timber.e("Unable to invoke ModConf: %s", e)
            null
        }
    }

    private fun setField(fieldName: String, value: Any?) {
        try {
            val field = pluginClass.getDeclaredField(fieldName)
            field.isAccessible = true
            field.set(null, value)
        } catch (e: Exception) {
            Timber.w("Failed to set field $fieldName: %s", e)
        }
    }

    private fun getFileExtension(file: File): String? {
        val fileName = file.name
        val dotIndex = fileName.lastIndexOf('.')

        return if (dotIndex > 0 && dotIndex < fileName.length - 1) {
            fileName.substring(dotIndex + 1)
        } else {
            null
        }
    }

}
