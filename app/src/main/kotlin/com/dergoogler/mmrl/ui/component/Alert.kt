package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
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
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                icon?.let {
                    val iconSize =
                        with(LocalDensity.current) { MaterialTheme.typography.titleMedium.fontSize.toDp() * 1.0f }

                    Icon(
                        modifier = Modifier.size(iconSize),
                        painter = painterResource(id = it),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onPrimaryContainer
                    )

                    Spacer(modifier = Modifier.width(8.dp))
                }

                Text(
                    text = it,
                    color = textColor,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        MarkdownText(
            text = message,
            style = MaterialTheme.typography.bodyMedium.copy(color = textColor),
            onTagClick = onDescTagClick
        )
    }
}