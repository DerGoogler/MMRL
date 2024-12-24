package com.dergoogler.mmrl.ui.activity

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.ui.component.WorkingModeItems

@Composable
fun SetupScreen(
    setMode: (WorkingMode) -> Unit,
) =
    Scaffold { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .background(color = MaterialTheme.colorScheme.background)
                .fillMaxSize(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = stringResource(id = R.string.setup_mode),
                style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.onBackground
            )

            WorkingModeItems(
                isSetup = true,
                setMode = setMode,
            )
        }
    }