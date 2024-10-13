package com.dergoogler.mmrl.ui.activity

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.runtime.currentComposer
import androidx.compose.runtime.currentCompositeKeyHash
import androidx.compose.ui.platform.LocalContext
import com.dergoogler.mmrl.viewmodel.ModConfViewModel
import ext.dergoogler.mmrl.activity.MMRLComponentActivity
import ext.dergoogler.mmrl.activity.setBaseContent
import timber.log.Timber

class ModConfActivity : MMRLComponentActivity() {
    private val viewModel: ModConfViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.d("ModConfActivity onCreate")
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val isDebug = intent.getBooleanExtra("DEBUG", false)

        val modId = intent.getStringExtra("MOD_ID") ?: return
        val fixedModId = modId.replace(Regex("[^a-zA-Z0-9._]"), "_")


        setBaseContent {
            val context = LocalContext.current

            viewModel.loadComposablePlugin(
                context = context,
                isDebug = isDebug,
                id = modId,
                fixedModId = fixedModId,
                composer = currentComposer,
                hash = currentCompositeKeyHash
            )
        }
    }

    override fun onDestroy() {
        Timber.d("ModConfActivity onDestroy")
        super.onDestroy()
    }
}