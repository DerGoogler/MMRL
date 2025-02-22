package com.dergoogler.mmrl.ui.providable

import android.content.res.Configuration
import androidx.compose.material3.windowsizeclass.WindowSizeClass
import androidx.compose.material3.windowsizeclass.WindowWidthSizeClass
import androidx.compose.runtime.staticCompositionLocalOf

data class WindowWidthSize(
    private val configuration: Configuration,
    private val windowSizeClass: WindowSizeClass
) {
    val isLargeScreen = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Expanded
    val isLandscape = configuration.orientation == Configuration.ORIENTATION_LANDSCAPE
    val isRailShown = isLargeScreen || isLandscape
}

val LocalWindowWidthSizeClass = staticCompositionLocalOf<WindowWidthSize> {
    error("CompositionLocal WindowWidthSize not present")
}