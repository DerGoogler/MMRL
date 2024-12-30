package com.dergoogler.mmrl.ui.screens.settings.other

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.settings.appearance.items.DownloadPathItem
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun OtherScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current

    SettingsScaffold(
        title = R.string.settings_other
    ) {
        DownloadPathItem(
            downloadPath = userPreferences.downloadPath,
            onChange = viewModel::setDownloadPath
        )

        ListSwitchItem(
            title = stringResource(id = R.string.settings_doh),
            desc = stringResource(id = R.string.settings_doh_desc),
            checked = userPreferences.useDoh,
            onChange = viewModel::setUseDoh
        )
    }
}