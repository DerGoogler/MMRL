package com.dergoogler.mmrl.ui.component.card

import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import dev.dergoogler.mmrl.compat.ext.ModifierScope
import dev.dergoogler.mmrl.compat.ext.ModifierScopeImpl
import dev.dergoogler.mmrl.compat.ext.applyAlpha
import dev.dergoogler.mmrl.compat.ext.isNotNull
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
internal fun BaseCard(
    modifier: ModifierScope.() -> Unit = {},
    modifierScope: ModifierScope,
    style: CardStyle = CardDefaults.cardStyle,
    enabled: Boolean = true,
    onClick: (() -> Unit)? = null,
    onLongClick: (() -> Unit)? = null,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    absolute: @Composable (BoxScope.() -> Unit)? = null,
    relative: @Composable (ColumnScope.() -> Unit),
) {
    val modifierParameters = remember { ModifierScopeImpl(modifierScope) }.apply(modifier)

    val boxModifier = when {
        onClick.isNotNull() -> {
            modifierParameters.box.clickable(
                enabled = enabled,
                onClick = onClick,
                interactionSource = interactionSource,
                indication = ripple()
            )
        }

        onClick.isNotNull() && onLongClick.isNotNull() -> {
            modifierParameters.box
                .combinedClickable(
                    enabled = enabled,
                    onClick = onClick,
                    onLongClick = onLongClick,
                    interactionSource = interactionSource,
                    indication = ripple()
                )
        }

        else -> {
            modifierParameters.box
        }
    }

    Surface(
        modifier = modifierParameters.surface
            .applyAlpha(enabled),
        shape = style.shape,
        color = style.containerColor,
        contentColor = style.contentColor,
        tonalElevation = style.tonalElevation,
    ) {
        Box(
            modifier = boxModifier,
            contentAlignment = style.boxContentAlignment
        ) {
            Column(
                modifier = modifierParameters.column
            ) {
                relative()
            }

            absolute.nullable { it() }
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


object CardDefaults {
    val cardModifier
        get(): ModifierScope = ModifierScopeImpl(
            surface = Modifier
                .fillMaxWidth(),
            box = Modifier
                .fillMaxWidth(),
            column = Modifier
                .fillMaxWidth()
                .padding(16.dp)
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

    val outlinedCardStyle: CardStyle
        @Composable get() = cardStyle.copy(
            containerColor = Color.Unspecified,
            contentColor = MaterialTheme.colorScheme.onSurfaceVariant
        )


    val outlinedCardModifier
        @Composable get(): ModifierScope = cardModifier.copy(
            surface = Modifier
                .border(
                    width = 1.dp,
                    color = MaterialTheme.colorScheme.outline,
                    shape = cardStyle.shape
                )
        )
}