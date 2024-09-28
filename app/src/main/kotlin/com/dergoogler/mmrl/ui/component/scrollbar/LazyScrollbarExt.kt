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

import androidx.compose.foundation.gestures.ScrollableState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.filterNotNull
import kotlin.math.abs
import kotlin.math.min

/**
 * Calculates the [ScrollbarState] for lazy layouts.
 * @param itemsAvailable the total amount of items available to scroll in the layout.
 * @param visibleItems a list of items currently visible in the layout.
 * @param firstVisibleItemIndex a function for interpolating the first visible index in the lazy layout
 * as scrolling progresses for smooth and linear scrollbar thumb progression.
 * */
@Composable
internal inline fun <LazyState : ScrollableState, LazyStateItem> LazyState.scrollbarState(
    itemsAvailable: Int,
    crossinline visibleItems: LazyState.() -> List<LazyStateItem>,
    crossinline firstVisibleItemIndex: LazyState.(List<LazyStateItem>) -> Float,
    crossinline itemPercentVisible: LazyState.(LazyStateItem) -> Float
): ScrollbarState {
    var state by remember { mutableStateOf(ScrollbarState.FULL) }

    LaunchedEffect(
        key1 = this,
        key2 = itemsAvailable,
    ) {
        snapshotFlow {
            if (itemsAvailable == 0) return@snapshotFlow null

            val visibleItemsInfo = visibleItems(this@scrollbarState)
            if (visibleItemsInfo.isEmpty()) return@snapshotFlow null

            val firstIndex = min(
                a = firstVisibleItemIndex(visibleItemsInfo),
                b = itemsAvailable.toFloat(),
            )
            if (firstIndex.isNaN()) return@snapshotFlow null

            val itemsVisible = visibleItemsInfo.sumOf {
                itemPercentVisible(it).toDouble()
            }.toFloat()

            val thumbTravelPercent = min(
                a = firstIndex / itemsAvailable,
                b = 1f,
            )
            val thumbSizePercent = min(
                a = itemsVisible / itemsAvailable,
                b = 1f,
            )
            ScrollbarState(
                thumbSizePercent = thumbSizePercent,
                thumbMovedPercent = thumbTravelPercent
            )
        }
            .filterNotNull()
            .distinctUntilChanged()
            .collect { state = it }
    }
    return state
}

/**
 * Linearly interpolates the index for the first item in [visibleItems] for smooth scrollbar
 * progression.
 * @param visibleItems a list of items currently visible in the layout.
 * @param itemSize a lookup function for the size of an item in the layout.
 * @param offset a lookup function for the offset of an item relative to the start of the view port.
 * @param nextItemOnMainAxis a lookup function for the next item on the main axis in the direction
 * of the scroll.
 * @param itemIndex a lookup function for index of an item in the layout relative to
 * the total amount of items available.
 *
 * @return a [Float] in the range [firstItemPosition..nextItemPosition) where nextItemPosition
 * is the index of the consecutive item along the major axis.
 * */
internal inline fun <LazyState : ScrollableState, LazyStateItem> LazyState.interpolateFirstItemIndex(
    visibleItems: List<LazyStateItem>,
    crossinline itemSize: LazyState.(LazyStateItem) -> Int,
    crossinline offset: LazyState.(LazyStateItem) -> Int,
    crossinline nextItemOnMainAxis: LazyState.(LazyStateItem) -> LazyStateItem?,
    crossinline itemIndex: (LazyStateItem) -> Int,
): Float {
    if (visibleItems.isEmpty()) return 0f

    val firstItem = visibleItems.first()
    val firstItemIndex = itemIndex(firstItem)

    if (firstItemIndex < 0) return Float.NaN

    val firstItemSize = itemSize(firstItem)
    if (firstItemSize == 0) return Float.NaN

    val itemOffset = offset(firstItem).toFloat()
    val offsetPercentage = abs(itemOffset) / firstItemSize

    val nextItem = nextItemOnMainAxis(firstItem) ?: return firstItemIndex + offsetPercentage

    val nextItemIndex = itemIndex(nextItem)

    return firstItemIndex + ((nextItemIndex - firstItemIndex) * offsetPercentage)
}

/**
 * Returns the percentage of an item that is currently visible in the view port.
 * @param itemSize the size of the item
 * @param itemStartOffset the start offset of the item relative to the view port start
 * @param viewportStartOffset the start offset of the view port
 * @param viewportEndOffset the end offset of the view port
 */
internal fun itemVisibilityPercentage(
    itemSize: Int,
    itemStartOffset: Int,
    viewportStartOffset: Int,
    viewportEndOffset: Int,
): Float {
    if (itemSize == 0) return 0f
    val itemEnd = itemStartOffset + itemSize
    val startOffset = when {
        itemStartOffset > viewportStartOffset -> 0
        else -> abs(abs(viewportStartOffset) - abs(itemStartOffset))
    }
    val endOffset = when {
        itemEnd < viewportEndOffset -> 0
        else -> abs(abs(itemEnd) - abs(viewportEndOffset))
    }
    val size = itemSize.toFloat()
    return (size - startOffset - endOffset) / size
}