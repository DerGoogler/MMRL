package com.dergoogler.mmrl.ui.navigation.graphs

import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable
import androidx.navigation.navigation
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.screens.modules.ModulesScreen

enum class ModulesScreen(val route: String) {
    Home("Modules"),
}

fun NavGraphBuilder.modulesScreen() = navigation(
    startDestination = ModulesScreen.Home.route,
    route = MainScreen.Modules.route
) {
    composable(
        route = ModulesScreen.Home.route,
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() }
    ) {
        ModulesScreen()
    }
}