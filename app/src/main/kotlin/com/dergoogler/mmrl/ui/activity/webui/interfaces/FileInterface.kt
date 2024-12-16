package com.dergoogler.mmrl.ui.activity.webui.interfaces

import android.app.Activity
import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.dergoogler.mmrl.Compat

class FileInterface(
    val context: Context,
    private val allowRestrictedPaths: Boolean,
    private val webView: WebView,
) {
    private val activity = context as Activity
    private val file = Compat.fileManager

    private fun sendErrorLog(path: String) = activity.runOnUiThread {
        webView.loadUrl("javascript:console.error('Access to $path is restricted.')")
    }

    @JavascriptInterface
    fun isAccessRestricted(path: String): Boolean =
        file.isAccessRestricted(path, allowRestrictedPaths)

    @JavascriptInterface
    fun read(path: String): String? = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return null
        }

        return read(path)
    }

    @JavascriptInterface
    fun write(path: String, data: String): Unit = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return
        }

        write(path, data)
    }

    @JavascriptInterface
    fun readAsBase64(path: String): String? = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return null
        }

        return readAsBase64(path)
    }

    @JavascriptInterface
    fun list(path: String): String? = this.list(path, ",")

    @JavascriptInterface
    fun list(path: String, delimiter: String): String? = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return null
        }

        return list(path, delimiter)
    }

    @JavascriptInterface
    fun stat(path: String): Long = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return 0
        }

        return stat(path)
    }

    @JavascriptInterface
    fun delete(path: String): Boolean = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return false
        }

        return delete(path)
    }

    @JavascriptInterface
    fun exists(path: String): Boolean = with(file) {
        if (isAccessRestricted(path, allowRestrictedPaths)) {
            sendErrorLog(path)
            return false
        }

        return exists(path)
    }

}