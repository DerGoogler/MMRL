package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.intl.Locale
import androidx.compose.ui.text.toUpperCase
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun LabelItem(
    @DrawableRes icon: Int? = null,
    text: String,
    containerColor: Color = MaterialTheme.colorScheme.primary,
    contentColor: Color = MaterialTheme.colorScheme.onPrimary,
    shape: Shape = RoundedCornerShape(3.dp),
    upperCase: Boolean = true
) {
    if (text.isBlank()) return

    Box(
        modifier = Modifier
            .background(
                color = containerColor,
                shape = shape
            ),
        contentAlignment = Alignment.Center
    ) {
        Row {
            val fontStyle = MaterialTheme.typography.labelSmall.copy(fontSize = 8.sp)

            val iconSize = with(LocalDensity.current) { fontStyle.fontSize.toDp() * 0.5f }

            icon?.let {
                Icon(
                    modifier = Modifier
                        .size(iconSize)
                        .padding(horizontal = 4.dp),
                    painter = painterResource(id = it),
                    contentDescription = null,
                    tint = LocalContentColor.current
                )
            }

            Text(
                text = when {
                    upperCase -> text.toUpperCase(Locale.current)
                    else -> text
                },
                style = fontStyle,
                color = contentColor,
                modifier = Modifier.padding(horizontal = 4.dp)
            )
        }
    }
}