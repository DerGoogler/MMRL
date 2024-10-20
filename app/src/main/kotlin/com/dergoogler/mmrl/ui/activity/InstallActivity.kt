package com.dergoogler.mmrl.ui.activity

import android.content.Intent
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import ext.dergoogler.mmrl.ext.tmpDir
import com.dergoogler.mmrl.viewmodel.InstallViewModel
import ext.dergoogler.mmrl.activity.MMRLComponentActivity
import ext.dergoogler.mmrl.activity.setBaseContent
import kotlinx.coroutines.launch
import timber.log.Timber

class InstallActivity : MMRLComponentActivity() {
    private val viewModel: InstallViewModel by viewModels()

    override val windowFlags = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON

    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.d("InstallActivity onCreate")
        super.onCreate(savedInstanceState)

        if (intent.data == null) {
            finish()
        } else {
            initModule(intent)
        }

        setBaseContent {
            InstallScreen()
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
}