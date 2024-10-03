package com.dergoogler.mmrl.ui.screens.repository.view.pages

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialogDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.app.Event.Companion.isLoading
import com.dergoogler.mmrl.app.Event.Companion.isSucceeded
import com.dergoogler.mmrl.network.compose.requestString
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.MarkdownText

@Composable
fun ReadmePage(
    url: String,
) {
    var readme by remember { mutableStateOf("") }
    val event = requestString(
        url = url,
        onSuccess = { readme = it }
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState()),
    ) {
        AnimatedVisibility(
            visible = event.isLoading,
            enter = fadeIn(),
            exit = fadeOut()
        ) {
            Loading(minHeight = 200.dp)
        }

        AnimatedVisibility(
            visible = event.isSucceeded,
            enter = fadeIn(),
            exit = fadeOut()
        ) {
            MarkdownText(
                text = readme,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier
                    .padding(horizontal = 18.dp)
                    .padding(top = 8.dp)
                    .padding(bottom = 18.dp)
            )
        }
    }
}