package com.dergoogler.mmrl.ui.navigation

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import com.dergoogler.mmrl.R

enum class MainScreen(
    val route: String,
    @StringRes val label: Int,
    @DrawableRes val icon: Int,
    @DrawableRes val iconFilled: Int
) {
    Repository(
        route = "RepositoryScreen",
        label = R.string.page_repository,
        icon = R.drawable.cloud,
        iconFilled = R.drawable.cloud_filled
    ),

    Modules(
        route = "ModulesScreen",
        label = R.string.page_modules,
        icon = R.drawable.keyframes,
        iconFilled = R.drawable.keyframes_filled
    ),

    Settings(
        route = "SettingsScreen",
        label = R.string.page_settings,
        icon = R.drawable.settings,
        iconFilled = R.drawable.settings_filled
    )
}