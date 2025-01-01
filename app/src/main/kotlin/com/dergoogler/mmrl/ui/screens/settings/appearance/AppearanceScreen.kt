package com.dergoogler.mmrl.ui.screens.settings.appearance

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.component.listItem.ListEditTextItem
import com.dergoogler.mmrl.ui.component.listItem.ListRadioCheckItem
import com.dergoogler.mmrl.ui.component.listItem.ListSwitchItem
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.providable.LocalSettings
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.settings.appearance.items.AppThemeItem
import dev.dergoogler.mmrl.compat.ext.toFormattedDateSafely

@Composable
fun AppearanceScreen() {
    val viewModel = LocalSettings.current
    val context = LocalContext.current
    val userPreferences = LocalUserPreferences.current

    SettingsScaffold(
        title = R.string.settings_appearance
    ) {
        AppThemeItem(
            themeColor = userPreferences.themeColor,
            darkMode = userPreferences.darkMode,
            isDarkMode = userPreferences.isDarkMode(),
            onThemeColorChange = viewModel::setThemeColor,
            onDarkModeChange = viewModel::setDarkTheme
        )

        ListSwitchItem(
            title = stringResource(id = R.string.settings_text_wrap),
            desc = stringResource(id = R.string.settings_text_wrap_desc),
            checked = userPreferences.terminalTextWrap,
            onChange = viewModel::setTerminalTextWrap
        )

        ListEditTextItem(
            title = stringResource(id = R.string.settings_date_pattern),
            desc = stringResource(id = R.string.settings_date_pattern_desc),
            dialog = {
                desc = {
                    Text(text = System.currentTimeMillis().toFormattedDateSafely(it))
                }
            },
            value = userPreferences.datePattern,
            onConfirm = {
                viewModel.setDatePattern(it)
            }
        )

        ListRadioCheckItem(
            title = stringResource(R.string.settings_homepage),
            desc = stringResource(R.string.settings_homepage_desc),
            value = userPreferences.homepage,
            options = listOf(
                context.getString(MainScreen.Home.label),
                context.getString(MainScreen.Repository.label),
                context.getString(MainScreen.Modules.label)
            ),
            onConfirm = {
                viewModel.setHomepage(it)
            }
        )
    }
}