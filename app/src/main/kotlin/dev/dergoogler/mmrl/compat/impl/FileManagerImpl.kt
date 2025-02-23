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

    init {
        System.loadLibrary("file-manager")
    }

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

    override fun mkdir(path: String): Boolean = with(File(path)) {
        return this.mkdirs();
    }

    override fun mkdirs(path: String): Boolean = with(File(path)) {
        return this.mkdirs();
    }

    override fun createNewFile(path: String): Boolean = with(File(path)) {
        return this.createNewFile();
    }

    override fun renameTo(target: String, dest: String): Boolean = with(File(target)) {
        return this.renameTo(File(dest));
    }

    override fun copyTo(
        target: String,
        dest: String,
        overwrite: Boolean,
    ): Boolean = with(File(target)) {
        return this.copyRecursively(File(dest), overwrite)
    }

    override fun canExecute(path: String): Boolean = with(File(path)) {
        return this.canExecute();
    }

    override fun canWrite(path: String): Boolean = with(File(path)) {
        return this.canWrite();
    }

    override fun canRead(path: String): Boolean = with(File(path)) {
        return this.canRead();
    }

    override fun isHidden(path: String): Boolean = with(File(path)) {
        return this.isHidden();
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


    override fun setReadonly(path: String): Boolean = with(File(path)) {
        setReadOnly()
    }

    override fun setWritable(path: String, writable: Boolean): Boolean = with(File(path)) {
        setWritable(writable)
    }

    override fun setReadable(path: String, readable: Boolean, ownerOnly: Boolean): Boolean =
        with(File(path)) {
            setReadable(readable, ownerOnly)
        }

    private external fun changeFileOwner(path: String, owner: Int, group: Int): Boolean

    private external fun changeFilePermissions(path: String, mode: Int): Boolean

    override fun setPermissions(path: String, mode: Int): Boolean =
        changeFilePermissions(path, mode)

    override fun setOwner(path: String, owner: Int, group: Int): Boolean =
        changeFileOwner(path, owner, group)
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

object FilePermissions {
    const val READ = 0b100 // 4 in decimal
    const val WRITE = 0b010 // 2 in decimal
    const val EXECUTE = 0b001 // 1 in decimal

    const val OWNER_READ = 0b100000000 // 0o400 (256)
    const val OWNER_WRITE = 0b010000000 // 0o200 (128)
    const val OWNER_EXECUTE = 0b001000000 // 0o100 (64)

    const val GROUP_READ = 0b000100000 // 0o040 (32)
    const val GROUP_WRITE = 0b000010000 // 0o020 (16)
    const val GROUP_EXECUTE = 0b000001000 // 0o010 (8)

    const val OTHERS_READ = 0b000000100 // 0o004 (4)
    const val OTHERS_WRITE = 0b000000010 // 0o002 (2)
    const val OTHERS_EXECUTE = 0b000000001 // 0o001 (1)

    const val PERMISSION_777 = 0b111111111 // 0o777 (511) - rwxrwxrwx
    const val PERMISSION_755 = 0b111101101 // 0o755 (493) - rwxr-xr-x
    const val PERMISSION_700 = 0b111000000 // 0o700 (448) - rwx------
    const val PERMISSION_644 = 0b110100100 // 0o644 (420) - rw-r--r--
    const val PERMISSION_600 = 0b110000000 // 0o600 (384) - rw-------
    const val PERMISSION_444 = 0b100100100 // 0o444 (292) - r--r--r--
}

