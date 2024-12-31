package com.dergoogler.mmrl.ui.component.card

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import dev.dergoogler.mmrl.compat.ext.ModifierScope

@Composable
fun Card(
    modifier: ModifierScope.() -> Unit = {},
    style: CardStyle = CardDefaults.cardStyle,
    enabled: Boolean = true,
    onClick: (() -> Unit)? = null,
    onLongClick: (() -> Unit)? = null,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    absolute: @Composable (BoxScope.() -> Unit) = {},
    relative: @Composable (ColumnScope.() -> Unit),
) = BaseCard(
    modifier = modifier,
    modifierScope = CardDefaults.cardModifier,
    style = style,
    enabled = enabled,
    onClick = onClick,
    onLongClick = onLongClick,
    interactionSource = interactionSource,
    absolute = absolute,
    relative = relative
)
