package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
fun Card(
    modifier: CardModifier = CardDefaults.cardModifier,
    style: CardStyle = CardDefaults.cardStyle,
    enabled: Boolean = true,
    onClick: (() -> Unit)? = null,
    /**
     * Only works if [onClick] is not null.
     */
    onLongClick: () -> Unit = {},
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    absolute: @Composable (BoxScope.() -> Unit) = {},
    relative: @Composable (ColumnScope.() -> Unit),
) {
    val boxModifier = onClick.nullable(modifier.box) {
        modifier.box
            .combinedClickable(
                enabled = enabled,
                onClick = it,
                onLongClick = onLongClick,
                interactionSource = interactionSource,
                indication = ripple()
            )
    }

    Surface(
        modifier = modifier.surface
            .fillMaxWidth()
            .alpha(alpha = if (enabled) 1f else 0.5f),
        shape = style.shape,
        color = style.containerColor,
        contentColor = style.contentColor,
        tonalElevation = style.tonalElevation,
    ) {
        Box(
            modifier = boxModifier
                .fillMaxWidth(),
            contentAlignment = style.boxContentAlignment
        ) {
            Column(
                modifier = modifier.column
                    .fillMaxWidth()
            ) {
                relative()
            }

            absolute()
        }
    }
}

@Immutable
class CardStyle internal constructor(
    val contentColor: Color,
    val containerColor: Color,
    val tonalElevation: Dp,
    val shape: RoundedCornerShape,
    val boxContentAlignment: Alignment,
    val columnVerticalArrangement: Arrangement.Vertical,
) {
    @Suppress("RedundantIf")
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || other !is CardStyle) return false

        if (contentColor != other.contentColor) return false
        if (containerColor != other.containerColor) return false
        if (tonalElevation != other.tonalElevation) return false
        if (shape != other.shape) return false
        if (boxContentAlignment != other.boxContentAlignment) return false
        if (columnVerticalArrangement != other.columnVerticalArrangement) return false

        return true
    }

    fun copy(
        contentColor: Color = this.contentColor,
        containerColor: Color = this.containerColor,
        tonalElevation: Dp = this.tonalElevation,
        shape: RoundedCornerShape = this.shape,
        boxContentAlignment: Alignment = this.boxContentAlignment,
        columnVerticalArrangement: Arrangement.Vertical = this.columnVerticalArrangement,
    ): CardStyle = CardStyle(
        contentColor,
        containerColor,
        tonalElevation,
        shape,
        boxContentAlignment,
        columnVerticalArrangement
    )

    override fun hashCode(): Int {
        var result = contentColor.hashCode()
        result = 31 * result + containerColor.hashCode()
        result = 31 * result + tonalElevation.hashCode()
        result = 31 * result + shape.hashCode()
        result = 31 * result + boxContentAlignment.hashCode()
        result = 31 * result + columnVerticalArrangement.hashCode()
        return result
    }
}


@Immutable
class CardModifier internal constructor(
    val surface: Modifier,
    val box: Modifier,
    val column: Modifier,
) {
    @Suppress("RedundantIf")
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || other !is CardModifier) return false

        if (box != other.box) return false
        if (column != other.column) return false
        if (surface != other.surface) return false

        return true
    }

    fun copy(
        surface: Modifier = this.surface,
        box: Modifier = this.box,
        column: Modifier = this.column,
    ): CardModifier = CardModifier(
        surface, box, column
    )

    override fun hashCode(): Int {
        var result = box.hashCode()
        result = 31 * result + column.hashCode()
        result = 31 * result + surface.hashCode()
        return result
    }
}

object CardDefaults {
    val cardModifier: CardModifier
        @Composable get() = CardModifier(
            surface = Modifier,
            box = Modifier,
            column = Modifier.padding(16.dp)
        )

    val cardStyle: CardStyle
        @Composable get() = CardStyle(
            containerColor = MaterialTheme.colorScheme.surface,
            contentColor = MaterialTheme.colorScheme.onSurface,
            tonalElevation = 1.dp,
            shape = RoundedCornerShape(20.dp),
            boxContentAlignment = Alignment.TopStart,
            columnVerticalArrangement = Arrangement.Top
        )
}