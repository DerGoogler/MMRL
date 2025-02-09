package com.dergoogler.mmrl.ui.screens.settings

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.ui.component.TopAppBar
import com.dergoogler.mmrl.ui.component.TopAppBarTitle
import com.dergoogler.mmrl.ui.component.WorkingModeBottomSheet
import com.dergoogler.mmrl.ui.component.listItem.ListButtonItem
import com.dergoogler.mmrl.ui.navigation.graphs.SettingsScreen
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalSettings
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.ui.utils.none
import dev.dergoogler.mmrl.compat.ext.takeTrue

@Composable
fun SettingsScreen() {
    val userPreferences = LocalUserPreferences.current
    val viewModel = LocalSettings.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    val navController = LocalNavController.current

    val browser = LocalUriHandler.current

    var workingModeBottomSheet by remember { mutableStateOf(false) }
    if (workingModeBottomSheet) WorkingModeBottomSheet(
        onClose = {
            workingModeBottomSheet = false
        }
    )

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                scrollBehavior = scrollBehavior
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
        ) {
            ListButtonItem(
                icon = R.drawable.color_swatch,
                title = stringResource(id = R.string.settings_appearance),
                desc = stringResource(id = R.string.settings_appearance_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Appearance.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.shield,
                title = stringResource(id = R.string.settings_security),
                desc = stringResource(id = R.string.settings_security_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Security.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.refresh,
                title = stringResource(id = R.string.settings_updates),
                desc = stringResource(id = R.string.settings_updates_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Updates.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.stack_middle,
                enabled = viewModel.isProviderAlive,
                title = stringResource(id = R.string.settings_modules),
                desc = stringResource(id = R.string.settings_modules_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Modules.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.hexagons,
                enabled = viewModel.isProviderAlive,
                title = stringResource(id = R.string.settings_modules_permissions),
                desc = stringResource(id = R.string.settings_modules_permissions_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.ModulesPermissions.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.tool,
                title = stringResource(id = R.string.settings_other),
                desc = stringResource(id = R.string.settings_other_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Other.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.file_3d,
                title = stringResource(id = R.string.settings_resources),
                desc = stringResource(id = R.string.settings_resources_desc),
                onClick = {
                    browser.openUri(Const.RESOURCES_URL)
                }
            )

            val workingModeIcon = when (userPreferences.workingMode) {
                WorkingMode.MODE_MAGISK -> R.drawable.magisk_logo
                WorkingMode.MODE_KERNEL_SU -> R.drawable.kernelsu_logo
                WorkingMode.MODE_KERNEL_SU_NEXT -> R.drawable.kernelsu_next_logo
                WorkingMode.MODE_APATCH -> R.drawable.brand_android
                WorkingMode.MODE_NON_ROOT -> R.drawable.shield_lock
                else -> R.drawable.components
            }

            val workingModeText = when (userPreferences.workingMode) {
                WorkingMode.MODE_MAGISK -> R.string.working_mode_magisk_title
                WorkingMode.MODE_KERNEL_SU -> R.string.working_mode_kernelsu_title
                WorkingMode.MODE_KERNEL_SU_NEXT -> R.string.working_mode_kernelsu_next_title
                WorkingMode.MODE_APATCH -> R.string.working_mode_apatch_title
                WorkingMode.MODE_NON_ROOT -> R.string.setup_non_root_title
                else -> R.string.settings_root_none
            }

            ListButtonItem(
                icon = workingModeIcon,
                title = stringResource(id = R.string.setup_mode),
                desc = stringResource(
                    id = workingModeText
                ),
                onClick = {
                    workingModeBottomSheet = true
                }
            )

            ListButtonItem(
                icon = R.drawable.files,
                title = stringResource(id = R.string.settings_changelog),
                desc = stringResource(id = R.string.settings_changelo_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Changelog.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.file_shredder,
                title = stringResource(id = R.string.settings_blacklist),
                desc = stringResource(id = R.string.settings_blacklist_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Blacklist.route)
                }
            )

            ListButtonItem(
                icon = R.drawable.bug,
                title = stringResource(id = R.string.settings_developer),
                desc = stringResource(id = R.string.settings_developer_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Developer.route)
                }
            )

            BuildConfig.IS_GOOGLE_PLAY_BUILD.takeTrue {
                ListButtonItem(
                    icon = R.drawable.spy,
                    title = stringResource(id = R.string.settings_privacy_policy),
                    onClick = {
                        browser.openUri(Const.PRIVACY_POLICY_URL)
                    }
                )
            }
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
) = TopAppBar(
    title = {
        TopAppBarTitle(text = stringResource(id = R.string.page_settings))
    },
    scrollBehavior = scrollBehavior
)