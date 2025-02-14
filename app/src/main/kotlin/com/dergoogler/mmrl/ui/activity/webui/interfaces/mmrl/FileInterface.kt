package com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl

import android.app.Activity
import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.dergoogler.mmrl.Compat
import dev.dergoogler.mmrl.compat.stub.IFileManager
import java.util.Base64


class FileInterface(
    private val webView: WebView,
    val context: Context,
) {
    private val file = Compat.fileManager

    private fun <R> runJavaScriptCatching(
        message: String = "Unknown Error",
        block: IFileManager.() -> R,
    ): R? = runJavaScriptCatching(message, null, block)

    private fun <R> runJavaScriptCatching(
        message: String = "Unknown Error",
        default: R,
        block: IFileManager.() -> R,
    ): R {
        return try {
            block(file)
        } catch (e: Throwable) {
            (context as Activity).runOnUiThread {
                webView.loadUrl("javascript:(new Error('$message', { cause: \"${e.message}\" }))")
            }
            return default
        }
    }

    @JavascriptInterface
    fun read(path: String): String? = read(path, false)

    @JavascriptInterface
    fun read(path: String, bytes: Boolean): String? =
        runJavaScriptCatching("Error while reading from '$path'. BYTES: $bytes") {
            if (!bytes) return@runJavaScriptCatching readText(path)

            return@runJavaScriptCatching Base64.getEncoder().encodeToString(readBytes(path))
        }

    @JavascriptInterface
    fun write(path: String, data: String) {
        runJavaScriptCatching("Error while writing to '$path'") {
            writeText(path, data)
        }
    }

    @JavascriptInterface
    fun readAsBase64(path: String): String? =
        runJavaScriptCatching("Error while reading '$path' as base64") {
            return@runJavaScriptCatching readAsBase64(path)
        }

    @JavascriptInterface
    fun list(path: String): String? = this.list(path, ",")

    @JavascriptInterface
    fun list(path: String, delimiter: String): String? =
        runJavaScriptCatching("Error while reading files of '$path'") {
            return@runJavaScriptCatching list(path).joinToString(delimiter)
        }

    @JavascriptInterface
    fun size(path: String): Long = this.size(path, false)

    @JavascriptInterface
    fun size(path: String, recursive: Boolean): Long =
        runJavaScriptCatching("Error while getting size of '$path'. RECURSIVE: $recursive", 0L) {
            if (recursive) return@runJavaScriptCatching sizeRecursive(path)

            return@runJavaScriptCatching size(path)
        }

    @JavascriptInterface
    fun stat(path: String): Long = this.stat(path, false)

    @JavascriptInterface
    fun stat(path: String, total: Boolean): Long =
        runJavaScriptCatching("Error while getting stat of '$path'. TOTAL: $total", 0L) {
            if (total) return@runJavaScriptCatching totalStat(path)

            return@runJavaScriptCatching stat(path)
        }

    @JavascriptInterface
    fun delete(path: String): Boolean =
        runJavaScriptCatching("Error while deleting '$path'", false) {
            return@runJavaScriptCatching delete(path)
        }

    @JavascriptInterface
    fun exists(path: String): Boolean =
        runJavaScriptCatching("Error while checking for existence of '$path'", false) {
            return@runJavaScriptCatching exists(path)
        }

    @JavascriptInterface
    fun isDirectory(path: String): Boolean =
        runJavaScriptCatching("Error while checking if '$path' is a directory", false) {
            return@runJavaScriptCatching isDirectory(path)
        }

    @JavascriptInterface
    fun isFile(path: String): Boolean =
        runJavaScriptCatching("Error while checking if '$path' is a file", false) {
            return@runJavaScriptCatching isFile(path)
        }

    @JavascriptInterface
    fun mkdir(path: String): Boolean =
        runJavaScriptCatching("Error while creating directory '$path'", false) {
            return@runJavaScriptCatching mkdir(path)
        }

    @JavascriptInterface
    fun mkdirs(path: String): Boolean =
        runJavaScriptCatching("Error while creating directories '$path'", false) {
            return@runJavaScriptCatching mkdirs(path)
        }

    @JavascriptInterface
    fun createNewFile(path: String): Boolean =
        runJavaScriptCatching("Error while creating file '$path'", false) {
            return@runJavaScriptCatching createNewFile(path)
        }

    @JavascriptInterface
    fun renameTo(target: String, dest: String): Boolean =
        runJavaScriptCatching("Error while renaming '$target' to '$dest'", false) {
            return@runJavaScriptCatching renameTo(target, dest)
        }

    @JavascriptInterface
    fun copyTo(target: String, dest: String, overwrite: Boolean): Boolean =
        runJavaScriptCatching("Error while copying '$target' to '$dest'", false) {
            return@runJavaScriptCatching copyTo(target, dest, overwrite)
        }

    @JavascriptInterface
    fun canExecute(path: String): Boolean =
        runJavaScriptCatching("Error while checking if '$path' can be executed", false) {
            return@runJavaScriptCatching canExecute(path)
        }

    @JavascriptInterface
    fun canWrite(path: String): Boolean =
        runJavaScriptCatching("Error while checking if '$path' can be written to", false) {
            return@runJavaScriptCatching canWrite(path)
        }

    @JavascriptInterface
    fun canRead(path: String): Boolean =
        runJavaScriptCatching("Error while checking if '$path' can be read", false) {
            return@runJavaScriptCatching canRead(path)
        }

    @JavascriptInterface
    fun isHidden(path: String): Boolean =
        runJavaScriptCatching("Error while checking if '$path' is hidden", false) {
            return@runJavaScriptCatching isHidden(path)
        }

}