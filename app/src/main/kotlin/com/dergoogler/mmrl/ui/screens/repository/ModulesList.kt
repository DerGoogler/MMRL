package com.dergoogler.mmrl.ui.screens.repository

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.dergoogler.mmrl.datastore.repository.RepoListMode
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.state.OnlineState
import com.dergoogler.mmrl.ui.component.scrollbar.VerticalFastScrollbar
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.viewmodel.ModuleViewModel

@Composable
fun ModulesList(
    list: List<Pair<OnlineState, OnlineModule>>,
    state: LazyListState,
    navController: NavController
) {
    val userPreferences = LocalUserPreferences.current
    val menu = userPreferences.repositoryMenu
    when (menu.repoListMode) {
        RepoListMode.COMPACT -> Compact(list, state, navController)
        RepoListMode.DETAILED -> Detailed(list, state, navController)
        RepoListMode.UNRECOGNIZED -> Detailed(list, state, navController)
    }
}

@Composable
fun Detailed(
    list: List<Pair<OnlineState, OnlineModule>>,
    state: LazyListState,
    navController: NavController
) {
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        LazyColumn(
            state = state,
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(
                items = list,
                key = { it.second.id }
            ) { (state, module) ->
                ModuleItemDetailed(
                    module = module,
                    state = state,
                    onClick = {
                        navController.navigateSingleTopTo(
                            ModuleViewModel.putModuleId(module)
                        )
                    }
                )
            }
        }

        VerticalFastScrollbar(
            state = state,
            modifier = Modifier.align(Alignment.CenterEnd)
        )
    }
}

@Composable
fun Compact(
    list: List<Pair<OnlineState, OnlineModule>>,
    state: LazyListState,
    navController: NavController
) {
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        LazyColumn(
            state = state,
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(5.dp)
        ) {
            items(
                items = list,
                key = { it.second.id }
            ) { (state, module) ->
                ModuleItemCompact(
                    module = module,
                    state = state,
                    onClick = {
                        navController.navigateSingleTopTo(
                            ModuleViewModel.putModuleId(module)
                        )
                    }
                )
            }
        }

        VerticalFastScrollbar(
            state = state,
            modifier = Modifier.align(Alignment.CenterEnd)
        )
    }
}