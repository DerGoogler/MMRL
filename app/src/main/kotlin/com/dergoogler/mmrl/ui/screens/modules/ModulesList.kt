package com.dergoogler.mmrl.ui.screens.modules

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.State
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.ui.activity.ModConfActivity
import com.dergoogler.mmrl.ui.component.VersionItemBottomSheet
import com.dergoogler.mmrl.ui.component.scrollbar.VerticalFastScrollbar
import com.dergoogler.mmrl.viewmodel.ModulesViewModel

@Composable
fun ModulesList(
    list: List<LocalModule>,
    state: LazyListState,
    isProviderAlive: Boolean,
    getModuleOps: (LocalModule) -> ModulesViewModel.ModuleOps,
    getVersionItem: @Composable (LocalModule) -> VersionItem?,
    getProgress: @Composable (VersionItem?) -> Float,
    onDownload: (LocalModule, VersionItem, Boolean) -> Unit
) = Box(
    modifier = Modifier.fillMaxSize()
) {
    LazyColumn(
        state = state,
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(
            items = list,
            key = { it.id }
        ) { module ->
            ModuleItem(
                module = module,
                isProviderAlive = isProviderAlive,
                getModuleOps = getModuleOps,
                getVersionItem = getVersionItem,
                getProgress = getProgress,
                onDownload = onDownload
            )
        }
    }

    VerticalFastScrollbar(
        state = state,
        modifier = Modifier.align(Alignment.CenterEnd)
    )
}

@Composable
fun ModuleItem(
    module: LocalModule,
    isProviderAlive: Boolean,
    getModuleOps: (LocalModule) -> ModulesViewModel.ModuleOps,
    getVersionItem: @Composable (LocalModule) -> VersionItem?,
    getProgress: @Composable (VersionItem?) -> Float,
    onDownload: (LocalModule, VersionItem, Boolean) -> Unit
) {
    val ops by remember(module.state) {
        derivedStateOf { getModuleOps(module) }
    }

    val context = LocalContext.current

    val item = getVersionItem(module)
    val progress = getProgress(item)

    var open by remember { mutableStateOf(false) }
    if (open && item != null) {
        VersionItemBottomSheet(
            isUpdate = true,
            item = item,
            isProviderAlive = isProviderAlive,
            onClose = { open = false },
            onDownload = { onDownload(module, item, it) }
        )
    }

    ModuleItem(
        module = module,
        progress = progress,
        indeterminate = ops.isOpsRunning,
        alpha = when (module.state) {
            State.DISABLE, State.REMOVE -> 0.5f
            else -> 1f
        },
        decoration = when (module.state) {
            State.REMOVE -> TextDecoration.LineThrough
            else -> TextDecoration.None
        },
        switch = {
            Switch(
                checked = module.state == State.ENABLE,
                onCheckedChange = ops.toggle,
                enabled = isProviderAlive
            )
        },
        indicator = {
            when (module.state) {
                State.REMOVE -> StateIndicator(R.drawable.trash)
                State.UPDATE -> StateIndicator(R.drawable.device_mobile_down)
                else -> {}
            }
        },
        trailingButton = {


            if (module.hasModConf) {
                ModConf(
                    enabled = isProviderAlive,
                    onClick = {
                        ModConfActivity.start(context = context, modId = module.id)
                    }
                )

                Spacer(modifier = Modifier.width(12.dp))
            }

            if (item != null) {
                UpdateButton(
                    enabled = item.versionCode > module.versionCode,
                    onClick = { open = true }
                )

                Spacer(modifier = Modifier.width(12.dp))
            }

            RemoveOrRestore(
                module = module,
                enabled = isProviderAlive,
                onClick = ops.change
            )

        }
    )
}

@Composable
private fun UpdateButton(
    enabled: Boolean,
    onClick: () -> Unit
) = FilledTonalButton(
    onClick = onClick,
    enabled = enabled,
    contentPadding = PaddingValues(horizontal = 12.dp)
) {
    Icon(
        modifier = Modifier.size(20.dp),
        painter = painterResource(id = R.drawable.device_mobile_down),
        contentDescription = null
    )

    Spacer(modifier = Modifier.width(6.dp))
    Text(
        text = stringResource(id = R.string.module_update)
    )
}

@Composable
private fun RemoveOrRestore(
    module: LocalModule,
    enabled: Boolean,
    onClick: () -> Unit
) = FilledTonalButton(
    onClick = onClick,
    enabled = enabled,
    contentPadding = PaddingValues(horizontal = 12.dp)
) {
    Icon(
        modifier = Modifier.size(20.dp),
        painter = painterResource(
            id = if (module.state == State.REMOVE) {
                R.drawable.rotate
            } else {
                R.drawable.trash
            }
        ),
        contentDescription = null
    )

    Spacer(modifier = Modifier.width(6.dp))
    Text(
        text = stringResource(
            id = if (module.state == State.REMOVE) {
                R.string.module_restore
            } else {
                R.string.module_remove
            }
        )
    )
}

@Composable
private fun ModConf(
    enabled: Boolean,
    onClick: () -> Unit
) = FilledTonalButton(
    onClick = onClick,
    enabled = enabled,
    contentPadding = PaddingValues(horizontal = 12.dp)
) {
    Icon(
        modifier = Modifier.size(20.dp),
        painter = painterResource(id = R.drawable.settings),
        contentDescription = null
    )
}