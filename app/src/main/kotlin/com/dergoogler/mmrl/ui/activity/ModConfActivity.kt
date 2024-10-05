package com.dergoogler.mmrl.ui.activity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import android.content.Context
import android.content.Intent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composer
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.currentComposer
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.dergoogler.mmrl.Compat
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.theme.AppTheme
import com.dergoogler.mmrl.viewmodel.InstallViewModel
import com.dergoogler.mmrl.viewmodel.ModConfViewModel
import dalvik.system.DexClassLoader
import dagger.hilt.android.AndroidEntryPoint
import timber.log.Timber
import java.io.File
import javax.inject.Inject

@AndroidEntryPoint
class ModConfActivity : ComponentActivity() {
    @Inject
    lateinit var userPreferencesRepository: UserPreferencesRepository
    private lateinit var pluginClass: Class<*>
    private val viewModel: ModConfViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val modId = intent.getStringExtra("MOD_ID") ?: return
        val fixedModId = modId.replace(Regex("[^a-zA-Z0-9._]"), "_")

        setContent {
            val current = currentComposer
            val userPreferences by userPreferencesRepository.data.collectAsStateWithLifecycle(
                initialValue = null
            )

            val preferences = if (userPreferences == null) {
                return@setContent
            } else {
                checkNotNull(userPreferences)
            }

            CompositionLocalProvider(
                LocalUserPreferences provides preferences
            ) {
                AppTheme(
                    darkMode = preferences.isDarkMode(), themeColor = preferences.themeColor
                ) {
                    loadComposablePlugin(
                        id = modId,
                        fixedModId = fixedModId,
                        composer = current,
                        dexPath = "$fixedModId.dex"
                    )
                }
            }
        }
    }

    private fun loadComposablePlugin(
        id: String, fixedModId: String, composer: Composer, dexPath: String
    ): Composable? {
        return try {
            val optimizedDir = File(this.cacheDir, "dex_optimized").apply { mkdirs() }

            val dexFilePath = File(this.filesDir, dexPath)
            dexFilePath.setReadOnly()

            val classLoader = DexClassLoader(
                dexFilePath.path, optimizedDir.absolutePath, null, this.classLoader
            )

            val pluginClassName = "com.dergoogler.modconf.$fixedModId.ModConfScreenKt"
            pluginClass = classLoader.loadClass(pluginClassName)

            setField("isProviderAlive", viewModel.isProviderAlive)
            setField("managerName", viewModel.managerName)
            setField("versionName", viewModel.versionName)
            setField("versionCode", viewModel.versionCode)
            setField("modId", id)
            setField("fixedModId", fixedModId)

            val pluginInstance = pluginClass.getDeclaredMethod(
                "ModConfScreen", Composer::class.java, Int::class.java
            )

            pluginInstance.isAccessible = true

            pluginInstance.invoke(null, composer, 0) as? Composable
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private fun setField(fieldName: String, value: Any) {
        try {
            val field = pluginClass.getDeclaredField(fieldName)
            field.isAccessible = true
            field.set(null, value)
        } catch (e: Exception) {
            Timber.e(e, "Failed to set field $fieldName")
        }
    }

    companion object {
        fun start(context: Context, modId: String) {
            val intent = Intent(context, ModConfActivity::class.java)
                .apply {
                    putExtra("MOD_ID", modId)
                }

            context.startActivity(intent)
        }
    }
}