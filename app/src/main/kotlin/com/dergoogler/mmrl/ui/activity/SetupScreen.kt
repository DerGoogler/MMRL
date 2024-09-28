package com.dergoogler.mmrl.ui.activity

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.ui.screens.settings.workingmode.WorkingModeItem

@Composable
fun SetupScreen(
    setMode: (WorkingMode) -> Unit
) = Column(
    modifier = Modifier
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

    Spacer(modifier = Modifier.height(30.dp))
    WorkingModeItem(
        title = stringResource(id = R.string.setup_root_title),
        desc = stringResource(id = R.string.setup_root_desc),
        onClick = { setMode(WorkingMode.MODE_ROOT) }
    )

    Spacer(modifier = Modifier.height(20.dp))
    WorkingModeItem(
        title = stringResource(id = R.string.setup_shizuku_title),
        desc = stringResource(id = R.string.setup_shizuku_desc),
        onClick = { setMode(WorkingMode.MODE_SHIZUKU) }
    )

    Spacer(modifier = Modifier.height(20.dp))
    WorkingModeItem(
        title = stringResource(id = R.string.setup_non_root_title),
        desc = stringResource(id = R.string.setup_non_root_desc),
        onClick = { setMode(WorkingMode.MODE_NON_ROOT) }
    )
}