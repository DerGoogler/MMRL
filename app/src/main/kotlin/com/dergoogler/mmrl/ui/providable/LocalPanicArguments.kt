package com.dergoogler.mmrl.ui.providable

import android.os.Bundle
import androidx.compose.runtime.staticCompositionLocalOf

val LocalPanicArguments = staticCompositionLocalOf<Bundle> {
    error("CompositionLocal NavBackStackEntry.panicArguments not present")
}