package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.ModalBottomSheetDefaults
import androidx.compose.material3.ModalBottomSheetProperties
import androidx.compose.material3.SheetState
import androidx.compose.material3.contentColorFor
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.ui.utils.expandedShape
import dev.dergoogler.mmrl.compat.ext.takeTrue

@Composable
fun BottomSheet(
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    sheetState: SheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    sheetMaxWidth: Dp = BottomSheetDefaults.SheetMaxWidth,
    shape: Shape = BottomSheetDefaults.expandedShape(20.dp),
    containerColor: Color = BottomSheetDefaults.ContainerColor,
    contentColor: Color = contentColorFor(containerColor),
    tonalElevation: Dp = BottomSheetDefaults.Elevation,
    scrimColor: Color = BottomSheetDefaults.ScrimColor,
    dragHandle: @Composable (() -> Unit)? = { BottomSheetDefaults.DragHandle() },
    windowInsets: WindowInsets = WindowInsets(0),
    properties: ModalBottomSheetProperties = ModalBottomSheetDefaults.properties(),
    enabledNavigationSpacer: Boolean = true,
    content: @Composable ColumnScope.() -> Unit,
) = ModalBottomSheet(
    onDismissRequest,
    modifier,
    sheetState,
    sheetMaxWidth,
    shape,
    containerColor,
    contentColor,
    tonalElevation,
    scrimColor,
    dragHandle,
    { windowInsets },
    properties,
) {
    val statusBarHeight =
        WindowInsets.statusBars.asPaddingValues().calculateTopPadding() + 28.dp
    val maxHeight = LocalConfiguration.current.screenHeightDp.dp - statusBarHeight

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight(unbounded = true)
            .heightIn(max = maxHeight)
    ) {
        content()
        enabledNavigationSpacer.takeTrue {
            NavigationBarsSpacer()
        }
    }
}