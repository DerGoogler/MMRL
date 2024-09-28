package com.dergoogler.mmrl.utils.extensions

import android.content.Context
import android.content.Intent
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

fun Context.shareText(text: String) {
    ShareCompat.IntentBuilder(this)
        .setType("text/plain")
        .setText(text)
        .startChooser()
}