package dev.dergoogler.mmrl.compat.impl

import dev.dergoogler.mmrl.compat.stub.IFileManager
import java.io.File

internal class FileManagerImpl : IFileManager.Stub() {
    override fun deleteOnExit(path: String) = with(File(path)) {
        when {
            !exists() -> false
            isFile -> delete()
            isDirectory -> deleteRecursively()
            else -> false
        }
    }
}