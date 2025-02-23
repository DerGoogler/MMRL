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
import java.nio.ByteBuffer
import java.nio.charset.StandardCharsets
import kotlin.math.log
import kotlin.math.pow


internal class FileManagerImpl : IFileManager.Stub() {

    init {
        System.loadLibrary("file-manager")
    }

    private external fun nativeList(path: String): List<String>?
    private external fun nativeStat(path: String): Long
    private external fun nativeSize(path: String): Long
    private external fun nativeSizeRecursive(path: String): Long
    private external fun nativeExists(path: String): Boolean
    private external fun nativeIsDirectory(path: String): Boolean
    private external fun nativeIsFile(path: String): Boolean
    private external fun nativeMkdir(path: String): Boolean
    private external fun nativeMkdirs(path: String): Boolean
    private external fun nativeDelete(path: String): Boolean
    private external fun nativeWriteBytes(path: String, data: ByteArray): Boolean
    private external fun nativeReadByteBuffer(path: String): ByteBuffer?
    private external fun nativeRenameTo(srcPath: String, destPath: String): Boolean
    private external fun nativeCopyTo(
        srcPath: String,
        destPath: String,
        overwrite: Boolean,
    ): Boolean
    private external fun nativeSetOwner(path: String, owner: Int, group: Int): Boolean
    private external fun nativeSetPermissions(path: String, mode: Int): Boolean
    private external fun nativeCanExecute(path: String): Boolean
    private external fun nativeCanWrite(path: String): Boolean
    private external fun nativeCanRead(path: String): Boolean
    private external fun nativeIsHidden(path: String): Boolean
    private external fun nativeCreateNewFile(path: String): Boolean

    override fun deleteOnExit(path: String) = with(File(path)) {
        when {
            !exists() -> false
            isFile -> delete()
            isDirectory -> deleteRecursively()
            else -> false
        }
    }

    override fun writeBytes(path: String, data: ByteArray): Boolean {
        return nativeWriteBytes(path, data)
    }
    override fun writeText(path: String, data: String): Boolean =
        nativeWriteBytes(path, data.toByteArray())
    override fun readText(path: String): String {
        val buffer = nativeReadByteBuffer(path)
        return StandardCharsets.UTF_8.decode(buffer).toString();
    }
    override fun readBytes(path: String): ByteArray? {
        val buffer: ByteBuffer = nativeReadByteBuffer(path) ?: return null
        return ByteArray(buffer.remaining()).apply { buffer.get(this) }
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

    override fun list(path: String): List<String>? = nativeList(path)
    override fun size(path: String): Long = nativeSize(path)
    override fun sizeRecursive(path: String): Long = nativeSizeRecursive(path)
    override fun stat(path: String): Long = nativeStat(path)
    override fun delete(path: String): Boolean = nativeDelete(path)
    override fun exists(path: String): Boolean = nativeExists(path)
    override fun isDirectory(path: String): Boolean = nativeIsDirectory(path)
    override fun isFile(path: String): Boolean = nativeIsFile(path)
    override fun mkdir(path: String): Boolean = nativeMkdir(path)
    override fun mkdirs(path: String): Boolean = nativeMkdirs(path)
    override fun createNewFile(path: String): Boolean = nativeCreateNewFile(path)
    override fun renameTo(target: String, dest: String): Boolean = nativeRenameTo(target, dest)
    override fun copyTo(
        target: String,
        dest: String,
        overwrite: Boolean,
    ): Boolean = nativeCopyTo(target, dest, overwrite)
    override fun canExecute(path: String): Boolean = nativeCanExecute(path)
    override fun canWrite(path: String): Boolean = nativeCanWrite(path)
    override fun canRead(path: String): Boolean = nativeCanRead(path)
    override fun isHidden(path: String): Boolean = nativeIsHidden(path)
    override fun setPermissions(path: String, mode: Int): Boolean =
        nativeSetPermissions(path, mode)
    override fun setOwner(path: String, owner: Int, group: Int): Boolean =
        nativeSetOwner(path, owner, group)
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

