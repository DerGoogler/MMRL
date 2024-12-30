package com.dergoogler.mmrl.ui.screens.settings.security

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.component.ListHeader
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.navigation.graphs.SettingsScreen
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun SecurityScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current

    val navController = LocalNavController.current

    SettingsScaffold(
        title = R.string.settings_security,
    ) {
        ListSwitchItem(
            title = stringResource(id = R.string.settings_reboot_protection),
            desc = stringResource(id = R.string.settings_reboot_protection_desc),
            checked = userPreferences.confirmReboot,
            onChange = viewModel::setConfirmReboot
        )

        ListSwitchItem(
            title = stringResource(id = R.string.settings_hide_fingerprint),
            desc = stringResource(id = R.string.settings_hide_fingerprint_desc),
            checked = userPreferences.hideFingerprintInHome,
            onChange = viewModel::setHideFingerprintInHome
        )

        ListHeader(
            title = stringResource(id = R.string.view_module_features_webui)
        )

        ListButtonItem(
            title = stringResource(id = R.string.settings_allow_javascript_api),
            onClick = {
                navController.navigateSingleTopTo(SettingsScreen.SecurityWebUIAllowedApis.route)
            })
    }
}