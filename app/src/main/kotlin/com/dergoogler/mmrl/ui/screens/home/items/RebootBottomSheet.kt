package com.dergoogler.mmrl.ui.screens.home.items

import android.content.Context
import android.os.Build
import android.os.PowerManager
import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.rememberModalBottomSheetState
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
import com.dergoogler.mmrl.ui.component.ConfirmRebootDialog
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.expandedShape
import com.dergoogler.mmrl.viewmodel.HomeViewModel

@Composable
fun RebootBottomSheet(
    onClose: () -> Unit,
) = ModalBottomSheet(
    onDismissRequest = onClose,
    sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    shape = BottomSheetDefaults.expandedShape(15.dp),
    windowInsets = WindowInsets(0),
) {
    Column(
        modifier = Modifier.padding(bottom = 18.dp),
    ) {

        RebootItem(title = R.string.reboot)

        val pm = LocalContext.current.getSystemService(Context.POWER_SERVICE) as PowerManager?
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && pm?.isRebootingUserspaceSupported == true) {
            RebootItem(title = R.string.reboot_userspace, reason = "userspace")
        }
        RebootItem(title = R.string.reboot_recovery, reason = "recovery")
        RebootItem(title = R.string.reboot_bootloader, reason = "bootloader")
        RebootItem(title = R.string.reboot_download, reason = "download")
        RebootItem(title = R.string.reboot_edl, reason = "edl")

        NavigationBarsSpacer()
    }
}

@Composable
private fun RebootItem(
    viewModel: HomeViewModel = hiltViewModel(),
    @StringRes title: Int, reason: String = "",
) {
    val userPreferences = LocalUserPreferences.current

    var confirmReboot by remember { mutableStateOf(false) }
    if (confirmReboot) ConfirmRebootDialog(
        onClose = { confirmReboot = false },
        onConfirm = {
            confirmReboot = false
            viewModel.reboot(reason)
        }
    )

    ListButtonItem(title = stringResource(id = title), onClick = {
        if (userPreferences.confirmReboot) {
            confirmReboot = true
        } else {
            viewModel.reboot(reason)
        }
    })
}
