package com.dergoogler.mmrl.ui.screens.settings

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isNonRoot
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.ui.component.SettingNormalItem
import com.dergoogler.mmrl.ui.component.TopAppBarTitle
import com.dergoogler.mmrl.ui.navigation.graphs.SettingsScreen
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.settings.items.NonRootItem
import com.dergoogler.mmrl.ui.screens.settings.items.RootItem
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.utils.extensions.openUrl
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun SettingsScreen(
    navController: NavController,
    viewModel: SettingsViewModel = hiltViewModel()
) {
    val userPreferences = LocalUserPreferences.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    val context = LocalContext.current

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
            when {
                userPreferences.workingMode.isRoot -> RootItem(
                    isAlive = viewModel.isProviderAlive,
                    version = viewModel.version
                )

                userPreferences.workingMode.isNonRoot -> NonRootItem()
            }

            SettingNormalItem(
                icon = R.drawable.color_swatch,
                title = stringResource(id = R.string.settings_appearance),
                desc = stringResource(id = R.string.settings_appearance_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Appearance.route)
                }
            )

            SettingNormalItem(
                icon = R.drawable.shield,
                title = stringResource(id = R.string.settings_security),
                desc = stringResource(id = R.string.settings_security_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Security.route)
                }
            )

            SettingNormalItem(
                icon = R.drawable.tool,
                title = stringResource(id = R.string.settings_other),
                desc = stringResource(id = R.string.settings_other_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Other.route)
                }
            )

            SettingNormalItem(
                icon = R.drawable.git_pull_request,
                title = stringResource(id = R.string.settings_repo),
                desc = stringResource(id = R.string.settings_repo_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Repositories.route)
                }
            )

            SettingNormalItem(
                icon = R.drawable.file_3d,
                title = stringResource(id = R.string.settings_resources),
                desc = stringResource(id = R.string.settings_resources_desc),
                onClick = {
                    context.openUrl(Const.RESOURCES_URL)
                }
            )

            SettingNormalItem(
                icon = R.drawable.components,
                title = stringResource(id = R.string.setup_mode),
                desc = stringResource(
                    id = when (userPreferences.workingMode) {
                        WorkingMode.MODE_ROOT -> R.string.setup_root_title
                        WorkingMode.MODE_SHIZUKU -> R.string.setup_shizuku_title
                        WorkingMode.MODE_NON_ROOT -> R.string.setup_non_root_title
                        else -> R.string.settings_root_none
                    }
                ),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.WorkingMode.route)
                }
            )

            SettingNormalItem(
                icon = R.drawable.award,
                title = stringResource(id = R.string.settings_about),
                desc = "${BuildConfig.VERSION_NAME} (${BuildConfig.VERSION_CODE})",
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.About.route)
                }
            )

            SettingNormalItem(
                icon = R.drawable.files,
                title = stringResource(id = R.string.settings_changelog),
                desc = stringResource(id = R.string.settings_changelo_desc),
                onClick = {
                    navController.navigateSingleTopTo(SettingsScreen.Changelog.route)
                }
            )
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior
) = TopAppBar(
    title = {
        TopAppBarTitle(text = stringResource(id = R.string.page_settings))
    },
    scrollBehavior = scrollBehavior
)