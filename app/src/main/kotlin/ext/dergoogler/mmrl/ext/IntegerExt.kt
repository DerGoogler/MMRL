package ext.dergoogler.mmrl.ext

import java.util.Locale

fun Int.toFormatedFileSize(): String {
    if (this < 1024) return "$this B"

    val units = arrayOf("B", "KB", "MB", "GB", "TB", "PB")
    var size = this.toDouble()
    var unitIndex = 0

    while (size >= 1024 && unitIndex < units.size - 1) {
        size /= 1024
        unitIndex++
    }

    return String.format(Locale.getDefault(), "%.2f %s", size, units[unitIndex])
}