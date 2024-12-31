package com.dergoogler.mmrl.ui.screens.home.items

import android.content.Context
import android.os.Build
import android.os.PowerManager
import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.BottomSheet
import com.dergoogler.mmrl.ui.component.ConfirmDialog
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.listItem.ListButtonItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.HomeViewModel
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
fun RebootBottomSheet(
    onClose: () -> Unit,
) = BottomSheet(onDismissRequest = onClose) {
    Column(
        modifier = Modifier.padding(bottom = 18.dp),
    ) {

        RebootItem(title = R.string.reboot)

        val pm = LocalContext.current.getSystemService(Context.POWER_SERVICE) as PowerManager?

        val hasSoftReboot =
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && pm?.isRebootingUserspaceSupported == true

        RebootItem(
            enabled = hasSoftReboot,
            title = R.string.reboot_userspace,
            labels = !hasSoftReboot nullable listOf { LabelItem("Android +11") },
            reason = "userspace"
        )

        RebootItem(title = R.string.reboot_recovery, reason = "recovery")
        RebootItem(title = R.string.reboot_bootloader, reason = "bootloader")
        RebootItem(title = R.string.reboot_download, reason = "download")
        RebootItem(title = R.string.reboot_edl, reason = "edl")
    }
}

@Composable
private fun RebootItem(
    enabled: Boolean = true,
    labels: List<@Composable RowScope.() -> Unit>? = null,
    viewModel: HomeViewModel = hiltViewModel(),
    @StringRes title: Int, reason: String = "",
) {
    val userPreferences = LocalUserPreferences.current

    var confirmReboot by remember { mutableStateOf(false) }
    if (confirmReboot) ConfirmDialog(
        title = R.string.install_screen_reboot_title,
        description = R.string.install_screen_reboot_text,
        onClose = { confirmReboot = false },
        onConfirm = {
            confirmReboot = false
            viewModel.reboot()
        }
    )

    ListButtonItem(
        labels = labels,
        enabled = enabled,
        title = stringResource(id = title), onClick = {
            if (userPreferences.confirmReboot) {
                confirmReboot = true
            } else {
                viewModel.reboot(reason)
            }
        })
}
