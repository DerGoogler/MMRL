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
    route: String,
    restoreState: Boolean = true,
    inclusive: Boolean = true,
) = navigateSingleTopTo(
    route = route
) {
    popUpTo(
        id = currentDestination?.parent?.id ?: graph.findStartDestination().id
    ) {
        this.saveState = restoreState
        this.inclusive = inclusive
    }
    this.launchSingleTop = true
    this.restoreState = restoreState
}