package com.dergoogler.mmrl.ui.screens.settings.modulesPermissions

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.ScaffoldDefaults
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.component.listItem.ListButtonItem
import com.dergoogler.mmrl.ui.navigation.graphs.SettingsScreen
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.viewmodel.ModulePermissionsViewModel

@Composable
fun ModulesPermissionsScreen(
    mViewModel: ModulePermissionsViewModel,
) {
    val list = mViewModel.allLocal
    val navController = LocalNavController.current

    SettingsScaffold(
        modifier = ScaffoldDefaults.settingsScaffoldModifier,
        title = R.string.settings_modules_permissions
    ) {
        LazyColumn(
            state = rememberLazyListState(),
            modifier = Modifier
                .fillMaxSize(),
        ) {
            items(
                items = list,
                key = { it.id }
            ) { module ->
                ListButtonItem(
                    iconToRight = true,
                    icon = R.drawable.arrow_right,
                    title = module.name,
                    desc = module.id,
                    onClick = {
                        navController.navigateSingleTopTo(
                            route = SettingsScreen.ModulePermissions.route,
                            args = mapOf(
                                "moduleId" to module.id
                            )
                        )
                    }
                )
            }
        }
    }

}