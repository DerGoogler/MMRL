package com.dergoogler.mmrl.ui.screens.modules

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
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
import com.dergoogler.mmrl.datastore.modules.ModulesMenuCompat
import com.dergoogler.mmrl.datastore.repository.Option
import com.dergoogler.mmrl.ui.component.MenuChip
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.component.Segment
import com.dergoogler.mmrl.ui.component.SegmentedButtons
import com.dergoogler.mmrl.ui.component.SegmentedButtonsDefaults
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.expandedShape

@Composable
fun ModulesMenu(
    setMenu: (ModulesMenuCompat) -> Unit
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
                menu = userPreferences.modulesMenu,
                setMenu = setMenu
            )
        }
    }
}

@Composable
private fun BottomSheet(
    onClose: () -> Unit,
    menu: ModulesMenuCompat,
    setMenu: (ModulesMenuCompat) -> Unit
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
                selected = menu.pinEnabled,
                onClick = { setMenu(menu.copy(pinEnabled = !menu.pinEnabled)) },
                label = { Text(text = stringResource(id = R.string.menu_pin_enabled)) }
            )

            MenuChip(
                selected = menu.showUpdatedTime,
                onClick = { setMenu(menu.copy(showUpdatedTime = !menu.showUpdatedTime)) },
                label = { Text(text = stringResource(id = R.string.menu_show_updated)) }
            )
        }
    }

    NavigationBarsSpacer()
}