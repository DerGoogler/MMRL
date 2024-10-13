package com.dergoogler.mmrl.ui.activity

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.lifecycleScope
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.theme.AppTheme
import ext.dergoogler.mmrl.tmpDir
import com.dergoogler.mmrl.viewmodel.InstallViewModel
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import timber.log.Timber
import javax.inject.Inject

@AndroidEntryPoint
class InstallActivity : ComponentActivity() {
    @Inject lateinit var userPreferencesRepository: UserPreferencesRepository
    private val viewModel: InstallViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.d("InstallActivity onCreate")
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        if (intent.data == null) {
            finish()
        } else {
            initModule(intent)
        }

        setContent {
            val userPreferences by userPreferencesRepository.data
                .collectAsStateWithLifecycle(initialValue = null)

            val preferences = if (userPreferences == null) {
                return@setContent
            } else {
                checkNotNull(userPreferences)
            }

            CompositionLocalProvider(
                LocalUserPreferences provides preferences
            ) {
                AppTheme(
                    darkMode = preferences.isDarkMode(),
                    themeColor = preferences.themeColor
                ) {
                    InstallScreen()
                }
            }
        }
    }

    override fun onDestroy() {
        Timber.d("InstallActivity onDestroy")
        tmpDir.deleteRecursively()
        super.onDestroy()
    }

    private fun initModule(intent: Intent) {
        lifecycleScope.launch {
            viewModel.loadModule(
                context = applicationContext,
                uri = checkNotNull(intent.data)
            )
        }
    }

    companion object {
        fun start(context: Context, uri: Uri) {
            val intent = Intent(context, InstallActivity::class.java)
                .apply {
                    data = uri
                }

            context.startActivity(intent)
        }
    }
}