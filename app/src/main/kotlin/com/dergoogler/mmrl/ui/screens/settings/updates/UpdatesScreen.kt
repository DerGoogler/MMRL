package com.dergoogler.mmrl.ui.screens.settings.updates

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
import com.dergoogler.mmrl.ui.component.ListHeader
import com.dergoogler.mmrl.ui.component.ListRadioCheckItem
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

private val optionsOfHours = listOf(1, 2, 3, 4, 5, 10, 12, 16, 24, 48, 72)

@Composable
fun UpdatesScreen(
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
            ListHeader(
                title = stringResource(id = R.string.settings_app)
            )

            ListSwitchItem(
                icon = R.drawable.launcher_outline,
                title = stringResource(id = R.string.settings_check_app_updates),
                desc = stringResource(id = R.string.settings_check_app_updates_desc),
                checked = userPreferences.checkAppUpdates,
                onChange = viewModel::setCheckAppUpdates
            )

            ListHeader(
                title = stringResource(id = R.string.page_repository)
            )

            ListSwitchItem(
                icon = R.drawable.refresh,
                title = stringResource(id = R.string.settings_auto_update_repos),
                desc = stringResource(id = R.string.settings_auto_update_repos_desc),
                checked = userPreferences.autoUpdateRepos,
                onChange = viewModel::setCheckModuleUpdates
            )

            ListRadioCheckItem(title = stringResource(R.string.settings_repo_update_interval),
                icon = R.drawable.clock_24,
                desc = stringResource(
                    R.string.settings_repo_update_interval_desc,
                    userPreferences.autoUpdateReposInterval
                ),
                enabled = userPreferences.autoUpdateRepos,
                suffix = stringResource(id = R.string.settings_repo_update_interval_suffix),
                value = userPreferences.autoUpdateReposInterval,
                options = optionsOfHours,
                onConfirm = {
                    viewModel.setAutoUpdateReposInterval(it)
                })

            ListHeader(
                title = stringResource(id = R.string.page_modules)
            )

            ListSwitchItem(
                icon = R.drawable.box,
                title = stringResource(id = R.string.settings_check_modules_update),
                desc = stringResource(id = R.string.settings_check_modules_update_desc),
                checked = userPreferences.checkModuleUpdates,
                onChange = viewModel::setCheckModuleUpdates
            )

            ListRadioCheckItem(title = stringResource(R.string.settings_check_modules_update_interval),
                icon = R.drawable.device_mobile_code,
                desc = stringResource(
                    R.string.settings_check_modules_update_interval_desc,
                    userPreferences.checkModuleUpdatesInterval
                ),
                enabled = userPreferences.checkModuleUpdates,
                suffix = stringResource(id = R.string.settings_check_modules_update_interval_suffix),
                value = userPreferences.checkModuleUpdatesInterval,
                options = optionsOfHours,
                onConfirm = {
                    viewModel.setCheckModuleUpdatesInterval(it)
                })
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController,
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_updates),
    scrollBehavior = scrollBehavior,
    navController = navController
)