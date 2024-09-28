package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.shape.CornerBasedShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenu
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.PopupProperties
import com.dergoogler.mmrl.ui.utils.ProvideMenuShape

@Composable
fun DropdownMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    shape: CornerBasedShape = RoundedCornerShape(8.dp),
    offset: DpOffset = DpOffset.Zero,
    properties: PopupProperties = PopupProperties(focusable = true),
    content: @Composable ColumnScope.() -> Unit
) {
    ProvideMenuShape(shape) {
        DropdownMenu(
            expanded = expanded,
            onDismissRequest = onDismissRequest,
            modifier = modifier,
            offset = offset,
            properties = properties,
            content = content
        )
    }
}

@Composable
fun DropdownMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    shape: CornerBasedShape = RoundedCornerShape(8.dp),
    contentAlignment: Alignment = Alignment.TopStart,
    offset: DpOffset = DpOffset.Zero,
    properties: PopupProperties = PopupProperties(focusable = true),
    surface: @Composable () -> Unit,
    content: @Composable ColumnScope.() -> Unit
) = Box {
    surface()

    ProvideMenuShape(shape) {
        Box(
            modifier = Modifier.align(contentAlignment),
            contentAlignment = contentAlignment
        ) {
            DropdownMenu(
                expanded = expanded,
                onDismissRequest = onDismissRequest,
                modifier = modifier,
                offset = offset,
                properties = properties,
                content = content
            )
        }
    }
}