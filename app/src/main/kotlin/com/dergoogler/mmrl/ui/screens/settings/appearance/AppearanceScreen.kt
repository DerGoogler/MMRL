package com.dergoogler.mmrl.ui.screens.settings.appearance

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
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.component.ListEditTextItem
import com.dergoogler.mmrl.ui.component.ListRadioCheckItem
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.settings.appearance.items.AppThemeItem
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun AppearanceScreen(
    navController: NavController,
    viewModel: SettingsViewModel = hiltViewModel()
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
            AppThemeItem(
                themeColor = userPreferences.themeColor,
                darkMode = userPreferences.darkMode,
                isDarkMode = userPreferences.isDarkMode(),
                onThemeColorChange = viewModel::setThemeColor,
                onDarkModeChange = viewModel::setDarkTheme
            )

            ListSwitchItem(
                icon = R.drawable.text_wrap_column,
                title = stringResource(id = R.string.settings_text_wrap),
                desc = stringResource(id = R.string.settings_text_wrap_desc),
                checked = userPreferences.terminalTextWrap,
                onChange = viewModel::setTerminalTextWrap
            )

            ListEditTextItem(
                icon = R.drawable.calendar_month,
                title = stringResource(id = R.string.settings_date_pattern),
                desc = stringResource(id = R.string.settings_date_pattern_desc),
                value = userPreferences.datePattern,
                onConfirm = {
                    viewModel.setDatePattern(it)
                })

            ListRadioCheckItem(
                title = stringResource(R.string.settings_homepage),
                icon = R.drawable.player_play,
                desc = stringResource(R.string.settings_homepage_desc),
                value = userPreferences.homepage,
                options = listOf(MainScreen.Repository.route, MainScreen.Modules.route),
                onConfirm = {
                    viewModel.setHomepage(it)
                })
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_appearance),
    scrollBehavior = scrollBehavior,
    navController = navController
)