package com.dergoogler.mmrl.ui.activity

import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavController
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.navigation.graphs.modulesScreen
import com.dergoogler.mmrl.ui.navigation.graphs.repositoryScreen
import com.dergoogler.mmrl.ui.navigation.graphs.settingsScreen
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.navigatePopUpTo

@Composable
fun MainScreen() {
    val userPreferences = LocalUserPreferences.current
    val navController = rememberNavController()

    Scaffold(
        bottomBar = {
            BottomNav(
                navController = navController,
                isRoot = userPreferences.workingMode.isRoot
            )
        }
    ) {
        NavHost(
            modifier = Modifier.padding(bottom = it.calculateBottomPadding()),
            navController = navController,
            startDestination = MainScreen.Repository.route
        ) {
            repositoryScreen(
                navController = navController
            )
            modulesScreen(
                navController = navController
            )
            settingsScreen(
                navController = navController
            )
        }
    }
}

@Composable
private fun BottomNav(
    navController: NavController,
    isRoot: Boolean
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    val mainScreens by remember(isRoot) {
        derivedStateOf {
            if (isRoot) {
                listOf(MainScreen.Repository, MainScreen.Modules, MainScreen.Settings)
            } else {
                listOf(MainScreen.Repository, MainScreen.Settings)
            }
        }
    }

    NavigationBar(
        modifier = Modifier.imePadding()
    ) {
        mainScreens.forEach { screen ->
            val selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true

            NavigationBarItem(
                icon = {
                    Icon(
                        painter = painterResource(
                            id = if (selected) {
                                screen.iconFilled
                            } else {
                                screen.icon
                            }
                        ),
                        contentDescription = null,
                    )
                },
                label = {
                    Text(
                        text = stringResource(id = screen.label),
                        style = MaterialTheme.typography.labelLarge
                    )
                },
                alwaysShowLabel = true, selected = selected, onClick = {
                    navController.navigatePopUpTo(
                        route = screen.route,
                        restoreState = !selected
                    )
                }
            )
        }
    }
}