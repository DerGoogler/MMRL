package com.dergoogler.mmrl.ui.screens.repository.view.pages

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.ElevatedAssistChip
import androidx.compose.material3.ElevatedFilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.versionDisplay
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.ui.component.Alert
import com.dergoogler.mmrl.ui.component.AntiFeaturesItem
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import ext.dergoogler.mmrl.ext.ignoreHorizontalParentPadding
import ext.dergoogler.mmrl.ext.toFormattedDate
import ext.dergoogler.mmrl.ext.toFormattedDateSafely
import java.util.Locale

@Composable
fun OverviewPage(
    online: OnlineModule,
    item: VersionItem?,
    local: LocalModule?,
    isProviderAlive: Boolean,
    rootVersionName: String,
    notifyUpdates: Boolean,
    setUpdatesTag: (Boolean) -> Unit,
    onInstall: (VersionItem) -> Unit,
) = Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
) {

    online.root?.let {
        if (it.isNotSupported(rootVersionName)) {
            Alert(
                title = stringResource(id = R.string.view_module_unsupported),
                backgroundColor = MaterialTheme.colorScheme.errorContainer,
                textColor = MaterialTheme.colorScheme.onErrorContainer,
                message = stringResource(id = R.string.view_module_unsupported_desc),
                modifier = Modifier.padding(top = 8.dp, end = 8.dp, start = 8.dp, bottom = 4.dp)
            )
        }
    }

    online.note?.let {
        it.message?.let { it1 ->
            if (it.title != null && it.title.lowercase() == "deprecated") {
                Alert(
                    backgroundColor = MaterialTheme.colorScheme.errorContainer,
                    textColor = MaterialTheme.colorScheme.onErrorContainer,
                    title = it.title,
                    message = it1,
                    modifier = Modifier.padding(top = 8.dp, end = 8.dp, start = 8.dp, bottom = 4.dp)
                )
            } else {
                Alert(
                    title = it.title,
                    message = it1,
                    modifier = Modifier.padding(top = 8.dp, end = 8.dp, start = 8.dp, bottom = 4.dp)
                )
            }
        }
    }

    Column(
        modifier = Modifier
            .padding(all = 16.dp)
            .fillMaxWidth()
    ) {
        Text(
            text = stringResource(id = R.string.view_module_description),
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = online.description,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        online.categories?.let {
            if (it.isNotEmpty()) {
                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    if (it.isNotEmpty()) {
                        it.forEach { category ->
                            LabelItem(text = category)
                        }
                    }
                }
            }
        }
    }

    HorizontalDivider(thickness = 0.9.dp)

    if (item != null) {
        CloudItem(
            item = item,
            size = online.size,
            isProviderAlive = isProviderAlive,
            onInstall = onInstall
        )

        HorizontalDivider(thickness = 0.9.dp)
    }

    if (local != null) {
        LocalItem(
            local = local,
            notifyUpdates = notifyUpdates,
            setUpdatesTag = setUpdatesTag
        )

        HorizontalDivider(thickness = 0.9.dp)
    }

    online.track.antifeatures?.let {
        if (it.isNotEmpty()) {
            AntiFeaturesItem(antifeatures = it)

            HorizontalDivider(thickness = 0.9.dp)
        }
    }

    online.screenshots?.let {
        if (it.isNotEmpty()) {
            ScreenshotsItem(images = it)
        }
    }
}

@Composable
private fun CloudItem(
    item: VersionItem,
    size: Int?,
    isProviderAlive: Boolean,
    onInstall: (VersionItem) -> Unit,
) = Column(
    modifier = Modifier
        .padding(all = 16.dp)
        .fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    val userPreferences = LocalUserPreferences.current

    Text(
        text = stringResource(id = R.string.view_module_cloud),
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        ValueItem(
            key = stringResource(id = R.string.view_module_version),
            value = item.versionDisplay,
            modifier = Modifier.weight(1f)
        )

        ElevatedAssistChip(
            enabled = isProviderAlive,
            onClick = { onInstall(item) },
            label = { Text(text = stringResource(id = R.string.module_install)) },
            leadingIcon = {
                Icon(
                    painter = painterResource(id = R.drawable.device_mobile_down),
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )
    }

    ValueItem(
        key = stringResource(id = R.string.view_module_last_updated),
        value = item.timestamp.toFormattedDateSafely(userPreferences.datePattern)
    )

    size?.let {
        ValueItem(
            key = stringResource(id = R.string.view_module_file_size),
            value = formatFileSize(it)
        )
    }
}

@Composable
private fun LocalItem(
    local: LocalModule,
    notifyUpdates: Boolean,
    setUpdatesTag: (Boolean) -> Unit,
) = Column(
    modifier = Modifier
        .padding(all = 16.dp)
        .fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    val userPreferences = LocalUserPreferences.current

    Text(
        text = stringResource(id = R.string.view_module_local),
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        ValueItem(
            key = stringResource(id = R.string.view_module_version),
            value = local.versionDisplay,
            modifier = Modifier.weight(1f)
        )

        ElevatedFilterChip(
            selected = notifyUpdates,
            onClick = { setUpdatesTag(!notifyUpdates) },
            label = {
                Text(
                    text = stringResource(
                        id = if (notifyUpdates) {
                            R.string.view_module_update_ignore
                        } else {
                            R.string.view_module_update_notify
                        }
                    )
                )
            },
            leadingIcon = {
                Icon(
                    painter = painterResource(
                        id = if (notifyUpdates) {
                            R.drawable.target_off
                        } else {
                            R.drawable.target
                        }
                    ),
                    contentDescription = null,
                    modifier = Modifier.size(FilterChipDefaults.IconSize)
                )
            }
        )
    }

    if (local.lastUpdated != 0L) {
        ValueItem(
            key = stringResource(id = R.string.view_module_last_updated),
            value = local.lastUpdated.toFormattedDateSafely(userPreferences.datePattern)
        )
    }
}

@Composable
private fun ValueItem(
    key: String,
    value: String?,
    modifier: Modifier = Modifier,
) {
    if (value.isNullOrBlank()) return

    Column(
        modifier = modifier.fillMaxWidth(),
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
}

@Composable
private fun ScreenshotsItem(
    images: List<String>,
) = Column(
    modifier = Modifier
        .padding(all = 16.dp)
        .fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Text(
        text = stringResource(id = R.string.view_module_screenshots),
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary
    )

    LazyRow(
        modifier = Modifier
            .ignoreHorizontalParentPadding(16.dp)
            .fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        contentPadding = PaddingValues(start = 16.dp, end = 16.dp)

    ) {
        items(images.size) { imageUrl ->
            AsyncImage(
                model = images[imageUrl],
                contentDescription = null,
                modifier = Modifier
                    .width(200.dp)
                    .clip(RoundedCornerShape(20.dp)),
                contentScale = ContentScale.Crop
            )
        }
    }
}


fun formatFileSize(sizeInBytes: Int): String {
    if (sizeInBytes < 1024) return "$sizeInBytes B"

    val units = arrayOf("B", "KB", "MB", "GB", "TB", "PB")
    var size = sizeInBytes.toDouble()
    var unitIndex = 0

    while (size >= 1024 && unitIndex < units.size - 1) {
        size /= 1024
        unitIndex++
    }

    // Use the system's current default locale
    return String.format(Locale.getDefault(), "%.2f %s", size, units[unitIndex])
}