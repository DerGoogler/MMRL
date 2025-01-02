package dev.dergoogler.mmrl.compat.impl

import android.util.Base64
import android.util.Base64OutputStream
import dev.dergoogler.mmrl.compat.stub.IFileManager
import timber.log.Timber
import java.io.ByteArrayOutputStream
import java.io.Closeable
import java.io.File
import java.io.FileInputStream
import java.io.FileNotFoundException
import java.io.IOException
import java.io.InputStream
import kotlin.math.log
import kotlin.math.pow

internal class FileManagerImpl : IFileManager.Stub() {
    override fun deleteOnExit(path: String) = with(File(path)) {
        when {
            !exists() -> false
            isFile -> delete()
            isDirectory -> deleteRecursively()
            else -> false
        }
    }

    override fun writeBytes(path: String, data: ByteArray): Unit = File(path).writeBytes(data)
    override fun writeText(path: String, data: String): Unit =
        File(path).writeText(data, Charsets.UTF_8)

    override fun readText(path: String): String = File(path).readText(Charsets.UTF_8)
    override fun readBytes(path: String): ByteArray = File(path).readBytes()

    override fun readLines(path: String): List<String> = File(path).readLines()

    override fun readAsBase64(path: String): String? = with(File(path)) {
        if (!exists()) return null

        try {
            val `is`: InputStream = FileInputStream(this)
            val baos = ByteArrayOutputStream()
            val b64os = Base64OutputStream(baos, Base64.DEFAULT)
            val buffer = ByteArray(8192)
            var bytesRead: Int
            try {
                while ((`is`.read(buffer).also { bytesRead = it }) > -1) {
                    b64os.write(buffer, 0, bytesRead)
                }
                return baos.toString()
            } catch (e: IOException) {
                Timber.e("FileManagerImpl>readAsBase64: $e")
                return null
            } finally {
                closeQuietly(`is`)
                closeQuietly(b64os)
            }
        } catch (e: FileNotFoundException) {
            Timber.e("FileManagerImpl>readAsBase64: $e")
            return null
        }
    }

    private fun closeQuietly(closeable: Closeable) {
        try {
            closeable.close()
        } catch (e: IOException) {
            Timber.e("FileManagerImpl>closeQuietly: $e")
        }
    }

    override fun list(path: String): List<String>? = with(File(path)) {
        val files: Array<out String>? = list()

        if (files == null || files.isEmpty()) return null

        return files.toList()
    }

    override fun size(path: String): Long = with(File(path)) {
        return this.length();
    }

    override fun sizeRecursive(path: String): Long {
        val items = list(path) ?: return 0
        return items.sumOf { item ->
            val fullPath = "$path/$item"
            if (isDirectory(fullPath)) {
                sizeRecursive(fullPath)
            } else {
                size(fullPath)
            }
        }
    }

    override fun stat(path: String): Long = with(File(path)) {
        return this.lastModified();
    }

    override fun totalStat(path: String): Long = with(File(path)) {
        return this.totalSpace
    }

    override fun delete(path: String): Boolean = with(File(path)) {
        when {
            !exists() -> false
            isFile -> delete()
            isDirectory -> deleteRecursively()
            else -> false
        }
    }

    override fun exists(path: String): Boolean = with(File(path)) {
        return this.exists();
    }

    override fun isDirectory(path: String): Boolean = with(File(path)) {
        return this.isDirectory();
    }

    override fun isFile(path: String): Boolean = with(File(path)) {
        return this.isFile();
    }

    override fun isAccessRestricted(path: String, disable: Boolean): Boolean = with(File(path)) {
        if (disable) return false

        val restrictedRegex = Regex(
            """(/data/(system|data)/(.+)/?|(/storage/emulated/0|/sdcard)/Android/(data|media|obb)(.+)?)/?""",
            RegexOption.IGNORE_CASE
        )

        return try {
            val canonicalPath = this.canonicalPath
            restrictedRegex.matches(canonicalPath)
        } catch (e: Exception) {
            true
        }
    }
}

object FileManagerUtil {
    fun getStorageSizeRepresentation(storageSizeInBytes: Double): SizeRepresentation {
        return if (log(storageSizeInBytes / (1024.0.pow(3)), 2.0) % 1.0 == 0.0) {
            SizeRepresentation.Binary
        } else {
            SizeRepresentation.Decimal
        }
    }
}

enum class SizeRepresentation(val base: Int) {
    Binary(1024),
    Decimal(1000)
}