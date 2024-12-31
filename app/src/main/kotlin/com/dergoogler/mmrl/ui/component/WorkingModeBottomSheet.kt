package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.WorkingMode
import com.dergoogler.mmrl.ui.component.listItem.ListButtonItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.SettingsViewModel
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
fun WorkingModeBottomSheet(
    onClose: () -> Unit,
    viewModel: SettingsViewModel = hiltViewModel(),
) = BottomSheet(
    onDismissRequest = onClose,
    enabledNavigationSpacer = false
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
    ) {
        WorkingModeItems(
            isSetup = false,
            setMode = viewModel::setWorkingMode,
        )
    }
}

@Composable
fun WorkingModeItems(
    isSetup: Boolean,
    setMode: (WorkingMode) -> Unit,
) {
    val userPreferences = LocalUserPreferences.current

    WorkingModeItem(
        icon = R.drawable.magisk_logo,
        title = stringResource(R.string.working_mode_magisk_title),
        desc = stringResource(R.string.working_mode_magisk_desc),
        selected = !isSetup && (userPreferences.workingMode == WorkingMode.MODE_MAGISK),
        onClick = { setMode(WorkingMode.MODE_MAGISK) }
    )

    WorkingModeItem(
        icon = R.drawable.kernelsu_logo,
        title = stringResource(R.string.working_mode_kernelsu_title),
        desc = stringResource(R.string.working_mode_kernelsu_desc),
        selected = !isSetup && (userPreferences.workingMode == WorkingMode.MODE_KERNEL_SU),
        onClick = { setMode(WorkingMode.MODE_KERNEL_SU) }
    )

    WorkingModeItem(
        icon = R.drawable.kernelsu_next_logo,
        title = stringResource(R.string.working_mode_kernelsu_next_title),
        desc = stringResource(R.string.working_mode_kernelsu_next_desc),
        selected = !isSetup && (userPreferences.workingMode == WorkingMode.MODE_KERNEL_SU_NEXT),
        onClick = { setMode(WorkingMode.MODE_KERNEL_SU_NEXT) }
    )

    WorkingModeItem(
        icon = R.drawable.brand_android,
        title = stringResource(R.string.working_mode_apatch_title),
        desc = stringResource(R.string.working_mode_apatch_desc),
        selected = !isSetup && (userPreferences.workingMode == WorkingMode.MODE_APATCH),
        onClick = { setMode(WorkingMode.MODE_APATCH) }
    )

    WorkingModeItem(
        icon = R.drawable.shield_lock,
        title = stringResource(id = R.string.setup_non_root_title),
        desc = stringResource(id = R.string.setup_non_root_desc),
        selected = !isSetup && (userPreferences.workingMode == WorkingMode.MODE_NON_ROOT),
        onClick = { setMode(WorkingMode.MODE_NON_ROOT) }
    )
}

@Composable
fun WorkingModeItem(
    title: String,
    desc: String,
    @DrawableRes icon: Int? = null,
    selected: Boolean = false,
    onClick: () -> Unit,
) = ListButtonItem(
    icon = icon,
    title = title,
    desc = desc,
    onClick = onClick,
    base = {
        labels = selected nullable listOf {
            LabelItem(
                text = stringResource(id = R.string.selected)
            )
        }
    }
)