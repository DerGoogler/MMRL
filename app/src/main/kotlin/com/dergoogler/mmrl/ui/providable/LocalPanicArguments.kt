package com.dergoogler.mmrl.ui.providable

import android.os.BaseBundle
import androidx.compose.runtime.staticCompositionLocalOf

val LocalPanicArguments = staticCompositionLocalOf<BaseBundle> {
    error("CompositionLocal NavBackStackEntry.panicArguments not present")
}