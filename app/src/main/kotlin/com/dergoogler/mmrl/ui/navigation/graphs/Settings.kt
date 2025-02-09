package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable
import androidx.navigation.navigation
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.screens.settings.SettingsScreen
import com.dergoogler.mmrl.ui.screens.settings.appearance.AppearanceScreen
import com.dergoogler.mmrl.ui.screens.settings.blacklist.BlacklistScreen
import com.dergoogler.mmrl.ui.screens.settings.changelogs.ChangelogScreen
import com.dergoogler.mmrl.ui.screens.settings.developer.DeveloperScreen
import com.dergoogler.mmrl.ui.screens.settings.modules.ModulesScreen
import com.dergoogler.mmrl.ui.screens.settings.modulesPermissions.ModulesPermissionsScreen
import com.dergoogler.mmrl.ui.screens.settings.modulesPermissions.screens.ModulePermissionsScreen
import com.dergoogler.mmrl.ui.screens.settings.other.OtherScreen
import com.dergoogler.mmrl.ui.screens.settings.security.SecurityScreen
import com.dergoogler.mmrl.ui.screens.settings.updates.UpdatesScreen
import com.dergoogler.mmrl.ui.utils.panicArguments
import com.dergoogler.mmrl.viewmodel.ModulePermissionsViewModel

enum class SettingsScreen(val route: String) {
    Home("Settings"),
    Appearance("Appearance"),
    Updates("Updates"),
    Security("Security"),
    Modules("Modules"),
    ModulesPermissions("ModulesPermissions"),
    ModulePermissions("ModulePermissions/{moduleId}"),
    Other("Other"),
    Blacklist("Blacklist"),
    Changelog("Changelog"),
    Developer("Developer"),
}

fun NavGraphBuilder.settingsScreen() = navigation(
    startDestination = SettingsScreen.Home.route,
    route = MainScreen.Settings.route
) {
    composable(
        route = SettingsScreen.Home.route,
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        SettingsScreen()
    }

    composable(
        route = SettingsScreen.Updates.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        UpdatesScreen()
    }

    composable(
        route = SettingsScreen.Appearance.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        AppearanceScreen()
    }

    composable(
        route = SettingsScreen.Security.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        SecurityScreen()
    }

    composable(
        route = SettingsScreen.Modules.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        ModulesScreen()
    }

    composable(
        route = SettingsScreen.Other.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        OtherScreen()
    }

    composable(
        route = SettingsScreen.Blacklist.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        BlacklistScreen()
    }

    composable(
        route = SettingsScreen.Changelog.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        ChangelogScreen()
    }

    composable(
        route = SettingsScreen.Developer.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        DeveloperScreen()
    }

    composable(
        route = SettingsScreen.ModulesPermissions.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        val arguments = it.panicArguments

        val viewModel =
            hiltViewModel<ModulePermissionsViewModel, ModulePermissionsViewModel.Factory> { factory ->
                factory.create(arguments)
            }

        ModulesPermissionsScreen(viewModel)
    }

    composable(
        route = SettingsScreen.ModulePermissions.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        val arguments = it.panicArguments

        val viewModel =
            hiltViewModel<ModulePermissionsViewModel, ModulePermissionsViewModel.Factory> { factory ->
                factory.create(arguments)
            }


        ModulePermissionsScreen(viewModel)
    }
}