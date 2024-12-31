package com.dergoogler.mmrl.ui.screens.settings.appearance.items

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.DarkMode
import com.dergoogler.mmrl.ui.component.BottomSheet
import com.dergoogler.mmrl.ui.component.listItem.ListButtonItem

@Composable
fun AppThemeItem(
    themeColor: Int,
    darkMode: DarkMode,
    isDarkMode: Boolean,
    onThemeColorChange: (Int) -> Unit,
    onDarkModeChange: (DarkMode) -> Unit
) {
    var open by rememberSaveable { mutableStateOf(false) }

    ListButtonItem(
        title = stringResource(id = R.string.settings_app_theme),
        desc = stringResource(id = R.string.settings_app_theme_desc),
        onClick = { open = true }
    )

    if (open) {
        AppThemeBottomSheet(
            onClose = { open = false },
            themeColor = themeColor,
            darkMode = darkMode,
            isDarkMode = isDarkMode,
            onThemeColorChange =onThemeColorChange,
            onDarkModeChange = onDarkModeChange
        )
    }
}

@Composable
private fun AppThemeBottomSheet(
    onClose: () -> Unit,
    themeColor: Int,
    darkMode: DarkMode,
    isDarkMode: Boolean,
    onThemeColorChange: (Int) -> Unit,
    onDarkModeChange: (DarkMode) -> Unit,
) = BottomSheet(onDismissRequest = onClose) {
    Text(
        text = stringResource(id = R.string.settings_app_theme),
        style = MaterialTheme.typography.headlineSmall,
        modifier = Modifier.align(Alignment.CenterHorizontally)
    )

    TitleItem(text = stringResource(id = R.string.app_theme_palette))
    ThemePaletteItem(
        themeColor = themeColor,
        isDarkMode = isDarkMode,
        onChange = onThemeColorChange
    )

    TitleItem(text = stringResource(id = R.string.app_theme_dark_theme))
    DarkModeItem(
        darkMode = darkMode,
        onChange = onDarkModeChange
    )
}

@Composable
private fun TitleItem(
    text: String
) = Text(
    text = text,
    style = MaterialTheme.typography.titleSmall,
    modifier = Modifier.padding(start = 18.dp, top = 18.dp)
)