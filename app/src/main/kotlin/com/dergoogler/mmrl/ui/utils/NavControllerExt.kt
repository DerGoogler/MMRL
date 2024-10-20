package com.dergoogler.mmrl.ui.utils

import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavOptionsBuilder

fun NavController.navigateSingleTopTo(
    route: String,
    builder: NavOptionsBuilder.() -> Unit = {}
) = navigate(
    route = route
) {
    launchSingleTop = true
    restoreState = true
    builder()
}

fun NavController.navigatePopUpTo(
    route: String
) = navigateSingleTopTo(
    route = route
) {
    popUpTo(
        id = currentDestination?.parent?.id ?: graph.findStartDestination().id
    ) {
        saveState = true
        inclusive = true
    }
}

fun NavController.navigatePopBackTo(
    route: String
) = navigateSingleTopTo(
    route = route
) {
    popUpTo(route) {
        inclusive = false
    }
    launchSingleTop = true
}