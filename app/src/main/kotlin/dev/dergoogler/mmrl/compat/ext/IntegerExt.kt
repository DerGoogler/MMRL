package dev.dergoogler.mmrl.compat.ext

import dev.dergoogler.mmrl.compat.impl.FileManagerUtil
import java.util.Locale

fun Int.toFormattedFileSize(): String = toDouble().toFormattedFileSize()

fun Long.toFormattedFileSize(): String = toDouble().toFormattedFileSize()

fun Float.toFormattedFileSize(): String = toDouble().toFormattedFileSize()

fun Double.toFormattedFileSize(): String {
    if (this < 1024) return "$this B"

    val units = arrayOf("B", "KB", "MB", "GB", "TB", "PB")
    var size = this
    val sizeRepresentation = FileManagerUtil.getStorageSizeRepresentation(size)
    val base = sizeRepresentation.base.toDouble()
    var unitIndex = 0

    while (size >= base && unitIndex < units.size - 1) {
        size /= base
        unitIndex++
    }

    return if (size == size.toLong().toDouble()) {
        String.format(Locale.getDefault(), "%.0f %s", size, units[unitIndex])
    } else {
        String.format(Locale.getDefault(), "%.2f %s", size, units[unitIndex])
    }
}


fun Int.toDollars(divideBy: Double = 100.0): String {
    return "$%.2f".format(Locale.getDefault(), this / divideBy)
}