package dev.dergoogler.mmrl.compat.impl

import android.util.Base64
import android.util.Base64OutputStream
import dev.dergoogler.mmrl.compat.stub.IFileManager
import timber.log.Timber
import java.io.BufferedReader
import java.io.ByteArrayOutputStream
import java.io.Closeable
import java.io.File
import java.io.FileInputStream
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader
import java.io.OutputStream


internal class FileManagerImpl : IFileManager.Stub() {
    override fun deleteOnExit(path: String) = with(File(path)) {
        when {
            !exists() -> false
            isFile -> delete()
            isDirectory -> deleteRecursively()
            else -> false
        }
    }

    override fun write(path: String, data: String): Unit = with(File(path)) {
        try {
            val outputStream: OutputStream = FileOutputStream(this)
            outputStream.write(data.toByteArray())
            outputStream.flush()
        } catch (e: IOException) {
            Timber.e("FileManagerImpl>write: $e")
        }
    }

    override fun read(path: String): String? = with(File(path)) {
        if (!exists()) return null

        try {
            BufferedReader(InputStreamReader(FileInputStream(this))).use { br ->
                val sb = StringBuilder()
                var line: String?
                while ((br.readLine().also { line = it }) != null) {
                    sb.append(line)
                    sb.append('\n')
                }
                return sb.toString()
            }
        } catch (e: IOException) {
            Timber.e("FileManagerImpl>read: $e")
            return null
        }
    }

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