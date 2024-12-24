package com.dergoogler.mmrl.ui.screens.settings.other

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
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.settings.appearance.items.DownloadPathItem
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun OtherScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    val navController = LocalNavController.current


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
                .verticalScroll(rememberScrollState())
        ) {
            DownloadPathItem(
                downloadPath = userPreferences.downloadPath,
                onChange = viewModel::setDownloadPath
            )

            ListSwitchItem(
                icon = R.drawable.brand_cloudflare,
                title = stringResource(id = R.string.settings_doh),
                desc = stringResource(id = R.string.settings_doh_desc),
                checked = userPreferences.useDoh,
                onChange = viewModel::setUseDoh
            )

            ListSwitchItem(
                icon = R.drawable.bug,
                title = stringResource(id = R.string.settings_developer_mode),
                desc = stringResource(id = R.string.settings_developer_mode_desc),
                checked = userPreferences.developerMode,
                onChange = viewModel::setDeveloperMode,
            )
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController,
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_other),
    scrollBehavior = scrollBehavior,
    navController = navController
)