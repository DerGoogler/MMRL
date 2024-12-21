package com.dergoogler.mmrl.ui.screens.settings.workingmode

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun WorkingModeScreen(
    navController: NavController,
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                scrollBehavior = scrollBehavior,
                navController = navController
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
                .verticalScroll(rememberScrollState()),
        ) {
            WorkingModeItem(
                icon = R.drawable.magisk_logo,
                title = stringResource(R.string.working_mode_magisk_title),
                desc = stringResource(R.string.working_mode_magisk_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_MAGISK,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_MAGISK) }
            )


            WorkingModeItem(
                icon = R.drawable.kernelsu_logo,
                title = stringResource(R.string.working_mode_kernelsu_title),
                desc = stringResource(R.string.working_mode_kernelsu_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_KERNEL_SU,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_KERNEL_SU) }
            )

            WorkingModeItem(
                icon = R.drawable.kernelsu_next_logo,
                title = stringResource(R.string.working_mode_kernelsu_next_title),
                desc = stringResource(R.string.working_mode_kernelsu_next_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_KERNEL_SU_NEXT,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_KERNEL_SU_NEXT) }
            )

            WorkingModeItem(
                icon = R.drawable.brand_android,
                title = stringResource(R.string.working_mode_apatch_title),
                desc = stringResource(R.string.working_mode_apatch_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_APATCH,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_APATCH) }
            )

            WorkingModeItem(
                icon = R.drawable.shield_lock,
                title = stringResource(id = R.string.setup_non_root_title),
                desc = stringResource(id = R.string.setup_non_root_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_NON_ROOT,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_NON_ROOT) }
            )
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController,
) = NavigateUpTopBar(
    title = stringResource(id = R.string.setup_mode),
    scrollBehavior = scrollBehavior,
    navController = navController
)