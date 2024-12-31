package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.runtime.CompositionLocalProvider
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import androidx.navigation.navigation
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.providable.LocalModuleArguments
import com.dergoogler.mmrl.ui.providable.LocalRepoArguments
import com.dergoogler.mmrl.ui.providable.ModuleArguments
import com.dergoogler.mmrl.ui.providable.RepoArguments
import com.dergoogler.mmrl.ui.screens.repositories.screens.main.RepositoriesScreen
import com.dergoogler.mmrl.ui.screens.repositories.screens.repository.RepositoryScreen
import com.dergoogler.mmrl.ui.screens.repositories.screens.view.FilteredSearchScreen
import com.dergoogler.mmrl.ui.screens.repositories.screens.view.NewViewScreen
import com.dergoogler.mmrl.ui.screens.repositories.screens.view.ViewDescriptionScreen
import com.dergoogler.mmrl.viewmodel.BulkInstallViewModel
import dev.dergoogler.mmrl.compat.ext.toEncodedUrl

enum class RepositoriesScreen(val route: String) {
    Home("Repository"),
    View("View/{moduleId}/{repoUrl}"),
    RepositoryView("RepositoryView/{repoUrl}/{repoName}"),
    Description("Description/{moduleId}/{repoUrl}"),
    RepoSearch("RepoSearch/{type}/{value}")
}

fun NavGraphBuilder.repositoryScreen(
    bulkInstallViewModel: BulkInstallViewModel,
) = navigation(
    startDestination = RepositoriesScreen.Home.route,
    route = MainScreen.Repository.route
) {
    composable(
        route = RepositoriesScreen.Home.route,
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        RepositoriesScreen(
            bulkInstallViewModel = bulkInstallViewModel
        )
    }

    composable(
        route = RepositoriesScreen.RepositoryView.route,
        arguments = listOf(
            navArgument("repoUrl") { type = NavType.StringType },
            navArgument("repoName") { type = NavType.StringType }
        ),
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        val repoUrl = it.arguments?.getString("repoUrl")
        val repoName = it.arguments?.getString("repoName")

        if (repoUrl == null || repoName == null) throw NullPointerException("repoUrl or repoName is null")

        CompositionLocalProvider(
            LocalRepoArguments provides RepoArguments(
                repoUrl.toEncodedUrl(),
                repoName.toEncodedUrl()
            )
        ) {
            RepositoryScreen()
        }
    }

    composable(
        route = RepositoriesScreen.View.route,
        arguments = listOf(
            navArgument("moduleId") { type = NavType.StringType },
            navArgument("repoUrl") { type = NavType.StringType },
        ),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        val moduleId = it.arguments?.getString("moduleId")
        val repoUrl = it.arguments?.getString("repoUrl")

        if (repoUrl == null || moduleId == null) throw NullPointerException("repoUrl or repoName is null")

        CompositionLocalProvider(
            LocalModuleArguments provides ModuleArguments(
                moduleId.toEncodedUrl(),
                repoUrl.toEncodedUrl(),
            )
        ) {
            NewViewScreen(
                bulkInstallViewModel = bulkInstallViewModel
            )
        }
    }

    composable(
        route = RepositoriesScreen.Description.route,
        arguments = listOf(
            navArgument("moduleId") { type = NavType.StringType },
            navArgument("repoUrl") { type = NavType.StringType },
        ),
        enterTransition = { scaleIn() + fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        val moduleId = it.arguments?.getString("moduleId")
        val repoUrl = it.arguments?.getString("repoUrl")

        if (repoUrl == null || moduleId == null) throw NullPointerException("repoUrl or repoName is null")

        CompositionLocalProvider(
            LocalModuleArguments provides ModuleArguments(
                moduleId.toEncodedUrl(),
                repoUrl.toEncodedUrl(),
            )
        ) {
            ViewDescriptionScreen()
        }
    }

    composable(
        route = RepositoriesScreen.RepoSearch.route,
        arguments = listOf(
            navArgument("type") { type = NavType.StringType },
            navArgument("value") { type = NavType.StringType }),
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