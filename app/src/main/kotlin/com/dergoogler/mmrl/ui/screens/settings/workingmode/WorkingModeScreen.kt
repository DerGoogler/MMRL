package com.dergoogler.mmrl.ui.screens.settings.workingmode

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
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
    viewModel: SettingsViewModel = hiltViewModel()
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
            verticalArrangement = Arrangement.spacedBy(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(20.dp))

            WorkingModeItem(
                title = stringResource(id = R.string.setup_root_title),
                desc = stringResource(id = R.string.setup_root_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_ROOT,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_ROOT) }
            )

            WorkingModeItem(
                title = stringResource(id = R.string.setup_shizuku_title),
                desc = stringResource(id = R.string.setup_shizuku_desc),
                selected = userPreferences.workingMode == WorkingMode.MODE_SHIZUKU,
                onClick = { viewModel.setWorkingMode(WorkingMode.MODE_SHIZUKU) }
            )

            WorkingModeItem(
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
    navController: NavController
) = NavigateUpTopBar(
    title = stringResource(id = R.string.setup_mode),
    scrollBehavior = scrollBehavior,
    navController = navController
)