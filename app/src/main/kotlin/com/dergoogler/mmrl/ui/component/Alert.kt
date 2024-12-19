package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp


@Composable
fun Alert(
    modifier: Modifier = Modifier,
    backgroundColor: Color = MaterialTheme.colorScheme.secondaryContainer,
    textColor: Color = MaterialTheme.colorScheme.onSecondaryContainer,
    title: String?,
    message: String,
    @DrawableRes icon: Int? = null,
    onDescTagClick: (String) -> Unit = {},
) = Surface(
    modifier = Modifier
        .fillMaxWidth()
        .then(modifier),
    color = backgroundColor,
    tonalElevation = 1.dp,
    shape = RoundedCornerShape(20.dp),
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        title?.let {
            TextWithIcon(
                text = title,
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
            onTagClick = onDescTagClick
        )
    }
}