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
import com.dergoogler.mmrl.R
import ext.dergoogler.mmrl.activity.MMRLComponentActivity
import ext.dergoogler.mmrl.activity.setBaseContent
import timber.log.Timber

class WebUIActivity : MMRLComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.d("WebUIActivity onCreate")
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val modId = intent.getStringExtra("MOD_ID")

        if (modId != null) {
            setBaseContent {
              WebUIScreen(modId)
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