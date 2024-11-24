package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import androidx.navigation.navigation
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.screens.repository.RepositoryScreen
import com.dergoogler.mmrl.ui.screens.repository.view.CategoryScreen
import com.dergoogler.mmrl.ui.screens.repository.view.NewViewScreen
import com.dergoogler.mmrl.ui.screens.repository.view.ViewDescriptionScreen

enum class RepositoryScreen(val route: String) {
    Home("Repository"),
    View("View/{moduleId}"),
    Description("Description/{moduleId}"),
    Category("Category/{category}")
}

fun NavGraphBuilder.repositoryScreen(
    navController: NavController,
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
            navController = navController
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
            navController = navController
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
        ViewDescriptionScreen(
            navController = navController
        )
    }

    composable(
        route = RepositoryScreen.Category.route,
        arguments = listOf(navArgument("category") { type = NavType.StringType }),
        deepLinks = listOf(navDeepLink { uriPattern = "mmrl://category/{category}" },
            navDeepLink { uriPattern = "https://mmrl.dergoogler.com/category/{category}" },
            navDeepLink { uriPattern = "http://mmrl.dergoogler.com/category/{category}" }),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        CategoryScreen(
            navController = navController
        )
    }
}