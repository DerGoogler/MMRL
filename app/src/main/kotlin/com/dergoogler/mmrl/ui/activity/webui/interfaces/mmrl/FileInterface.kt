package com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl

import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.dergoogler.mmrl.Compat
import dev.dergoogler.mmrl.compat.core.MMRLWebUIInterface
import java.util.Base64


class FileInterface(
    webView: WebView,
    context: Context,
) : MMRLWebUIInterface(webView, context) {
    private val file = Compat.fileManager
    
    @JavascriptInterface
    fun read(path: String): String? = read(path, false)

    @JavascriptInterface
    fun read(path: String, bytes: Boolean): String? =
        runTryJsWith(file, "Error while reading from '$path'. BYTES: $bytes") {
            if (!bytes) return@runTryJsWith readText(path)

            return@runTryJsWith Base64.getEncoder().encodeToString(readBytes(path))
        }

    @JavascriptInterface
    fun write(path: String, data: String) {
        runTryJsWith(file, "Error while writing to '$path'") {
            writeText(path, data)
        }
    }

    @JavascriptInterface
    fun readAsBase64(path: String): String? =
        runTryJsWith(file, "Error while reading '$path' as base64") {
            return@runTryJsWith readAsBase64(path)
        }

    @JavascriptInterface
    fun list(path: String): String? = this.list(path, ",")

    @JavascriptInterface
    fun list(path: String, delimiter: String): String? =
        runTryJsWith(file, "Error while reading files of '$path'") {
            return@runTryJsWith list(path).joinToString(delimiter)
        }

    @JavascriptInterface
    fun size(path: String): Long = this.size(path, false)

    @JavascriptInterface
    fun size(path: String, recursive: Boolean): Long =
        runTryJsWith(
            file,
            "Error while getting size of '$path'. RECURSIVE: $recursive",
            0L
        ) {
            if (recursive) return@runTryJsWith sizeRecursive(path)

            return@runTryJsWith size(path)
        }

    @JavascriptInterface
    fun stat(path: String): Long = this.stat(path, false)

    @JavascriptInterface
    fun stat(path: String, total: Boolean): Long =
        runTryJsWith(file, "Error while getting stat of '$path'. TOTAL: $total", 0L) {
            if (total) return@runTryJsWith totalStat(path)

            return@runTryJsWith stat(path)
        }

    @JavascriptInterface
    fun delete(path: String): Boolean =
        runTryJsWith(file, "Error while deleting '$path'", false) {
            return@runTryJsWith delete(path)
        }

    @JavascriptInterface
    fun exists(path: String): Boolean =
        runTryJsWith(file, "Error while checking for existence of '$path'", false) {
            return@runTryJsWith exists(path)
        }

    @JavascriptInterface
    fun isDirectory(path: String): Boolean =
        runTryJsWith(file, "Error while checking if '$path' is a directory", false) {
            return@runTryJsWith isDirectory(path)
        }

    @JavascriptInterface
    fun isFile(path: String): Boolean =
        runTryJsWith(file, "Error while checking if '$path' is a file", false) {
            return@runTryJsWith isFile(path)
        }

    @JavascriptInterface
    fun mkdir(path: String): Boolean =
        runTryJsWith(file, "Error while creating directory '$path'", false) {
            return@runTryJsWith mkdir(path)
        }

    @JavascriptInterface
    fun mkdirs(path: String): Boolean =
        runTryJsWith(file, "Error while creating directories '$path'", false) {
            return@runTryJsWith mkdirs(path)
        }

    @JavascriptInterface
    fun createNewFile(path: String): Boolean =
        runTryJsWith(file, "Error while creating file '$path'", false) {
            return@runTryJsWith createNewFile(path)
        }

    @JavascriptInterface
    fun renameTo(target: String, dest: String): Boolean =
        runTryJsWith(file, "Error while renaming '$target' to '$dest'", false) {
            return@runTryJsWith renameTo(target, dest)
        }

    @JavascriptInterface
    fun copyTo(target: String, dest: String, overwrite: Boolean): Boolean =
        runTryJsWith(file, "Error while copying '$target' to '$dest'", false) {
            return@runTryJsWith copyTo(target, dest, overwrite)
        }

    @JavascriptInterface
    fun canExecute(path: String): Boolean =
        runTryJsWith(file, "Error while checking if '$path' can be executed", false) {
            return@runTryJsWith canExecute(path)
        }

    @JavascriptInterface
    fun canWrite(path: String): Boolean =
        runTryJsWith(
            file,
            "Error while checking if '$path' can be written to",
            false
        ) {
            return@runTryJsWith canWrite(path)
        }

    @JavascriptInterface
    fun canRead(path: String): Boolean =
        runTryJsWith(file, "Error while checking if '$path' can be read", false) {
            return@runTryJsWith canRead(path)
        }

    @JavascriptInterface
    fun isHidden(path: String): Boolean =
        runTryJsWith(file, "Error while checking if '$path' is hidden", false) {
            return@runTryJsWith isHidden(path)
        }
}