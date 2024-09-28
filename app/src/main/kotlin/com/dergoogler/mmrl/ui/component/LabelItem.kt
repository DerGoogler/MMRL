package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.text.intl.Locale
import androidx.compose.ui.text.toUpperCase
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun LabelItem(
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
        Text(
            text = when {
                upperCase -> text.toUpperCase(Locale.current)
                else -> text
            },
            style = MaterialTheme.typography.labelSmall.copy(fontSize = 8.sp),
            color = contentColor,
            modifier = Modifier.padding(horizontal = 4.dp)
        )
    }
}