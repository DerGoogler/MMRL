package com.dergoogler.mmrl.ui.activity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import android.content.Context
import android.content.Intent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.material3.Text
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.currentComposer
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.theme.AppTheme
import com.dergoogler.mmrl.viewmodel.ModConfViewModel
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class ModConfActivity : ComponentActivity() {
    @Inject
    lateinit var userPreferencesRepository: UserPreferencesRepository
    private val viewModel: ModConfViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val modId = intent.getStringExtra("MOD_ID") ?: return
        val fixedModId = modId.replace(Regex("[^a-zA-Z0-9._]"), "_")

        setContent {
            val context = LocalContext.current
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
                    viewModel.loadComposablePlugin(
                        context = context,
                        id = modId,
                        fixedModId = fixedModId,
                        composer = currentComposer,
                    )
                }
            }
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