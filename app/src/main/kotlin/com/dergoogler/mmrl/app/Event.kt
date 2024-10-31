package com.dergoogler.mmrl.app

import java.time.LocalDateTime
import java.time.LocalTime
import java.time.MonthDay

enum class Event {
    NON,
    LOADING,
    SUCCEEDED,
    FAILED;

    companion object {
        val Event.isNon get() = this == NON
        val Event.isLoading get() = this == LOADING
        val Event.isSucceeded get() = this == SUCCEEDED
        val Event.isFailed get() = this == FAILED
        val Event.isFinished get() = isSucceeded || isFailed
        val Event.isNotReady get() = isNon || isFailed


        private fun checkDateRange(startDate: String, endDate: String): Boolean {
            val currentDateTime = LocalDateTime.now()
            val currentMonthDay = MonthDay.from(currentDateTime)
            val currentTime = currentDateTime.toLocalTime()

            val (startMonthDay, startTime) = parseMonthDayTime(startDate)
            val (endMonthDay, endTime) = parseMonthDayTime(endDate)

            val isInDateRange =
                currentMonthDay.isAfter(startMonthDay) && currentMonthDay.isBefore(endMonthDay) ||
                        currentMonthDay == startMonthDay && currentTime.isAfter(startTime) ||
                        currentMonthDay == endMonthDay && currentTime.isBefore(endTime)

            return isInDateRange
        }

        private fun parseMonthDayTime(dateString: String): Pair<MonthDay, LocalTime> {
            val (monthDayPart, timePart) = dateString.split(" ")
            val (month, day) = monthDayPart.split("-").map { it.toInt() }
            val monthDay = MonthDay.of(month, day)
            val time = LocalTime.parse(timePart)
            return monthDay to time
        }

        val isHalloween
            get() = checkDateRange(
                startDate = "10-31 00:00",
                endDate = "11-01 00:00"
            )

        val isMMRLBirthday
            get() = checkDateRange(
                startDate = "04-25 00:00",
                endDate = "04-26 00:00"
            )

        val isChristmas
            get() = checkDateRange(
                startDate = "12-01 00:00",
                endDate = "12-28 00:00"
            )

        val isNewYearsEve
            get() = checkDateRange(
                startDate = "12-31 00:00",
                endDate = "01-02 00:00"
            )

        val isSomeRandomDates
            get() = checkDateRange(
                startDate = "10-28 00:00",
                endDate = "10-29 00:00"
            ) || checkDateRange(
                startDate = "10-05 00:00",
                endDate = "10-06 00:00"
            ) || checkDateRange(
                startDate = "11-18 00:00",
                endDate = "11-19 00:00"
            ) || checkDateRange(
                startDate = "11-20 00:00",
                endDate = "11-21 00:00"
            )
    }
}