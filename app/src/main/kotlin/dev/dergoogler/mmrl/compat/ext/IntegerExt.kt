package dev.dergoogler.mmrl.compat.ext

import java.util.Locale

fun Int.toFormattedFileSize(): String = toDouble().toFormattedFileSize()

fun Long.toFormattedFileSize(): String = toDouble().toFormattedFileSize()

fun Float.toFormattedFileSize(): String = toDouble().toFormattedFileSize()

fun Double.toFormattedFileSize(): String {
    if (this < 1024) return "$this B"

    val units = arrayOf("B", "KB", "MB", "GB", "TB", "PB")
    var size = this
    var unitIndex = 0

    while (size >= 1024 && unitIndex < units.size - 1) {
        size /= 1024
        unitIndex++
    }

    return String.format(Locale.getDefault(), "%.2f %s", size, units[unitIndex])
}
