package com.dergoogler.mmrl.utils.extensions

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.browser.customtabs.CustomTabColorSchemeParams
import androidx.browser.customtabs.CustomTabsIntent
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.graphics.toArgb
import androidx.core.app.ShareCompat

val Context.tmpDir get() = cacheDir.resolve("tmp")
    .apply {
        if (!exists()) mkdirs()
    }

fun Context.openUrl(url: String) {
    Intent.parseUri(url, Intent.URI_INTENT_SCHEME).apply {
        startActivity(this)
    }
}

@SuppressLint("ComposableNaming")
@Composable
@ReadOnlyComposable
fun Context.launchCustomTab(url: String) {
    val colorSchemeParams = CustomTabColorSchemeParams.Builder()
        .setToolbarColor(MaterialTheme.colorScheme.primary.toArgb())
        .setSecondaryToolbarColor(MaterialTheme.colorScheme.secondary.toArgb())
        .setNavigationBarColor(MaterialTheme.colorScheme.primary.toArgb())
        .build()

    val customTabsIntent = CustomTabsIntent.Builder()
        .setDefaultColorSchemeParams(colorSchemeParams)
        .build()

    customTabsIntent.launchUrl(this, Uri.parse(url))
}

fun Context.shareText(text: String) {
    ShareCompat.IntentBuilder(this)
        .setType("text/plain")
        .setText(text)
        .startChooser()
}