package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
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
import com.dergoogler.mmrl.ui.screens.settings.other.OtherScreen
import com.dergoogler.mmrl.ui.screens.settings.recommendedRepos.RecommendedRepoScreen
import com.dergoogler.mmrl.ui.screens.settings.repositories.RepositoriesScreen
import com.dergoogler.mmrl.ui.screens.settings.security.SecurityScreen
import com.dergoogler.mmrl.ui.screens.settings.security.screens.AllowJsApiScreen
import com.dergoogler.mmrl.ui.screens.settings.updates.UpdatesScreen

enum class SettingsScreen(val route: String) {
    Home("Settings"),
    Repositories("Repositories"),
    RecommendedRepos("RecommendedRepos"),
    Appearance("Appearance"),
    Updates("Updates"),
    Security("Security"),
    SecurityWebUIAllowedApis("SecurityWebUIAllowedApis"),
    Modules("Modules"),
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
        route = SettingsScreen.Repositories.route,
        // deepLinks = listOf(navDeepLink { uriPattern = "mmrl://add-repo/{repoUrl}" }),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        RepositoriesScreen()
    }

    composable(
        route = SettingsScreen.Updates.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        UpdatesScreen()
    }

    composable(
        route = SettingsScreen.RecommendedRepos.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        RecommendedRepoScreen()
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
        route = SettingsScreen.SecurityWebUIAllowedApis.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        AllowJsApiScreen()
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
}