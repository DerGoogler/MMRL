package com.dergoogler.mmrl.ui.screens.settings.security.screens

import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.ListCollapseItem
import com.dergoogler.mmrl.ui.component.ListSwitchItem
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.ModulesViewModel
import com.dergoogler.mmrl.viewmodel.SettingsViewModel


@Composable
fun AllowJsApiScreen(
    viewModel: SettingsViewModel = hiltViewModel(),
    mViewModel: ModulesViewModel = hiltViewModel(),
) {
    val navController = LocalNavController.current

    val userPreferences = LocalUserPreferences.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    val list by mViewModel.local.collectAsStateWithLifecycle()
    val allowedFsModules = userPreferences.allowedFsModules
    val allowedKsuModules = userPreferences.allowedKsuModules

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                scrollBehavior = scrollBehavior,
                navController = navController
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->

        LazyColumn(
            state = rememberLazyListState(),
            modifier = Modifier
                .fillMaxSize(),
            contentPadding = innerPadding,
        ) {
            items(
                items = list,
                key = { it.id }
            ) { module ->
                ListCollapseItem(
                    iconToRight = true,
                    title = module.name,
                    desc = module.id
                ) {
                    ListSwitchItem(
                        title = stringResource(R.string.settings_security_allow_filesystem_api),
                        checked = module.id in allowedFsModules,
                        onChange = { checked ->
                            if (checked) {
                                val newModules = allowedFsModules + module.id
                                viewModel.setAllowedFsModules(newModules)
                            } else {
                                val newModules = allowedFsModules.filter { it != module.id }
                                viewModel.setAllowedFsModules(newModules)
                            }
                        }
                    )

                    ListSwitchItem(
                        title = stringResource(R.string.settings_security_allow_advanced_kernelsu_api),
                        checked = module.id in allowedKsuModules,
                        onChange = { checked ->
                            if (checked) {
                                val newModules = allowedKsuModules + module.id
                                viewModel.setAllowedKsuModules(newModules)
                            } else {
                                val newModules = allowedKsuModules.filter { it != module.id }
                                viewModel.setAllowedKsuModules(newModules)
                            }
                        }
                    )
                }
            }
        }
    }
}


@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController,
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_allow_javascript_api),
    scrollBehavior = scrollBehavior,
    navController = navController
)