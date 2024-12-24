package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import androidx.navigation.navigation
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.screens.repository.RepositoryScreen
import com.dergoogler.mmrl.ui.screens.repository.view.FilteredSearchScreen
import com.dergoogler.mmrl.ui.screens.repository.view.NewViewScreen
import com.dergoogler.mmrl.ui.screens.repository.view.ViewDescriptionScreen
import com.dergoogler.mmrl.viewmodel.BulkInstallViewModel

enum class RepositoryScreen(val route: String) {
    Home("Repository"),
    View("View/{moduleId}"),
    Description("Description/{moduleId}"),
    RepoSearch("RepoSearch/{type}/{value}")
}

fun NavGraphBuilder.repositoryScreen(
    bulkInstallViewModel: BulkInstallViewModel
) = navigation(
    startDestination = RepositoryScreen.Home.route,
    route = MainScreen.Repository.route
) {
    composable(
        route = RepositoryScreen.Home.route,
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        RepositoryScreen(
            bulkInstallViewModel = bulkInstallViewModel
        )
    }

    composable(
        route = RepositoryScreen.View.route,
        arguments = listOf(navArgument("moduleId") { type = NavType.StringType }),
        deepLinks = listOf(navDeepLink { uriPattern = "mmrl://module/{moduleId}" },
            navDeepLink { uriPattern = "https://mmrl.dergoogler.com/module/{moduleId}" },
            navDeepLink { uriPattern = "http://mmrl.dergoogler.com/module/{moduleId}" }),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        NewViewScreen(
            bulkInstallViewModel = bulkInstallViewModel
        )
    }

    composable(
        route = RepositoryScreen.Description.route,
        arguments = listOf(navArgument("moduleId") { type = NavType.StringType }),
        deepLinks = listOf(navDeepLink { uriPattern = "mmrl://module/{moduleId}/readme" },
            navDeepLink { uriPattern = "https://mmrl.dergoogler.com/module/{moduleId}/readme" },
            navDeepLink { uriPattern = "http://mmrl.dergoogler.com/module/{moduleId}/readme" }),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        ViewDescriptionScreen()
    }

    composable(
        route = RepositoryScreen.RepoSearch.route,
        arguments = listOf(navArgument("type") { type = NavType.StringType },navArgument("value") { type = NavType.StringType }),
        deepLinks = listOf(navDeepLink { uriPattern = "mmrl://search/{type}/{value}" },
            navDeepLink { uriPattern = "https://mmrl.dergoogler.com/search/{type}/{value}" },
            navDeepLink { uriPattern = "http://mmrl.dergoogler.com/search/{type}/{value}" }),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) { nav ->
        nav.arguments?.let {
            val type = it.getString("type")
            val value = it.getString("value")

            FilteredSearchScreen(
                type = type,
                value = value,
            )
        }
    }
}