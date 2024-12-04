package com.dergoogler.mmrl.ui.activity.webui

import android.content.Context
import android.webkit.WebResourceResponse
import androidx.annotation.WorkerThread
import androidx.webkit.WebViewAssetLoader.PathHandler
import com.dergoogler.mmrl.ui.activity.webui.MimeUtil.getMimeFromFileName
import com.topjohnwu.superuser.Shell
import com.topjohnwu.superuser.io.SuFile
import com.topjohnwu.superuser.io.SuFileInputStream
import timber.log.Timber
import java.io.File
import java.io.IOException
import java.io.InputStream
import java.util.zip.GZIPInputStream

class SuFilePathHandler(
    context: Context,
    directory: File,
    rootShell: Shell?,
) :
    PathHandler {
    private var mDirectory: File

    private var mShell: Shell? = null

    init {
        try {
            mDirectory = File(getCanonicalDirPath(directory))
            if (!isAllowedInternalStorageDir(context)) {
                throw IllegalArgumentException(
                    "The given directory \"" + directory
                            + "\" doesn't exist under an allowed app internal storage directory"
                )
            }
            mShell = rootShell
        } catch (e: IOException) {
            throw IllegalArgumentException(
                ("Failed to resolve the canonical path for the given directory: "
                        + directory.path), e
            )
        }
    }

    @Throws(IOException::class)
    private fun isAllowedInternalStorageDir(context: Context): Boolean {
        val dir = getCanonicalDirPath(mDirectory)

        for (forbiddenPath: String in FORBIDDEN_DATA_DIRS) {
            if (dir.startsWith(forbiddenPath)) {
                return false
            }
        }
        return true
    }

    @WorkerThread
    override fun handle(path: String): WebResourceResponse? {
        if (path.startsWith("mmrl/") || path.startsWith("favicon.ico")) return null

        try {
            val file = getCanonicalFileIfChild(mDirectory, path)
            if (file != null) {
                val `is` = openFile(
                    file,
                    (mShell)!!
                )
                val mimeType = guessMimeType(path)
                return WebResourceResponse(mimeType, null, `is`)
            } else {
                Timber.tag(TAG).e(
                    "The requested file: %s is outside the mounted directory: %s",
                    path,
                    mDirectory
                )
            }
        } catch (e: IOException) {
            Timber.tag(TAG).e(e, "Error opening the requested path: %s", path)
        }
        return WebResourceResponse(null, null, null)
    }

    companion object {
        private const val TAG = "SuFilePathHandler"

        private const val DEFAULT_MIME_TYPE: String = "text/plain"

        private val FORBIDDEN_DATA_DIRS = arrayOf("/data/data", "/data/system")

        @Throws(IOException::class)
        fun getCanonicalDirPath(file: File): String {
            var canonicalPath = file.canonicalPath
            if (!canonicalPath.endsWith("/")) canonicalPath += "/"
            return canonicalPath
        }

        @Throws(IOException::class)
        fun getCanonicalFileIfChild(parent: File, child: String): File? {
            val parentCanonicalPath = getCanonicalDirPath(parent)
            val childCanonicalPath = File(parent, child).canonicalPath
            if (childCanonicalPath.startsWith(parentCanonicalPath)) {
                return File(childCanonicalPath)
            }
            return null
        }

        @Throws(IOException::class)
        private fun handleSvgzStream(
            path: String,
            stream: InputStream,
        ): InputStream {
            return if (path.endsWith(".svgz")) GZIPInputStream(stream) else stream
        }

        @Throws(IOException::class)
        fun openFile(file: File, shell: Shell): InputStream {
            val suFile = SuFile(file.absolutePath)
            suFile.shell = shell
            val fis = SuFileInputStream.open(suFile)
            return handleSvgzStream(file.path, fis)
        }

        fun guessMimeType(filePath: String): String {
            val mimeType = getMimeFromFileName(filePath)
            return mimeType ?: DEFAULT_MIME_TYPE
        }
    }
}