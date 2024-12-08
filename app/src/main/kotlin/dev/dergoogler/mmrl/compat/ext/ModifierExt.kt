package dev.dergoogler.mmrl.compat.ext

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Deprecated(message = "Use ignoreParentPadding instead")
fun Modifier.ignoreHorizontalParentPadding(horizontal: Dp): Modifier {
    return this.layout { measurable, constraints ->
        val overridenWidth = constraints.maxWidth + 2 * horizontal.roundToPx()
        val placeable = measurable.measure(constraints.copy(maxWidth = overridenWidth))
        layout(placeable.width, placeable.height) {
            placeable.place(0, 0)
        }
    }
}

fun Modifier.ignoreParentPadding(
    horizontal: Dp = 0.dp,
    vertical: Dp = 0.dp,
    start: Dp = 0.dp,
    end: Dp = 0.dp,
    top: Dp = 0.dp,
    bottom: Dp = 0.dp
): Modifier {
    return this.layout { measurable, constraints ->
        // Combine individual and symmetrical paddings
        val totalStart = start.roundToPx() + horizontal.roundToPx()
        val totalEnd = end.roundToPx() + horizontal.roundToPx()
        val totalTop = top.roundToPx() + vertical.roundToPx()
        val totalBottom = bottom.roundToPx() + vertical.roundToPx()

        val horizontalPadding = totalStart + totalEnd
        val verticalPadding = totalTop + totalBottom

        // Adjust constraints by adding the calculated padding values
        val overriddenWidth = constraints.maxWidth + horizontalPadding
        val overriddenHeight = constraints.maxHeight + verticalPadding

        // Measure with updated constraints
        val placeable = measurable.measure(
            constraints.copy(
                maxWidth = overriddenWidth,
                maxHeight = overriddenHeight
            )
        )

        // Layout with adjusted size
        layout(placeable.width, placeable.height) {
            placeable.place(-totalStart, -totalTop)
        }
    }
}

fun Modifier.fadingEdge(brush: Brush) = this
    .graphicsLayer(compositingStrategy = CompositingStrategy.Offscreen)
    .drawWithContent {
        drawContent()
        drawRect(brush = brush, blendMode = BlendMode.DstIn)
    }