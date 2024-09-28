package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@Composable
fun LabelIcon(
    @DrawableRes icon: Int,
    containerColor: Color = MaterialTheme.colorScheme.primary,
    shape: Shape = RoundedCornerShape(3.dp),
) {
    Box(
        modifier = Modifier
            .background(
                color = containerColor,
                shape = shape
            ),
        contentAlignment = Alignment.Center
    ) {
        Icon(
            modifier = Modifier.padding(horizontal = 4.dp),
            painter = painterResource(id = icon),
            contentDescription = null,
            tint = LocalContentColor.current
        )
    }
}