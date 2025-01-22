package com.dergoogler.mmrl.ui.screens.settings.modulesPermissions.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.ScaffoldDefaults
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.component.listItem.ListHeader
import com.dergoogler.mmrl.ui.component.listItem.ListSwitchItem
import com.dergoogler.mmrl.ui.providable.LocalSettings
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.ModulePermissionsViewModel
import dev.dergoogler.mmrl.compat.ext.isNotNull

@Composable
fun ModulePermissionsScreen(mViewModel: ModulePermissionsViewModel) {
    val userPreferences = LocalUserPreferences.current

    val viewModel = LocalSettings.current
    val allowedFsModules = userPreferences.allowedFsModules
    val allowedKsuModules = userPreferences.allowedKsuModules

    val module = mViewModel.local

    if (module.isNotNull()) {
        SettingsScaffold(
            modifier = ScaffoldDefaults.settingsScaffoldModifier,
            title = module.name
        ) {
            ListHeader(title = stringResource(id = R.string.view_module_features_webui))

            ListSwitchItem(
                enabled = module.features.webui,
                title = stringResource(R.string.settings_security_allow_filesystem_api),
                checked = module.id in allowedFsModules,
                onChange = { checked ->
                    if (checked) {
                        val newModules = allowedFsModules + module.id
                        viewModel.setAllowedFsModules(newModules)
                    } else {
                        val newModules = allowedFsModules.filter { it != module.id }
                        viewModel.setAllowedFsModules(newModules)
                    }
                }
            )

            ListSwitchItem(
                title = stringResource(R.string.settings_security_allow_advanced_kernelsu_api),
                enabled = module.features.webui,
                checked = module.id in allowedKsuModules,
                onChange = { checked ->
                    if (checked) {
                        val newModules = allowedKsuModules + module.id
                        viewModel.setAllowedKsuModules(newModules)
                    } else {
                        val newModules = allowedKsuModules.filter { it != module.id }
                        viewModel.setAllowedKsuModules(newModules)
                    }
                }
            )

        }

    } else {
        SettingsScaffold(
            modifier = ScaffoldDefaults.settingsScaffoldModifier,
            title = R.string.unknown_error
        ) {
            Loading()
        }
    }

}