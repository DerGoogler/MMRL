package com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl

import android.content.Context
import android.webkit.JavascriptInterface
import com.dergoogler.mmrl.Compat

class FileInterface(
    val context: Context,
) {
    private val file = Compat.fileManager

    @JavascriptInterface
    fun read(path: String): String? = with(file) {
        return read(path)
    }

    @JavascriptInterface
    fun write(path: String, data: String): Unit = with(file) {
        write(path, data)
    }

    @JavascriptInterface
    fun readAsBase64(path: String): String? = with(file) {
        return readAsBase64(path)
    }

    @JavascriptInterface
    fun list(path: String): String = this.list(path, ",")

    @JavascriptInterface
    fun list(path: String, delimiter: String): String = with(file) {
        return list(path).joinToString(delimiter)
    }

    @JavascriptInterface
    fun size(path: String): Long = this.size(path, false)

    @JavascriptInterface
    fun size(path: String, recursive: Boolean): Long = with(file) {
        if (recursive) return sizeRecursive(path)

        return size(path)
    }

    @JavascriptInterface
    fun stat(path: String): Long = this.stat(path, false)

    @JavascriptInterface
    fun stat(path: String, total: Boolean): Long = with(file) {
        if (total) return totalStat(path)

        return stat(path)
    }

    @JavascriptInterface
    fun delete(path: String): Boolean = with(file) {
        return delete(path)
    }

    @JavascriptInterface
    fun exists(path: String): Boolean = with(file) {
        return exists(path)
    }
}