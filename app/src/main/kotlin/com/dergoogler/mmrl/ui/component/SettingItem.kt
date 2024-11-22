package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.calculateStartPadding
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.screens.repository.ModuleItemDetailed
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.viewmodel.ModuleViewModel

@Composable
fun ListHeader(
    modifier: Modifier = Modifier,
    title: String,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 8.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    enabled: Boolean = true,
) {
    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            modifier = modifier,
            text = title,
            style = itemTextStyle.titleTextStyle,
            color = MaterialTheme.colorScheme.primary
        )
    }
}

@Composable
private fun BaseListContent(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    labels: List<String>? = null,
) {
    Column(
        modifier = modifier.fillMaxWidth(), verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = title, style = itemTextStyle.titleTextStyle, color = itemTextStyle.titleTextColor
        )
        desc?.let {
            Text(
                text = desc,
                style = itemTextStyle.descTextStyle,
                color = itemTextStyle.descTextColor
            )
        }
        labels?.let {
            Row(
                modifier = Modifier.padding(top = 5.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                it.forEach { label ->
                    LabelItem(
                        text = label,
                    )
                }
            }
        }
    }
}

@Composable
fun ListItem(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    labels: List<String>? = null,
) {
    val layoutDirection = LocalLayoutDirection.current
    val start by remember {
        derivedStateOf { contentPaddingValues.calculateStartPadding(layoutDirection) }
    }

    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        icon?.let {
            Icon(
                modifier = Modifier.size(ListItemDefaults.IconSize),
                painter = painterResource(id = icon),
                contentDescription = null,
                tint = LocalContentColor.current
            )

            Spacer(modifier = Modifier.width(start))
        }

        BaseListContent(
            title = title, desc = desc, itemTextStyle = itemTextStyle, labels = labels
        )
    }
}

@Composable
fun ListButtonItem(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    onClick: () -> Unit,
    onLongClick: () -> Unit = {},
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    labels: List<String>? = null,
) {
    val layoutDirection = LocalLayoutDirection.current
    val start by remember {
        derivedStateOf { contentPaddingValues.calculateStartPadding(layoutDirection) }
    }

    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .combinedClickable(
                enabled = enabled,
                onClick = onClick,
                onLongClick = onLongClick,
                interactionSource = interactionSource,
                indication = rememberRipple()
            )
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        icon?.let {
            Icon(
                modifier = Modifier.size(ListItemDefaults.IconSize),
                painter = painterResource(id = icon),
                contentDescription = null,
                tint = LocalContentColor.current
            )

            Spacer(modifier = Modifier.width(start))
        }

        BaseListContent(
            title = title, desc = desc, itemTextStyle = itemTextStyle, labels = labels
        )
    }
}

@Composable
fun ListSwitchItem(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    checked: Boolean,
    onChange: (Boolean) -> Unit,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    labels: List<String>? = null,
) {
    val layoutDirection = LocalLayoutDirection.current
    val start by remember {
        derivedStateOf { contentPaddingValues.calculateStartPadding(layoutDirection) }
    }

    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .toggleable(
                value = checked,
                enabled = enabled,
                onValueChange = onChange,
                role = Role.Switch,
                interactionSource = interactionSource,
                indication = rememberRipple()
            )
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        icon?.let {
            Icon(
                modifier = Modifier.size(ListItemDefaults.IconSize),
                painter = painterResource(id = icon),
                contentDescription = null
            )

            Spacer(modifier = Modifier.width(start))
        }


        BaseListContent(
            modifier = Modifier
                .weight(1f)
                .padding(end = ListItemDefaults.TextSwitchPadding),
            title = title,
            desc = desc,
            itemTextStyle = itemTextStyle,
            labels = labels
        )

        Switch(
            checked = checked,
            onCheckedChange = null
        )
    }
}


@Composable
fun ListEditTextItem(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    value: String,
    onConfirm: (String) -> Unit,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    labels: List<String>? = null,
) {
    var open by remember { mutableStateOf(false) }
    if (open) EditTextDialog(
        value = value,
        title = title,
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
        enabled = enabled, itemTextStyle = itemTextStyle, labels = labels
    )
}

@Composable
private fun EditTextDialog(
    title: String,
    value: String,
    onClose: () -> Unit,
    onConfirm: (String) -> Unit,
) {
    var text by remember { mutableStateOf(value) }

    val onDone: () -> Unit = {
        onConfirm(text)
        onClose()
    }

    TextFieldDialog(
        shape = RoundedCornerShape(20.dp),
        onDismissRequest = onClose,
        title = { Text(text = title) },
        confirmButton = {
            TextButton(
                onClick = onDone,
                enabled = text.isNotBlank()
            ) {
                Text(text = stringResource(id = R.string.install_screen_reboot_confirm))
            }
        },
        dismissButton = {
            TextButton(
                onClick = onClose
            ) {
                Text(text = stringResource(id = R.string.dialog_cancel))
            }
        }
    ) { focusRequester ->
        OutlinedTextField(
            modifier = Modifier.focusRequester(focusRequester),
            textStyle = MaterialTheme.typography.bodyLarge,
            value = text,
            onValueChange = { text = it },
            singleLine = false,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Text,
                imeAction = ImeAction.Done
            ),
            keyboardActions = KeyboardActions {
                if (text.isNotBlank()) onDone()
            },
            shape = RoundedCornerShape(15.dp)
        )
    }
}

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
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    labels: List<String>? = null,
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
        enabled = enabled, itemTextStyle = itemTextStyle, labels = labels
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
                                indication = rememberRipple()
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


@Immutable
class ListItemTextStyle internal constructor(
    val titleTextColor: Color,
    val descTextColor: Color,
    val titleTextStyle: TextStyle,
    val descTextStyle: TextStyle,
) {
    @Suppress("RedundantIf")
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || other !is ListItemTextStyle) return false

        if (titleTextColor != other.titleTextColor) return false
        if (descTextColor != other.descTextColor) return false
        if (titleTextStyle != other.titleTextStyle) return false
        if (descTextStyle != other.descTextStyle) return false

        return true
    }

    override fun hashCode(): Int {
        var result = titleTextColor.hashCode()
        result = 31 * result + descTextColor.hashCode()
        result = 31 * result + titleTextStyle.hashCode()
        result = 31 * result + descTextStyle.hashCode()
        return result
    }
}

object ListItemDefaults {
    val IconSize = 24.dp
    val TextSwitchPadding = 16.dp

    @Composable
    fun itemStyle(
        titleTextColor: Color = LocalContentColor.current,
        descTextColor: Color = MaterialTheme.colorScheme.outline,
        titleTextStyle: TextStyle = MaterialTheme.typography.bodyLarge,
        descTextStyle: TextStyle = MaterialTheme.typography.bodyMedium,
    ) = ListItemTextStyle(
        titleTextColor = titleTextColor,
        descTextColor = descTextColor,
        titleTextStyle = titleTextStyle,
        descTextStyle = descTextStyle
    )
}