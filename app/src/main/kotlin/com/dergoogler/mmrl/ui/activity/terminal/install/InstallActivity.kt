package com.dergoogler.mmrl.ui.activity.terminal.install

import android.net.Uri
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.viewModels
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.lifecycleScope
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.ConfirmDialog
import com.dergoogler.mmrl.viewmodel.InstallViewModel
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.activity.setBaseContent
import dev.dergoogler.mmrl.compat.ext.tmpDir
import kotlinx.coroutines.launch
import timber.log.Timber

class InstallActivity : MMRLComponentActivity() {
    private val viewModel: InstallViewModel by viewModels()

    override val windowFlags = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON

    private var confirmDialog by mutableStateOf(true)

    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.d("InstallActivity onCreate")
        super.onCreate(savedInstanceState)


        val uris: ArrayList<Uri>? = if (intent.data != null) {
            arrayListOf(intent.data!!)
        } else {
            if (BuildCompat.atLeastT) {
                intent.getParcelableArrayListExtra("uris", Uri::class.java)
            } else {
                @Suppress("DEPRECATION")
                intent.getParcelableArrayListExtra("uris")
            }
        }

        if (uris.isNullOrEmpty()) {
            finish()
            return
        }

        setBaseContent {
            if (confirmDialog) ConfirmDialog(
                title = R.string.install_screen_confirm_title,
                description = R.string.install_screen_confirm_text,
                onClose = {
                    confirmDialog = false
                    // just in [case]
                    viewModel.shell?.close()
                    finish()
                },
                onConfirm = {
                    confirmDialog = false
                    Timber.d("InstallActivity onCreate: $uris")
                    initModule(uris.toList())
                }
            )

            InstallScreen(viewModel)
        }
    }

    override fun onDestroy() {
        Timber.d("InstallActivity onDestroy")
        tmpDir.deleteRecursively()
        super.onDestroy()
    }

    private fun initModule(uris: List<Uri>) {
        lifecycleScope.launch {
            viewModel.installModules(
                uris = uris
            )
        }
    }
}