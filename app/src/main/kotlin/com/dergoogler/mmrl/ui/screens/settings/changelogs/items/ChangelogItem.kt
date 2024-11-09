package com.dergoogler.mmrl.ui.screens.settings.changelogs.items

import com.dergoogler.mmrl.model.online.Changelog
import com.dergoogler.mmrl.ui.component.MarkdownText
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.utils.expandedShape


@Composable
fun ChangelogItem(
    changelog: Changelog,
) {
    var open by remember { mutableStateOf(false) }
    if (open) {
        BottomSheet(changelog = changelog, onClose = { open = false })
    }

    ListButtonItem(title = changelog.versionName,
        desc = "${changelog.versionCode}",
        onClick = { open = true })
}


@Composable
private fun BottomSheet(
    changelog: Changelog, onClose: () -> Unit,
) = ModalBottomSheet(
    onDismissRequest = onClose,
    sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    shape = BottomSheetDefaults.expandedShape(15.dp),
    windowInsets = WindowInsets(0),
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 18.dp),
    ) {
        MarkdownText(
            text = "# ${changelog.versionName} (${changelog.versionCode})\n${changelog.changes}",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier
                .padding(horizontal = 18.dp)
                .padding(top = 8.dp)
                .padding(bottom = 18.dp)
        )

        NavigationBarsSpacer()
    }
}