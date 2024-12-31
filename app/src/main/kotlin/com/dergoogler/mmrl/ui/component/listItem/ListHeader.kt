package com.dergoogler.mmrl.ui.component.listItem

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.unit.dp

@Composable
fun ListHeader(
    modifier: Modifier = Modifier,
    title: String,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 8.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle,
    enabled: Boolean = true,
) {
    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            modifier = modifier,
            text = title,
            style = itemTextStyle.titleTextStyle,
            color = MaterialTheme.colorScheme.primary
        )
    }
}