package com.dergoogler.mmrl.ui.screens.settings.security

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
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.component.ListHeader
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.navigation.graphs.SettingsScreen
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun SecurityScreen(
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
                .verticalScroll(rememberScrollState())
        ) {
            ListSwitchItem(
                icon = R.drawable.power,
                title = stringResource(id = R.string.settings_reboot_protection),
                desc = stringResource(id = R.string.settings_reboot_protection_desc),
                checked = userPreferences.confirmReboot,
                onChange = viewModel::setConfirmReboot
            )

            ListSwitchItem(
                icon = R.drawable.fingerprint,
                title = stringResource(id = R.string.settings_hide_fingerprint),
                desc = stringResource(id = R.string.settings_hide_fingerprint_desc),
                checked = userPreferences.hideFingerprintInHome,
                onChange = viewModel::setHideFingerprintInHome
            )

            ListHeader(
                title = stringResource(id = R.string.view_module_features_webui)
            )

            ListButtonItem(
                icon = R.drawable.file_dislike,
                title = stringResource(id = R.string.settings_allow_javascript_api),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.SecurityWebUIAllowedApis.route)
                })
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController,
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_security),
    scrollBehavior = scrollBehavior,
    navController = navController
)