package com.dergoogler.mmrl.ui.component

import androidx.annotation.StringRes
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.R

@Composable
fun ConfirmDialog(
    title: @Composable() (() -> Unit)?,
    description: @Composable() (() -> Unit)?,
    onClose: () -> Unit,
    onConfirm: () -> Unit,
) {
    AlertDialog(
        title = title,
        text = description,
        onDismissRequest = {
            onClose()
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onConfirm()
                }
            ) {
                Text(text = stringResource(id = R.string.install_screen_reboot_confirm))
            }
        },
        dismissButton = {
            TextButton(
                onClick = {
                    onClose()
                }
            ) {
                Text(text = stringResource(id = R.string.dialog_cancel))
            }
        }
    )
}

@Composable
fun ConfirmDialog(
    title: String,
    description: String,
    onClose: () -> Unit,
    onConfirm: () -> Unit,
) = ConfirmDialog(
    title = {
        Text(text = title)
    },
    description = {
        Text(text = description)
    },
    onClose = onClose,
    onConfirm = onConfirm
)

@Composable
fun ConfirmDialog(
    @StringRes title: Int,
    @StringRes description: Int,
    onClose: () -> Unit,
    onConfirm: () -> Unit,
) = ConfirmDialog(
    title = {
        Text(text = stringResource(title))
    },
    description = {
        Text(text = stringResource(description))
    },
    onClose = onClose,
    onConfirm = onConfirm
)