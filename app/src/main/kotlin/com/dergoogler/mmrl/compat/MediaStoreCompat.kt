package com.dergoogler.mmrl.compat

import android.content.ContentValues
import android.content.Context
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.DocumentsContract
import android.provider.OpenableColumns
import android.system.Os
import android.provider.MediaStore
import androidx.annotation.RequiresApi
import androidx.core.net.toFile
import androidx.core.net.toUri
import androidx.documentfile.provider.DocumentFile
import java.io.File
import java.io.IOException

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

    private fun createDownloadUri(
        path: String
    ) = Environment.getExternalStoragePublicDirectory(
        Environment.DIRECTORY_DOWNLOADS
    ).let {
        val file = File(it, path)
        file.parentFile?.apply { if (!exists()) mkdirs() }
        file.toUri()
    }

    fun Context.createDownloadUri(
        path: String,
        mimeType: String
    ) = when {
        BuildCompat.atLeastR -> runCatching {
            createMediaStoreUri(
                file = File(Environment.DIRECTORY_DOWNLOADS, path),
                mimeType = mimeType
            )
        }.getOrElse {
            createDownloadUri(path)
        }

        else -> createDownloadUri(path)
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

    @RequiresApi(Build.VERSION_CODES.R)
    fun Context.createMediaStoreUri(
        file: File,
        collection: Uri = MediaStore.Downloads.getContentUri(MediaStore.VOLUME_EXTERNAL),
        mimeType: String
    ): Uri {
        val entry = ContentValues().apply {
            put(MediaStore.MediaColumns.DISPLAY_NAME, file.name)
            put(MediaStore.MediaColumns.RELATIVE_PATH, file.parent)
            put(MediaStore.MediaColumns.MIME_TYPE, mimeType)
        }

        return contentResolver.insert(collection, entry) ?: throw IOException("Cannot insert $file")
    }

}