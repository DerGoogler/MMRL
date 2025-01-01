package com.dergoogler.mmrl.ui.screens.settings.blacklist

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.PageIndicator
import com.dergoogler.mmrl.ui.component.ScaffoldDefaults
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.providable.LocalSettings
import com.dergoogler.mmrl.ui.screens.settings.blacklist.items.ModuleItem


@Composable
fun BlacklistScreen() {
    val viewModel = LocalSettings.current
    val blacklist = viewModel.allBlacklistEntriesAsFlow

    SettingsScaffold(
        modifier = ScaffoldDefaults.settingsScaffoldModifier,
        title = R.string.settings_blacklist
    ) {
        if (blacklist.isEmpty()) {
            PageIndicator(
                icon = R.drawable.cloud,
                text = R.string.search_empty,
            )
        } else {
            LazyColumn {
                items(items = blacklist,
                    key = { it.id }
                ) { module ->
                    ModuleItem(module = module)
                }
            }
        }
    }
}