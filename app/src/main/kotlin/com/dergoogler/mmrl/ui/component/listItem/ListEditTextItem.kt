package com.dergoogler.mmrl.ui.component.listItem

import androidx.annotation.DrawableRes
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.TextFieldDialog
import dev.dergoogler.mmrl.compat.ext.nullable

data class DialogParameters(
    var desc: @Composable ((String) -> Unit)? = null,
    var supportingText: @Composable ((Boolean) -> Unit)? = null,
)

@Composable
fun ListEditTextItem(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    value: String,
    onConfirm: (String) -> Unit,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
    onValid: ((String) -> Boolean)? = null,
    dialog: DialogParameters.() -> Unit = {},
    base: BaseParameters.() -> Unit = {},
) {
    val dialogParameters = remember { DialogParameters() }.apply(dialog)

    var open by remember { mutableStateOf(false) }
    if (open) EditTextDialog(
        value = value,
        title = title,
        onClose = { open = false },
        onConfirm = onConfirm,
        onValid = onValid,
        dialogParameters = dialogParameters,
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
private fun EditTextDialog(
    title: String,
    value: String,
    onValid: ((String) -> Boolean)? = null,
    onClose: () -> Unit,
    onConfirm: (String) -> Unit,
    dialogParameters: DialogParameters,
) {
    var text by remember { mutableStateOf(value) }
    var isError by remember { mutableStateOf(false) }

    val onDone: () -> Unit = {
        onConfirm(text)
        onClose()
    }

    onValid.nullable { c ->
        LaunchedEffect(c) {
            isError = c(value)
        }
    }

    TextFieldDialog(
        shape = RoundedCornerShape(20.dp),
        onDismissRequest = onClose,
        title = { Text(text = title) },
        confirmButton = {
            TextButton(
                onClick = onDone,
                enabled = !isError && text.isNotBlank()
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
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            dialogParameters.desc.nullable {
                it(text)
            }

            OutlinedTextField(
                modifier = Modifier.focusRequester(focusRequester),
                textStyle = MaterialTheme.typography.bodyLarge,
                value = text,
                onValueChange = {
                    onValid.nullable { c ->
                        isError = c(it)
                    }
                    text = it
                },
                singleLine = false,
                supportingText = {
                    dialogParameters.supportingText.nullable {
                        it(isError)
                    }
                },
                isError = isError,
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
}

