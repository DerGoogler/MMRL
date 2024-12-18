package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.text.intl.Locale
import androidx.compose.ui.text.toUpperCase
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.dergoogler.mmrl.R

@Composable
fun LabelItem(
    text: String,
    @DrawableRes icon: Int? = null,
    containerColor: Color = MaterialTheme.colorScheme.primary,
    contentColor: Color = MaterialTheme.colorScheme.onPrimary,
    shape: Shape = RoundedCornerShape(3.dp),
    upperCase: Boolean = true,
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

            TextWithIcon(
                rowModifier = Modifier.padding(horizontal = 4.dp),
                text = when {
                    upperCase -> text.toUpperCase(Locale.current)
                    else -> text
                },
                icon = icon,
                style = fontStyle.copy(color = contentColor),
                tint = contentColor
            )
        }
    }
}

@Composable
fun KernelSuLabel() {
    LabelItem(
        icon = R.drawable.kernelsu_logo,
        text = "KernelSU"
    )
}

@Composable
fun MagiskLabel() {
    LabelItem(
        icon = R.drawable.magisk_logo,
        text = "KernelSU"
    )
}

@Composable
fun APatchLabel() {
    LabelItem(
//        icon = R.drawable.apatch_logo,
        text = "APatch"
    )
}

@Composable
fun MMRLLabel() {
    LabelItem(
        icon = R.drawable.launcher_outline,
        text = "MMRL"
    )
}