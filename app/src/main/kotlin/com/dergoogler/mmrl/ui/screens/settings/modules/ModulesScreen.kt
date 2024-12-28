package com.dergoogler.mmrl.ui.screens.settings.modules

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.ui.component.APatchLabel
import com.dergoogler.mmrl.ui.component.KernelSuLabel
import com.dergoogler.mmrl.ui.component.ListHeader
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun ModulesScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current

    SettingsScaffold(
        title = R.string.settings_modules
    ) {
        ListHeader(
            title = stringResource(id = R.string.settings_modules_handlers)
        )

        ListSwitchItem(
            enabled = viewModel.isProviderAlive && viewModel.platform.isNotMagisk,
            icon = R.drawable.stars_outlined,
            title = stringResource(id = R.string.settings_shell_module_state_change),
            desc = stringResource(id = R.string.settings_shell_module_state_change_desc),
            checked = userPreferences.useShellForModuleStateChange && viewModel.platform.isNotMagisk,
            onChange = viewModel::setUseShellForModuleStateChange,
            labels = listOf { KernelSuLabel(); APatchLabel() }
        )

        ListSwitchItem(
            enabled = viewModel.isProviderAlive && viewModel.platform.isNotMagisk,
            icon = R.drawable.device_mobile_code,
            title = stringResource(id = R.string.settings_use_generic_action),
            desc = stringResource(id = R.string.settings_use_generic_action_desc),
            checked = userPreferences.useShellForModuleAction,
            onChange = viewModel::setUseShellForModuleAction,
            labels = listOf { KernelSuLabel(); APatchLabel() }
        )

        ListHeader(
            title = stringResource(id = R.string.settings_modules_installer)
        )

        ListSwitchItem(
            icon = R.drawable.clear_all,
            title = stringResource(id = R.string.settings_clear_install_terminal),
            desc = stringResource(id = R.string.settings_clear_install_terminal_desc),
            checked = userPreferences.clearInstallTerminal,
            onChange = viewModel::setClearInstallTerminal,
        )

        ListSwitchItem(
            icon = R.drawable.file_type_zip,
            title = stringResource(id = R.string.settings_delete_zip),
            desc = stringResource(id = R.string.settings_delete_zip_desc),
            checked = userPreferences.deleteZipFile,
            onChange = viewModel::setDeleteZipFile,
            enabled = userPreferences.workingMode.isRoot
        )
    }
}