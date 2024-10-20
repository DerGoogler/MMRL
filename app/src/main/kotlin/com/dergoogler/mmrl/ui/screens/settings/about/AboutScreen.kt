package com.dergoogler.mmrl.ui.screens.settings.about

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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isNonRoot
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.component.ListItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.none
import ext.dergoogler.mmrl.ext.launchCustomTab
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun AboutScreen(
    navController: NavController, viewModel: SettingsViewModel = hiltViewModel()
) {
    val context = LocalContext.current

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


            when {
                userPreferences.workingMode.isRoot -> ListItem(
                    icon = if (viewModel.isProviderAlive) {
                        R.drawable.circle_check_filled
                    } else {
                        R.drawable.alert_circle_filled
                    },
                    title = if (viewModel.isProviderAlive) {
                        stringResource(
                            id = R.string.settings_root_access,
                            stringResource(id = R.string.settings_root_granted)
                        )
                    } else {
                        stringResource(
                            id = R.string.settings_root_access,
                            stringResource(id = R.string.settings_root_none)
                        )
                    },
                    desc = if (viewModel.isProviderAlive) {
                        stringResource(id = R.string.settings_root_provider, viewModel.version)
                    } else {
                        stringResource(
                            id = R.string.settings_root_provider,
                            stringResource(id = R.string.settings_root_not_available)
                        )
                    },
                )

                userPreferences.workingMode.isNonRoot -> ListItem(
                    icon = R.drawable.info_circle_filled,
                    title = stringResource(id = R.string.settings_non_root),
                    desc = stringResource(id = R.string.settings_non_root_desc),
                )
            }

//            SettingNormalItem(
//                onClick = { context.launchCustomTab(Const.TRANSLATE_URL) },
//                icon = R.drawable.weblate,
//                title = stringResource(id = R.string.about_weblate)
//            )

            ListButtonItem(
                onClick = { context.launchCustomTab(Const.TELEGRAM_URL) },
                icon = R.drawable.telegram,
                title = stringResource(id = R.string.about_telegram)
            )

            ListButtonItem(
                onClick = { context.launchCustomTab(Const.GITHUB_URL) },
                icon = R.drawable.github,
                title = stringResource(id = R.string.about_github)
            )

            ListItem(
                title = stringResource(
                    id = R.string.about_app_version,
                    BuildConfig.VERSION_NAME,
                    BuildConfig.VERSION_CODE
                ), desc = stringResource(
                    id = R.string.about_desc2, "Sanmer & DerGoogler"
                )
            )
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_about),
    scrollBehavior = scrollBehavior,
    navController = navController
)