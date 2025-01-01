package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.ui.component.card.Card
import com.dergoogler.mmrl.ui.component.card.CardDefaults
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
fun Alert(
    modifier: Modifier = Modifier,
    backgroundColor: Color = MaterialTheme.colorScheme.secondaryContainer,
    textColor: Color = MaterialTheme.colorScheme.onSecondaryContainer,
    title: String?,
    message: String,
    clickTagColor: Color = MaterialTheme.colorScheme.surfaceTint,
    @DrawableRes icon: Int? = null,
    onDescTagClick: (String) -> Unit = {},
) = Card(
    modifier = {
        surface = modifier.fillMaxWidth()
    },
    style = CardDefaults.cardStyle.copy(
        containerColor = backgroundColor,
        contentColor = textColor,
        columnVerticalArrangement = Arrangement.spacedBy(4.dp)
    )
) {
    title.nullable {
        TextWithIcon(
            text = it,
            icon = icon,
            style = MaterialTheme.typography.titleMedium.copy(
                color = textColor,
                fontWeight = FontWeight.Bold,

                ),
            tint = textColor,
            spacing = 16f
        )
    }

    MarkdownText(
        text = message,
        style = MaterialTheme.typography.bodyMedium.copy(color = textColor),
        clickTagColor = clickTagColor,
        onTagClick = onDescTagClick
    )
}