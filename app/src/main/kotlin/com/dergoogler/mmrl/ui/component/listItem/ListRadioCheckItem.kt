package com.dergoogler.mmrl.ui.component.listItem

import androidx.annotation.DrawableRes
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.selection.toggleable
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R

@Composable
fun <T> ListRadioCheckItem(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    value: T,
    options: List<T>,
    suffix: String? = null,
    prefix: String? = null,
    onConfirm: (T) -> Unit,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    base: BaseParameters.() -> Unit = {},
) {
    var open by remember { mutableStateOf(false) }
    if (open) RadioCheckDialog(
        value = value,
        title = title,
        suffix = suffix,
        prefix = prefix,
        options = options,
        onClose = { open = false },
        onConfirm = onConfirm
    )

    ListButtonItem(
        modifier = modifier,
        icon = icon,
        title = title,
        desc = desc,
        onClick = { open = true },
        contentPaddingValues = contentPaddingValues,
        interactionSource = interactionSource,
        enabled = enabled,
        itemTextStyle = itemTextStyle,
        base = base
    )
}


@Composable
fun <T> RadioCheckDialog(
    value: T,
    title: String,
    suffix: String? = null,
    prefix: String? = null,
    options: List<T>,
    onClose: () -> Unit,
    onConfirm: (T) -> Unit,
) {
    var selectedOption by remember { mutableStateOf(value) }

    val onDone: () -> Unit = {
        onConfirm(selectedOption)
        onClose()
    }

    AlertDialog(
        onDismissRequest = onClose,
        title = { Text(title) },
        text = {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                items(
                    items = options,
                ) { option ->
                    val checked = option == selectedOption
                    val interactionSource = remember { MutableInteractionSource() }

                    Row(
                        modifier = Modifier
                            .toggleable(
                                value = checked,
                                onValueChange = {
                                    selectedOption = option
                                },
                                role = Role.RadioButton,
                                interactionSource = interactionSource,
                                indication = ripple()
                            )
                            .fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        RadioButton(
                            selected = checked,
                            onClick = null
                        )

                        Spacer(modifier = Modifier.width(8.dp))

                        when {
                            prefix != null -> Text(text = "$prefix${option.toString()}")
                            suffix != null -> Text(text = "${option.toString()}$suffix")
                            else -> Text(text = option.toString())
                        }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDone) {
                Text(stringResource(id = R.string.install_screen_reboot_confirm))
            }
        },
        dismissButton = {
            TextButton(onClick = onClose) {
                Text(stringResource(id = R.string.dialog_cancel))
            }
        }
    )
}


