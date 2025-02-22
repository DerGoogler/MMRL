package com.dergoogler.mmrl.ui.activity

import android.content.res.Configuration
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.add
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.calculateStartPadding
import androidx.compose.foundation.layout.displayCutout
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationRail
import androidx.compose.material3.NavigationRailDefaults
import androidx.compose.material3.NavigationRailItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.windowsizeclass.WindowSizeClass
import androidx.compose.material3.windowsizeclass.WindowWidthSizeClass
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.currentBackStackEntryAsState
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.ui.navigation.MainScreen
import com.dergoogler.mmrl.ui.navigation.graphs.homeScreen
import com.dergoogler.mmrl.ui.navigation.graphs.modulesScreen
import com.dergoogler.mmrl.ui.navigation.graphs.repositoryScreen
import com.dergoogler.mmrl.ui.navigation.graphs.settingsScreen
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalSnackbarHost
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.bars
import com.dergoogler.mmrl.ui.utils.navigatePopUpTo
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.BulkInstallViewModel

@Composable
fun MainScreen(windowSizeClass: WindowSizeClass) {
    val context = LocalContext.current
    val userPreferences = LocalUserPreferences.current
    val bulkInstallViewModel: BulkInstallViewModel = hiltViewModel()

    val navController = LocalNavController.current
    val snackbarHostState = remember { SnackbarHostState() }
    val configuration = LocalConfiguration.current

    val isLargeScreen = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Expanded
    val isLandscape = configuration.orientation == Configuration.ORIENTATION_LANDSCAPE
    val isRoot = userPreferences.workingMode.isRoot
    val isRailShown = isLargeScreen || isLandscape

    val layoutDirection = LocalLayoutDirection.current

    val mainScreens by remember(isRoot) {
        derivedStateOf {
            if (isRoot) {
                listOf(
                    MainScreen.Home,
                    MainScreen.Repository,
                    MainScreen.Modules,
                    MainScreen.Settings
                )
            } else {
                listOf(MainScreen.Home, MainScreen.Repository, MainScreen.Settings)
            }
        }
    }

    Scaffold(
        bottomBar = {
            if (isRailShown) return@Scaffold

            BottomNav(mainScreens)
        },
        snackbarHost = { SnackbarHost(snackbarHostState) },
        contentWindowInsets = WindowInsets.none
    ) { paddingValues ->
        CompositionLocalProvider(
            LocalSnackbarHost provides snackbarHostState
        ) {
            Row {
                if (isRailShown) RailNav(mainScreens)

                NavHost(
                    modifier = Modifier.let {
                        if (isLargeScreen || isLandscape) {
                            return@let it.padding(
                                start = paddingValues.calculateStartPadding(
                                    layoutDirection
                                )
                            )
                        }

                        return@let it.padding(bottom = paddingValues.calculateBottomPadding())
                    },
                    navController = navController,
                    startDestination = when (userPreferences.homepage) {
                        context.getString(MainScreen.Home.label) -> MainScreen.Home.route
                        context.getString(MainScreen.Repository.label) -> MainScreen.Repository.route
                        context.getString(MainScreen.Modules.label) -> MainScreen.Modules.route
                        else -> MainScreen.Home.route
                    }
                ) {
                    homeScreen()
                    repositoryScreen(bulkInstallViewModel = bulkInstallViewModel)
                    modulesScreen()
                    settingsScreen()
                }
            }
        }
    }
}

@Composable
private fun BottomNav(
    mainScreens: List<MainScreen>,
) {
    val navController = LocalNavController.current
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    NavigationBar(
        modifier = Modifier
            .imePadding()
            .clip(
                RoundedCornerShape(
                    topStart = 20.dp,
                    topEnd = 20.dp
                )
            )
    ) {
        mainScreens.forEach { screen ->
            val selected =
                currentDestination?.hierarchy?.any { it.route == screen.route } == true

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
                alwaysShowLabel = true,
                selected = selected,
                onClick = {
                    navController.navigatePopUpTo(
                        route = screen.route,
                        restoreState = !selected
                    )
                }
            )
        }
    }
}

@Composable
private fun RailNav(
    mainScreens: List<MainScreen>,
) {
    val navController = LocalNavController.current
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination
    val layoutDirection = LocalLayoutDirection.current

    NavigationRail(
        containerColor = Color.Transparent,
        modifier = Modifier
            .background(NavigationRailDefaults.ContainerColor)
            .padding(
                start = WindowInsets.bars
                    .asPaddingValues()
                    .calculateStartPadding(layoutDirection),
                top = WindowInsets.bars
                    .asPaddingValues()
                    .calculateTopPadding(),
            ),
        windowInsets = WindowInsets.none,
        content = {
            mainScreens.forEach { screen ->
                val selected =
                    currentDestination?.hierarchy?.any { it.route == screen.route } == true

                NavigationRailItem(
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
                    alwaysShowLabel = true,
                    selected = selected,
                    onClick = {
                        navController.navigatePopUpTo(
                            route = screen.route,
                            restoreState = !selected
                        )
                    }
                )
            }
        }
    )
}


