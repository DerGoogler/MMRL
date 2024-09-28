package com.dergoogler.mmrl.ui.providable

import androidx.compose.runtime.staticCompositionLocalOf
import com.dergoogler.mmrl.datastore.UserPreferencesCompat

val LocalUserPreferences = staticCompositionLocalOf { UserPreferencesCompat.default() }
