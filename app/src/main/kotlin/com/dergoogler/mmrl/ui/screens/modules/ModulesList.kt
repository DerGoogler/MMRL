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
import com.dergoogler.mmrl.Platform
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.State
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.ui.component.VersionItemBottomSheet
import com.dergoogler.mmrl.ui.component.scrollbar.VerticalFastScrollbar
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.ModulesViewModel
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.content.ModuleCompatibility
import dev.dergoogler.mmrl.compat.ext.takeTrue

@Composable
fun ModulesList(
    list: List<LocalModule>,
    state: LazyListState,
    isProviderAlive: Boolean,
    platform: Platform,
    getModuleOps: (Boolean, LocalModule) -> ModulesViewModel.ModuleOps,
    getVersionItem: @Composable (LocalModule) -> VersionItem?,
    getProgress: @Composable (VersionItem?) -> Float,
    onDownload: (LocalModule, VersionItem, Boolean) -> Unit,
    moduleCompatibility: ModuleCompatibility,
    getBlacklist: (String?) -> Blacklist?,
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
                platform = platform,
                getModuleOps = getModuleOps,
                getVersionItem = getVersionItem,
                getBlacklist = getBlacklist,
                getProgress = getProgress,
                onDownload = onDownload,
                moduleCompatibility = moduleCompatibility
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
    platform: Platform,
    getModuleOps: (Boolean, LocalModule) -> ModulesViewModel.ModuleOps,
    getVersionItem: @Composable (LocalModule) -> VersionItem?,
    getBlacklist: (String?) -> Blacklist?,
    getProgress: @Composable (VersionItem?) -> Float,
    onDownload: (LocalModule, VersionItem, Boolean) -> Unit,
    moduleCompatibility: ModuleCompatibility,
) {
    val userPreferences = LocalUserPreferences.current

    val ops by remember(userPreferences.useShellForModuleStateChange, module.state) {
        derivedStateOf { getModuleOps(userPreferences.useShellForModuleStateChange, module) }
    }

    val blacklist = getBlacklist(module.id)
    val isBlacklisted = Blacklist.isBlacklisted(blacklist)

    val context = LocalContext.current

    val item = getVersionItem(module)
    val progress = getProgress(item)

    var open by remember { mutableStateOf(false) }
    if (open && item != null) {
        VersionItemBottomSheet(
            isUpdate = true,
            item = item,
            isProviderAlive = isProviderAlive,
            onDownload = { onDownload(module, item, it) },
            onClose = { open = false },
            isBlacklisted = isBlacklisted
        )
    }

    ModuleItem(
        isBlacklisted = Blacklist.isBlacklisted(getBlacklist(module.id)),
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
            val enabled = with(platform) {
                when {
                    isKernelSuNext || isKernelSU || isAPatch -> isProviderAlive && module.state != State.UPDATE
                    else -> isProviderAlive
                }
            }

            Switch(
                checked = module.state == State.ENABLE,
                onCheckedChange = ops.toggle,
                enabled = enabled && module.state != State.REMOVE
            )
        },
        indicator = {
            when (module.state) {
                State.REMOVE -> StateIndicator(R.drawable.trash)
                State.UPDATE -> StateIndicator(R.drawable.device_mobile_down)
                else -> {}
            }
        },
        startTrailingButton = {
            module.features.action.takeTrue {
                ActionButton(
                    enabled = isProviderAlive && module.state != State.REMOVE && module.state != State.DISABLE,
                    onClick = {
                        MMRLComponentActivity.startActionActivity(
                            context = context,
                            module = module
                        )
                    }
                )
            }
        },
        trailingButton = {
            if (item != null) {
                UpdateButton(
                    enabled = item.versionCode > module.versionCode,
                    onClick = { open = true }
                )

                Spacer(modifier = Modifier.width(12.dp))
            }

            RemoveOrRestore(
                module = module,
                enabled = isProviderAlive && (!(moduleCompatibility.canRestoreModules && userPreferences.useShellForModuleStateChange) || module.state != State.REMOVE),
                onClick = ops.change
            )

        }
    )
}

@Composable
private fun UpdateButton(
    enabled: Boolean,
    onClick: () -> Unit,
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
    onClick: () -> Unit,
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
private fun ActionButton(
    enabled: Boolean,
    onClick: () -> Unit,
) = FilledTonalButton(
    onClick = onClick,
    enabled = enabled,
    contentPadding = PaddingValues(horizontal = 12.dp)
) {
    Icon(
        modifier = Modifier.size(20.dp),
        painter = painterResource(id = R.drawable.player_play),
        contentDescription = null
    )
}