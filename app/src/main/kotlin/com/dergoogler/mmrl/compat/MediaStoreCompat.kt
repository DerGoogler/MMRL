package com.dergoogler.mmrl.compat

import android.content.Context
import android.net.Uri
import android.provider.DocumentsContract
import android.provider.OpenableColumns
import android.system.Os
import androidx.core.net.toFile
import androidx.documentfile.provider.DocumentFile
import java.io.File

object MediaStoreCompat {
    private fun Context.getDisplayNameForUri(uri: Uri): String {
        if (uri.scheme == "file") {
            return uri.toFile().name
        }

        require(uri.scheme == "content") { "Uri lacks 'content' scheme: $uri" }

        val projection = arrayOf(OpenableColumns.DISPLAY_NAME)
        contentResolver.query(uri, projection, null, null, null)?.use { cursor ->
            val displayNameColumn = cursor.getColumnIndexOrThrow(OpenableColumns.DISPLAY_NAME)
            if (cursor.moveToFirst()) {
                return cursor.getString(displayNameColumn)
            }
        }

        return uri.toString()
    }

    fun Context.getPathForUri(uri: Uri): String {
        if (uri.scheme == "file") {
            return uri.toFile().path
        }

        require(uri.scheme == "content") { "Uri lacks 'content' scheme: $uri" }

        val real = if (DocumentsContract.isTreeUri(uri)) {
            DocumentFile.fromTreeUri(this, uri)?.uri ?: uri
        } else {
            uri
        }

        return contentResolver.openFileDescriptor(real, "r")?.use {
            Os.readlink("/proc/self/fd/${it.fd}")
        } ?: uri.toString()
    }

    fun Context.getFileForUri(uri: Uri) = File(getPathForUri(uri))

    fun Context.copyToDir(uri: Uri, dir: File): File {
        val tmp = dir.resolve(getDisplayNameForUri(uri))
        contentResolver.openInputStream(uri)?.buffered()?.use { input ->
            tmp.outputStream().use { output ->
                input.copyTo(output)
            }
        }

        return tmp
    }
}