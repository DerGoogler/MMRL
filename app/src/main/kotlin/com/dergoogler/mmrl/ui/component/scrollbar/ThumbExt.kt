/*
 * Copyright 2023 Sanmer
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Portions of this software are based on work by The Android Open Source Project,
 * which is licensed under the Apache License, Version 2.0. You may obtain a copy
 * of the Apache License, Version 2.0 at <https://www.apache.org/licenses/LICENSE-2.0>.
 */

package com.dergoogler.mmrl.ui.component.scrollbar

import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.grid.LazyGridState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue

/**
 * Remembers a function to react to [Scrollbar] thumb position displacements for a [LazyListState]
 * @param itemsAvailable the amount of items in the list.
 */
@Composable
fun LazyListState.rememberDraggableScroller(
    itemsAvailable: Int = layoutInfo.totalItemsCount
): (Float) -> Unit = rememberDraggableScroller(
    itemsAvailable = itemsAvailable,
    scroll = ::scrollToItem
)

/**
 * Remembers a function to react to [Scrollbar] thumb position displacements for a [LazyGridState]
 * @param itemsAvailable the amount of items in the grid.
 */
@Composable
fun LazyGridState.rememberDraggableScroller(
    itemsAvailable: Int = layoutInfo.totalItemsCount
): (Float) -> Unit = rememberDraggableScroller(
    itemsAvailable = itemsAvailable,
    scroll = ::scrollToItem
)

/**
 * Generic function to react to [Scrollbar] thumb displacements in a lazy layout.
 * @param itemsAvailable the total amount of items available to scroll in the layout.
 * @param scroll a function to be invoked when an index has been identified to scroll to.
 */
@Composable
private inline fun rememberDraggableScroller(
    itemsAvailable: Int,
    crossinline scroll: suspend (index: Int) -> Unit
): (Float) -> Unit {
    var percentage by remember { mutableFloatStateOf(Float.NaN) }
    val itemCount by rememberUpdatedState(itemsAvailable)

    LaunchedEffect(percentage) {
        if (percentage.isNaN()) return@LaunchedEffect
        val indexToFind = (itemCount * percentage).toInt()
        scroll(indexToFind)
    }
    return remember {
        { newPercentage -> percentage = newPercentage }
    }
}