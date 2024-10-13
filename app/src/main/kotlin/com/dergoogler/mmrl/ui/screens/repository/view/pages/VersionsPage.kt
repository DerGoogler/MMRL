package com.dergoogler.mmrl.ui.screens.repository.view.pages

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.Repo
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.VersionItemBottomSheet
import ext.dergoogler.mmrl.ext.toFormattedDate

@Composable
fun VersionsPage(
    versions: List<Pair<Repo, VersionItem>>,
    localVersionCode: Int,
    isProviderAlive: Boolean,
    getProgress: @Composable (VersionItem) -> Float,
    onDownload: (VersionItem, Boolean) -> Unit
) = LazyColumn(
    modifier = Modifier.fillMaxSize()
) {
    items(
        items = versions,
        key = { it.first.url + it.second.versionCode }
    ) { (repo, item) ->
        VersionItem(
            item = item,
            repo = repo,
            localVersionCode = localVersionCode,
            isProviderAlive = isProviderAlive,
            onDownload = { onDownload(item, it) }
        )

        val progress = getProgress(item)
        if (progress != 0f) {
            LinearProgressIndicator(
                progress = { progress },
                strokeCap = StrokeCap.Round,
                modifier = Modifier
                    .height(2.dp)
                    .fillMaxWidth()
            )
        } else {
            HorizontalDivider(thickness = 0.9.dp)
        }
    }
}

@Composable
private fun VersionItem(
    item: VersionItem,
    repo: Repo,
    localVersionCode: Int,
    isProviderAlive: Boolean,
    onDownload: (Boolean) -> Unit
) {
    var open by remember { mutableStateOf(false) }
    if (open) VersionItemBottomSheet(
        isUpdate = false,
        item = item,
        isProviderAlive = isProviderAlive,
        onClose = { open = false },
        onDownload = onDownload
    )

    Row(
        modifier = Modifier
            .clickable(onClick = { open = true })
            .padding(all = 16.dp)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = item.versionDisplay,
                    style = MaterialTheme.typography.bodyMedium
                )

                if (localVersionCode < item.versionCode) {
                    LabelItem(
                        text = stringResource(id = R.string.module_new),
                        containerColor = MaterialTheme.colorScheme.error,
                        contentColor = MaterialTheme.colorScheme.onError
                    )
                }
            }

            Text(
                text = stringResource(id = R.string.view_module_provided, repo.name),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.primary
            )
        }

        Text(
            text = item.timestamp.toFormattedDate(),
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.outline
        )
    }
}