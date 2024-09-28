package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.res.painterResource

@Composable
fun Logo(
    @DrawableRes icon: Int,
    modifier: Modifier = Modifier,
    shape: Shape = CircleShape,
    contentColor: Color = MaterialTheme.colorScheme.onPrimary,
    containerColor: Color = MaterialTheme.colorScheme.primary,
    fraction: Float = 0.6f
) = Surface(
    modifier = modifier,
    shape = shape,
    color = containerColor,
    contentColor = contentColor
) {
    Box(
        contentAlignment = Alignment.Center
    ) {
        Icon(
            modifier = Modifier.fillMaxSize(fraction),
            painter = painterResource(id = icon),
            contentDescription = null,
            tint = LocalContentColor.current
        )
    }
}