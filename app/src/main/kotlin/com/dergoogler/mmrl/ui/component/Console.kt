package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp

@Composable
fun Console(
    modifier: Modifier = Modifier,
    list: SnapshotStateList<String>,
    state: LazyListState,
    breakList: Boolean = false,
    style: TextStyle = MaterialTheme.typography.bodySmall.copy(
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        fontFamily = FontFamily.Monospace
    ),
) {
    LaunchedEffect(list.size) {
        if (list.isNotEmpty()) {
            state.animateScrollToItem(list.size - 1)
        }
    }

    LazyColumn(
        state = state,
        modifier = modifier.let {
            if (breakList) it else it.horizontalScroll(rememberScrollState())
        }
    ) {
        items(list) { item ->
            Text(
                text = item,
                color = style.color,
                modifier = Modifier.padding(horizontal = 8.dp),
                style = style
            )
        }
    }
}