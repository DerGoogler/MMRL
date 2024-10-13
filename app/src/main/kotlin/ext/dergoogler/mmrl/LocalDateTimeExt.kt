package ext.dergoogler.mmrl

import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

fun Float.toDateTime(): String {
    val instant = Instant.fromEpochMilliseconds(times(1000).toLong())
    return instant.toLocalDateTime(TimeZone.currentSystemDefault()).toString()
}

fun Float.toDate(): String {
    val instant = Instant.fromEpochMilliseconds(times(1000).toLong())
    return instant.toLocalDateTime(TimeZone.currentSystemDefault()).date.toString()
}

fun Long.toDateTime(): String {
    val instant = Instant.fromEpochMilliseconds(this)
    return instant.toLocalDateTime(TimeZone.currentSystemDefault()).toString()
}

fun Long.toDate(): String {
    val instant = Instant.fromEpochMilliseconds(this)
    return instant.toLocalDateTime(TimeZone.currentSystemDefault()).date.toString()
}

fun Float.toFormattedDate(): String {
    val instant = Instant.fromEpochMilliseconds((this * 1000).toLong())
    val localDateTime = instant.toLocalDateTime(TimeZone.currentSystemDefault())
    return formatDate(localDateTime)
}

fun Long.toFormattedDate(): String {
    val instant = Instant.fromEpochMilliseconds(this)
    val localDateTime = instant.toLocalDateTime(TimeZone.currentSystemDefault())
    return formatDate(localDateTime)
}

private fun formatDate(localDateTime: LocalDateTime): String {
    val month = localDateTime.month.name.lowercase().replaceFirstChar { it.uppercase() }
    val day = localDateTime.dayOfMonth
    val year = localDateTime.year
    return "$month $day, $year"
}

fun LocalDateTime.Companion.now() = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())