package com.dergoogler.mmrl.ui.screens.settings.modules

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.ui.component.APatchLabel
import com.dergoogler.mmrl.ui.component.KernelSuLabel
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.component.listItem.ListHeader
import com.dergoogler.mmrl.ui.component.listItem.ListSwitchItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun ModulesScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val userPreferences = LocalUserPreferences.current

    SettingsScaffold(
        title = R.string.settings_modules,
    ) {
        ListHeader(
            title = stringResource(id = R.string.settings_modules_handlers)
        )

        ListSwitchItem(
            enabled = viewModel.isProviderAlive && viewModel.platform.isNotMagisk,
            title = stringResource(id = R.string.settings_shell_module_state_change),
            desc = stringResource(id = R.string.settings_shell_module_state_change_desc),
            checked = userPreferences.useShellForModuleStateChange && viewModel.platform.isNotMagisk,
            onChange = viewModel::setUseShellForModuleStateChange,
            labels = listOf { KernelSuLabel(); APatchLabel() }
        )

        ListSwitchItem(
            enabled = viewModel.isProviderAlive && viewModel.platform.isNotMagisk,
            title = stringResource(id = R.string.settings_use_generic_action),
            desc = stringResource(id = R.string.settings_use_generic_action_desc),
            checked = userPreferences.useShellForModuleAction,
            onChange = viewModel::setUseShellForModuleAction,
            labels = listOf { KernelSuLabel(); APatchLabel() }
        )


        ListHeader(
            title = stringResource(id = R.string.view_module_features_webui)
        )

        ListSwitchItem(
            enabled = viewModel.isProviderAlive,
            title = stringResource(id = R.string.settings_use_shell_webui_assets),
            desc = stringResource(id = R.string.settings_use_shell_webui_assets_desc),
            checked = userPreferences.useShellToLoadWebUIAssets,
            onChange = viewModel::setUseShellToLoadWebUIAssets,
        )

        ListHeader(
            title = stringResource(id = R.string.settings_modules_installer)
        )

        ListSwitchItem(
            title = stringResource(id = R.string.settings_clear_install_terminal),
            desc = stringResource(id = R.string.settings_clear_install_terminal_desc),
            checked = userPreferences.clearInstallTerminal,
            onChange = viewModel::setClearInstallTerminal,
        )

        ListSwitchItem(
            title = stringResource(id = R.string.settings_delete_zip),
            desc = stringResource(id = R.string.settings_delete_zip_desc),
            checked = userPreferences.deleteZipFile,
            onChange = viewModel::setDeleteZipFile,
            enabled = userPreferences.workingMode.isRoot
        )
    }
}