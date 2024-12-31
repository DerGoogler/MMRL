package com.dergoogler.mmrl.ui.screens.settings.developer

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.developerMode
import com.dergoogler.mmrl.ui.component.Alert
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.component.listItem.ListEditTextItem
import com.dergoogler.mmrl.ui.component.listItem.ListHeader
import com.dergoogler.mmrl.ui.component.listItem.ListSwitchItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.SettingsViewModel
import dev.dergoogler.mmrl.compat.ext.isLocalWifiUrl
import dev.dergoogler.mmrl.compat.ext.takeTrue

@Composable
fun DeveloperScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current

    SettingsScaffold(
        title = R.string.settings_developer
    ) {
        ListSwitchItem(
            title = stringResource(id = R.string.settings_developer_mode),
            desc = stringResource(id = R.string.settings_developer_mode_desc),
            checked = userPreferences.developerMode,
            onChange = viewModel::setDeveloperMode,
        )

        ListHeader(title = stringResource(id = R.string.view_module_features_webui))

        userPreferences.developerMode({ useWebUiDevUrl }) {
            Alert(
                title = stringResource(id = R.string.settings_webui_remote_url),
                message = stringResource(id = R.string.settings_webui_remote_url_alert_desc),
                backgroundColor = MaterialTheme.colorScheme.tertiaryContainer,
                textColor = MaterialTheme.colorScheme.onTertiaryContainer,
                modifier = Modifier.padding(16.dp),
            )
        }

        ListSwitchItem(
            enabled = userPreferences.developerMode,
            title = stringResource(id = R.string.settings_enable_webui_remote_url),
            checked = userPreferences.useWebUiDevUrl,
            onChange = viewModel::setUseWebUiDevUrl,
        )

        ListEditTextItem(
            enabled = userPreferences.developerMode && userPreferences.useWebUiDevUrl,
            title = stringResource(id = R.string.settings_webui_remote_url),
            desc = stringResource(id = R.string.settings_webui_remote_url_desc),
            value = userPreferences.webUiDevUrl,
            onConfirm = {
                viewModel.setWebUiDevUrl(it)
            },
            onValid = { !it.isLocalWifiUrl() },
            dialog = {
                supportingText = { isError ->
                    isError.takeTrue {
                        Text(
                            text = stringResource(R.string.invalid_ip),
                            color = MaterialTheme.colorScheme.error,
                            style = MaterialTheme.typography.labelSmall
                        )
                    }
                }
            },
        )

        ListHeader(title = stringResource(id = R.string.page_modules))

        ListSwitchItem(
            enabled = userPreferences.developerMode,
            title = "Allow Cancel Install",
            checked = userPreferences.allowCancelInstall,
            onChange = viewModel::setAllowCancelInstall,
        )

        ListSwitchItem(
            enabled = userPreferences.developerMode,
            title = "Allow Cancel Action",
            checked = userPreferences.allowCancelAction,
            onChange = viewModel::setAllowCancelAction,
        )

    }
}
