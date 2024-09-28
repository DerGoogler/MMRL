package com.dergoogler.mmrl.ui.screens.repository

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.repository.Option
import com.dergoogler.mmrl.datastore.repository.RepositoryMenuCompat
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.state.OnlineState
import com.dergoogler.mmrl.ui.component.MenuChip
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.component.Segment
import com.dergoogler.mmrl.ui.component.SegmentedButtons
import com.dergoogler.mmrl.ui.component.SegmentedButtonsDefaults
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.expandedShape

@Composable
fun RepositoryMenu(
    setMenu: (RepositoryMenuCompat) -> Unit
) {
    val userPreferences = LocalUserPreferences.current
    var open by rememberSaveable { mutableStateOf(false) }

    IconButton(
        onClick = { open = true }
    ) {
        Icon(
            painter = painterResource(id = R.drawable.menu_2),
            contentDescription = null
        )

        if (open) {
            BottomSheet(
                onClose = { open = false },
                menu = userPreferences.repositoryMenu,
                setMenu = setMenu
            )
        }
    }
}

@Composable
private fun BottomSheet(
    onClose: () -> Unit,
    menu: RepositoryMenuCompat,
    setMenu: (RepositoryMenuCompat) -> Unit
) = ModalBottomSheet(
    onDismissRequest = onClose,
    sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    shape = BottomSheetDefaults.expandedShape(15.dp),
    windowInsets = WindowInsets(0)
) {
    val options = listOf(
        Option.NAME to R.string.menu_sort_option_name,
        Option.UPDATED_TIME to R.string.menu_sort_option_updated
    )

    Text(
        text = stringResource(id = R.string.menu_advanced_menu),
        style = MaterialTheme.typography.headlineSmall,
        modifier = Modifier.align(Alignment.CenterHorizontally)
    )

    Column(
        modifier = Modifier.padding(all = 18.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
//        Surface(
//            modifier = Modifier.padding(bottom = 8.dp),
//            shape = RoundedCornerShape(10.dp),
//            tonalElevation = 6.dp,
//            border = BorderStroke(1.dp, color = MaterialTheme.colorScheme.outline)
//        ) {
//            ModuleItem(
//                module = OnlineModule.example(),
//                state = OnlineState.example(),
//                enabled = false
//            )
//        }

        Text(
            text = stringResource(id = R.string.menu_sort_mode),
            style = MaterialTheme.typography.titleSmall
        )

        SegmentedButtons(
            border = SegmentedButtonsDefaults.border(
                color = MaterialTheme.colorScheme.secondary
            )
        ) {
            options.forEach { (option, label) ->
                Segment(
                    selected = option == menu.option,
                    onClick = { setMenu(menu.copy(option = option)) },
                    colors = SegmentedButtonsDefaults.buttonColor(
                        selectedContainerColor = MaterialTheme.colorScheme.secondary,
                        selectedContentColor = MaterialTheme.colorScheme.onSecondary
                    ),
                    icon = null
                ) {
                    Text(text = stringResource(id = label))
                }
            }
        }

        FlowRow(
            modifier = Modifier
                .fillMaxWidth(1f)
                .wrapContentHeight(align = Alignment.Top),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            MenuChip(
                selected = menu.descending,
                onClick = { setMenu(menu.copy(descending = !menu.descending)) },
                label = { Text(text = stringResource(id = R.string.menu_descending)) }
            )

            MenuChip(
                selected = menu.pinInstalled,
                onClick = { setMenu(menu.copy(pinInstalled = !menu.pinInstalled)) },
                label = { Text(text = stringResource(id = R.string.menu_pin_installed)) }
            )

            MenuChip(
                selected = menu.pinUpdatable,
                onClick = { setMenu(menu.copy(pinUpdatable = !menu.pinUpdatable)) },
                label = { Text(text = stringResource(id = R.string.menu_pin_updatable)) }
            )

            MenuChip(
                selected = menu.showIcon,
                onClick = { setMenu(menu.copy(showIcon = !menu.showIcon)) },
                label = { Text(text = stringResource(id = R.string.menu_show_icon)) }
            )

            MenuChip(
                selected = menu.showCover,
                onClick = { setMenu(menu.copy(showCover = !menu.showCover)) },
                label = { Text(text = stringResource(id = R.string.menu_show_cover)) }
            )

            MenuChip(selected = menu.showVerified,
                onClick = { setMenu(menu.copy(showVerified = !menu.showVerified)) },
                label = { Text(text = stringResource(id = R.string.menu_show_verified)) })

            MenuChip(
                selected = menu.showLicense,
                onClick = { setMenu(menu.copy(showLicense = !menu.showLicense)) },
                label = { Text(text = stringResource(id = R.string.menu_show_license)) }
            )

            MenuChip(
                selected = menu.showAntiFeatures,
                onClick = { setMenu(menu.copy(showAntiFeatures = !menu.showAntiFeatures)) },
                label = { Text(text = stringResource(id = R.string.menu_show_antifeatures)) }
            )

            MenuChip(
                selected = menu.showUpdatedTime,
                onClick = { setMenu(menu.copy(showUpdatedTime = !menu.showUpdatedTime)) },
                label = { Text(text = stringResource(id = R.string.menu_show_updated)) }
            )
        }

        NavigationBarsSpacer()
    }
}