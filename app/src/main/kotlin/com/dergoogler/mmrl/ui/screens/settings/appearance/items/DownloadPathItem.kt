package com.dergoogler.mmrl.ui.screens.settings.appearance.items

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.component.TextFieldDialog
import java.io.File

@Composable
fun DownloadPathItem(
    downloadPath: File,
    onChange: (File) -> Unit
) {
    var edit by remember { mutableStateOf(false) }
    if (edit) OpenDocumentTreeDialog(
        path = downloadPath,
        onClose = { edit = false },
        onConfirm = { if (it != downloadPath) onChange(it) }
    )

    ListButtonItem(
        title = stringResource(id = R.string.settings_download_path),
        desc = downloadPath.absolutePath,
        onClick = { edit = true }
    )
}

@Composable
private fun OpenDocumentTreeDialog(
    path : File,
    onClose: () -> Unit,
    onConfirm: (File) -> Unit
) {
    var name by remember {
        mutableStateOf(path.toRelativeString(Const.PUBLIC_DOWNLOADS))
    }

    TextFieldDialog(
        shape = RoundedCornerShape(20.dp),
        onDismissRequest = onClose,
        title = { Text(text = stringResource(id = R.string.settings_download_path)) },
        confirmButton = {
            TextButton(
                onClick = {
                    val new = Const.PUBLIC_DOWNLOADS.resolve(name)
                    onConfirm(new)
                    onClose()
                },
            ) {
                Text(text = stringResource(id = R.string.dialog_ok))
            }
        },
        dismissButton = {
            TextButton(
                onClick = onClose
            ) {
                Text(text = stringResource(id = R.string.dialog_cancel))
            }
        },
        launchKeyboard = false
    ) {
        OutlinedTextField(
            textStyle = MaterialTheme.typography.bodyLarge,
            value = name,
            onValueChange = { name = it },
            shape = RoundedCornerShape(15.dp),
            label = { Text(text = Const.PUBLIC_DOWNLOADS.absolutePath) },
            singleLine = true
        )
    }
}