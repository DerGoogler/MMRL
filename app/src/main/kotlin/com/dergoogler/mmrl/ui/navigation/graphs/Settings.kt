package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable
import androidx.navigation.navigation
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.screens.settings.SettingsScreen
import com.dergoogler.mmrl.ui.screens.settings.about.AboutScreen
import com.dergoogler.mmrl.ui.screens.settings.appearance.AppearanceScreen
import com.dergoogler.mmrl.ui.screens.settings.blacklist.BlacklistScreen
import com.dergoogler.mmrl.ui.screens.settings.changelogs.ChangelogScreen
import com.dergoogler.mmrl.ui.screens.settings.other.OtherScreen
import com.dergoogler.mmrl.ui.screens.settings.recommendedRepos.RecommendedRepoScreen
import com.dergoogler.mmrl.ui.screens.settings.repositories.RepositoriesScreen
import com.dergoogler.mmrl.ui.screens.settings.security.SecurityScreen
import com.dergoogler.mmrl.ui.screens.settings.workingmode.WorkingModeScreen

enum class SettingsScreen(val route: String) {
    Home("Settings"),
    Repositories("Repositories"),
    RecommendedRepos("RecommendedRepos"),
    Appearance("Appearance"),
    Security("Security"),
    Other("Other"),
    Blacklist("Blacklist"),
    WorkingMode("WorkingMode"), About("About"), Changelog("Changelog"),
}

fun NavGraphBuilder.settingsScreen(
    navController: NavController
) = navigation(
    startDestination = SettingsScreen.Home.route,
    route = MainScreen.Settings.route
) {
    composable(
        route = SettingsScreen.Home.route,
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        SettingsScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.Repositories.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        RepositoriesScreen(
            navController = navController
        )
    }
    
    composable(
        route = SettingsScreen.RecommendedRepos.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        RecommendedRepoScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.Appearance.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        AppearanceScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.Security.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        SecurityScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.Other.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        OtherScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.Blacklist.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        BlacklistScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.WorkingMode.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        WorkingModeScreen(
            navController = navController
        )
    }

    composable(
        route = SettingsScreen.About.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        AboutScreen(
            navController = navController
        )
    }

    composable(route = SettingsScreen.Changelog.route,
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }) {
        ChangelogScreen(
            navController = navController
        )
    }
}