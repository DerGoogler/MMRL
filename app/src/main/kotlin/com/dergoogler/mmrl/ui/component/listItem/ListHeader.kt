package com.dergoogler.mmrl.ui.component.listItem

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.ui.component.card.Card
import dev.dergoogler.mmrl.compat.ext.fadingEdge
import dev.dergoogler.mmrl.compat.ext.isNotNull

@Composable
fun ListHeader(
    modifier: Modifier = Modifier,
    @StringRes title: Int,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 8.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle,
    enabled: Boolean = true,
) = ListHeader(
    modifier = modifier,
    title = stringResource(title),
    contentPaddingValues = contentPaddingValues,
    itemTextStyle = itemTextStyle,
    enabled = enabled
)

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

@Composable
fun ListGroup(
    title: String? = null,
    content: @Composable () -> Unit,
) = Card(
    modifier = {
        surface = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
        column = Modifier.padding(horizontal = 0.dp, vertical = 8.dp)
    }
) {
    if (title.isNotNull()) {
        ListHeader(title = title)

        val leftRightFade = Brush.horizontalGradient(
            0f to Color.Transparent,
            0.1f to Color.Red,
            0.48f to Color.Red,
            0.85f to Color.Transparent,
        )

        HorizontalDivider(
            modifier = Modifier/*.alpha(0.5f)*/.fadingEdge(leftRightFade),
            thickness = 0.9.dp
        )
    }

    content()
}