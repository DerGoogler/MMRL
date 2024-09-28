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

import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.lazy.LazyListItemInfo
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.grid.LazyGridItemInfo
import androidx.compose.foundation.lazy.grid.LazyGridState
import androidx.compose.runtime.Composable

/**
 * Calculates a [ScrollbarState] driven by the changes in a [LazyListState].
 *
 * @param itemsAvailable the total amount of items available to scroll in the lazy list.
 * @param itemIndex a lookup function for index of an item in the list relative to [itemsAvailable].
 */
@Composable
fun LazyListState.scrollbarState(
    itemsAvailable: Int = layoutInfo.totalItemsCount,
    itemIndex: (LazyListItemInfo) -> Int = LazyListItemInfo::index
): ScrollbarState = scrollbarState(
    itemsAvailable = itemsAvailable,
    visibleItems = { layoutInfo.visibleItemsInfo },
    firstVisibleItemIndex = { visibleItems ->
        interpolateFirstItemIndex(
            visibleItems = visibleItems,
            itemSize = { it.size },
            offset = { it.offset },
            nextItemOnMainAxis = { first -> visibleItems.find { it != first } },
            itemIndex = itemIndex,
        )
    },
    itemPercentVisible = itemPercentVisible@{ itemInfo ->
        itemVisibilityPercentage(
            itemSize = itemInfo.size,
            itemStartOffset = itemInfo.offset,
            viewportStartOffset = layoutInfo.viewportStartOffset,
            viewportEndOffset = layoutInfo.viewportEndOffset,
        )
    }
)

/**
 * Calculates a [ScrollbarState] driven by the changes in a [LazyGridState]
 *
 * @param itemsAvailable the total amount of items available to scroll in the grid.
 * @param itemIndex a lookup function for index of an item in the grid relative to [itemsAvailable].
 */
@Composable
fun LazyGridState.scrollbarState(
    itemsAvailable: Int,
    itemIndex: (LazyGridItemInfo) -> Int = LazyGridItemInfo::index
): ScrollbarState = scrollbarState(
    itemsAvailable = itemsAvailable,
    visibleItems = { layoutInfo.visibleItemsInfo },
    firstVisibleItemIndex = { visibleItems ->
        interpolateFirstItemIndex(
            visibleItems = visibleItems,
            itemSize = {
                layoutInfo.orientation.valueOf(it.size)
            },
            offset = { layoutInfo.orientation.valueOf(it.offset) },
            nextItemOnMainAxis = { first ->
                when (layoutInfo.orientation) {
                    Orientation.Vertical -> visibleItems.find {
                        it != first && it.row != first.row
                    }

                    Orientation.Horizontal -> visibleItems.find {
                        it != first && it.column != first.column
                    }
                }
            },
            itemIndex = itemIndex,
        )
    },
    itemPercentVisible = itemPercentVisible@{ itemInfo ->
        itemVisibilityPercentage(
            itemSize = layoutInfo.orientation.valueOf(itemInfo.size),
            itemStartOffset = layoutInfo.orientation.valueOf(itemInfo.offset),
            viewportStartOffset = layoutInfo.viewportStartOffset,
            viewportEndOffset = layoutInfo.viewportEndOffset,
        )
    }
)