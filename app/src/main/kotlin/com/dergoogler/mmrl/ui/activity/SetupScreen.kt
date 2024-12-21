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
import com.dergoogler.mmrl.ui.component.WorkingModeItem

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

            WorkingModeItem(
                icon = R.drawable.magisk_logo,
                title = stringResource(R.string.working_mode_magisk_title),
                desc = stringResource(R.string.working_mode_magisk_desc),
                onClick = { setMode(WorkingMode.MODE_MAGISK) }
            )

            WorkingModeItem(
                icon = R.drawable.kernelsu_logo,
                title = stringResource(R.string.working_mode_kernelsu_title),
                desc = stringResource(R.string.working_mode_kernelsu_desc),
                onClick = { setMode(WorkingMode.MODE_KERNEL_SU) }
            )

            WorkingModeItem(
                icon = R.drawable.kernelsu_next_logo,
                title = stringResource(R.string.working_mode_kernelsu_next_title),
                desc = stringResource(R.string.working_mode_kernelsu_next_desc),
                onClick = { setMode(WorkingMode.MODE_KERNEL_SU_NEXT) }
            )

            WorkingModeItem(
                icon = R.drawable.brand_android,
                title = stringResource(R.string.working_mode_apatch_title),
                desc = stringResource(R.string.working_mode_apatch_desc),
                onClick = { setMode(WorkingMode.MODE_APATCH) }
            )

            WorkingModeItem(
                icon = R.drawable.shield_lock,
                title = stringResource(id = R.string.setup_non_root_title),
                desc = stringResource(id = R.string.setup_non_root_desc),
                onClick = { setMode(WorkingMode.MODE_NON_ROOT) }
            )
        }
    }