package com.dergoogler.mmrl.ui.activity.webui

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.viewmodel.WebUIViewModel
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.activity.setBaseContent
import dev.dergoogler.mmrl.compat.ext.isNotNullOrBlank
import timber.log.Timber

class WebUIActivity : MMRLComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.d("WebUIActivity onCreate")
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val modId = intent.getStringExtra("MOD_ID")

        if (modId.isNotNullOrBlank()) {
            setBaseContent {
                val viewModel =
                    hiltViewModel<WebUIViewModel, WebUIViewModel.Factory> { factory ->
                        factory.create(modId)
                    }

                WebUIScreen(viewModel)
            }
        } else {
            setBaseContent {
                Box(
                    modifier = Modifier
                        .fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = stringResource(id = R.string.unknown_error),
                        style = MaterialTheme.typography.titleMedium
                    )
                }
            }
        }
    }

    override fun onDestroy() {
        Timber.d("WebUIActivity onDestroy")
        super.onDestroy()
    }
}