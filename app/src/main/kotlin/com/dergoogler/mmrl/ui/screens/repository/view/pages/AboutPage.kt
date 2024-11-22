package com.dergoogler.mmrl.ui.screens.repository.view.pages

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.ElevatedAssistChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.ModuleFeatures
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.ui.component.LabelItem
import ext.dergoogler.mmrl.ext.isObjectEmpty
import ext.dergoogler.mmrl.ext.launchCustomTab
import ext.dergoogler.mmrl.ext.shareText

@Composable
fun AboutPage(
    online: OnlineModule
) = Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
) {
    HelpItem(online = online)

    HorizontalDivider(thickness = 0.9.dp)

    online.features?.let {
        if (!it.isObjectEmpty()) {
            FeaturesItem(features = it)

            HorizontalDivider(thickness = 0.9.dp)
        }
    }
}


@Composable
private fun HelpItem(
    online: OnlineModule
) = Column(
    modifier = Modifier
        .padding(all = 16.dp)
        .fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Text(
        text = stringResource(id = R.string.view_module_help),
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary
    )

    online.homepage?.let {
        ValueItem(
            key = stringResource(id = R.string.view_module_homepage),
            value = it,
            icon = R.drawable.world_www
        )
    }

    ValueItem(
        key = stringResource(id = R.string.view_module_source),
        value = online.track.source,
        icon = R.drawable.brand_git
    )

    online.support?.let {
        ValueItem(
            key = stringResource(id = R.string.view_module_support),
            value = it,
            icon = R.drawable.heart_handshake
        )
    }
}


@Composable
private fun FeaturesItem(
    features: ModuleFeatures
) = Column(
    modifier = Modifier
        .padding(all = 16.dp)
        .fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Text(
        text = stringResource(id = R.string.view_module_features),
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary
    )

    FeatureValueItem(
        feature = features.service,
        key = R.string.view_module_features_service,
        value = R.string.view_module_features_service_sub
    )
    FeatureValueItem(
        feature = features.postFsData,
        key = R.string.view_module_features_post_fs_data,
        value = R.string.view_module_features_post_fs_data_sub
    )
    FeatureValueItem(
        feature = features.resetprop,
        key = R.string.view_module_features_system_properties,
        value = R.string.view_module_features_resetprop_sub
    )
    FeatureValueItem(
        feature = features.sepolicy,
        key = R.string.view_module_features_selinux_policy,
        value = R.string.view_module_features_sepolicy_sub
    )
    FeatureValueItem(
        feature = features.zygisk,
        key = R.string.view_module_features_zygisk,
        value = R.string.view_module_features_zygisk_sub
    )
    FeatureValueItem(
        feature = features.apks,
        key = R.string.view_module_features_apks,
        value = R.string.view_module_features_apks_sub
    )
    FeatureValueItem(
        feature = features.webroot,
        key = R.string.view_module_features_webui,
        value = R.string.view_module_features_webui_sub,
        rootSolutions = listOf("KernelSU", "APatch")
    )
    FeatureValueItem(
        feature = features.postMount,
        key = R.string.view_module_features_post_mount,
        value = R.string.view_module_features_postmount_sub,
        rootSolutions = listOf("KernelSU", "APatch")
    )
    FeatureValueItem(
        feature = features.bootCompleted,
        key = R.string.view_module_features_boot_completed,
        value = R.string.view_module_features_bootcompleted_sub,
        rootSolutions = listOf("KernelSU", "APatch")
    )
}


@Composable
private fun ValueItem(
    key: String,
    value: String,
    @DrawableRes icon: Int = R.drawable.world_www
) {
    if (value.isBlank()) return
    val context = LocalContext.current

    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Column(
            modifier = Modifier
                .pointerInput(Unit) {
                    detectTapGestures(onLongPress = { context.shareText(value) })
                }
                .fillMaxWidth()
                .weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = key,
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Text(
                text = value,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.outline
            )
        }

        ElevatedAssistChip(onClick = {
            context.launchCustomTab(value)
        },

            label = { Text(text = stringResource(id = R.string.open)) }, leadingIcon = {
                Icon(
                    painter = painterResource(id = icon),
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            })
    }
}

@Composable
private fun FeatureValueItem(
    feature: Boolean?,
    @StringRes key: Int,
    @StringRes value: Int,
    modifier: Modifier = Modifier,
    rootSolutions: List<String>? = null,
) {
    if (feature == null) return

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Text(
            text = stringResource(id = key),
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Text(
            text = stringResource(id = value),
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.outline
        )
        rootSolutions?.let {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                rootSolutions.forEach { root ->
                    LabelItem(
                        text = root,
                    )
                }
            }
        }
    }
}