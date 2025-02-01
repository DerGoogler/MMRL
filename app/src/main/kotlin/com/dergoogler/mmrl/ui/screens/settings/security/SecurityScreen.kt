package com.dergoogler.mmrl.ui.screens.settings.security

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.component.listItem.ListSwitchItem
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalSettings
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences

@Composable
fun SecurityScreen() {
    val viewModel = LocalSettings.current
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
            title = stringResource(id = R.string.settings_blacklist_alerts),
            desc = stringResource(id = R.string.settings_blacklist_alerts_desc),
            checked = userPreferences.blacklistAlerts,
            onChange = viewModel::setBlacklistAlerts
        )

        ListSwitchItem(
            title = stringResource(id = R.string.settings_hide_fingerprint),
            desc = stringResource(id = R.string.settings_hide_fingerprint_desc),
            checked = userPreferences.hideFingerprintInHome,
            onChange = viewModel::setHideFingerprintInHome
        )
    }
}