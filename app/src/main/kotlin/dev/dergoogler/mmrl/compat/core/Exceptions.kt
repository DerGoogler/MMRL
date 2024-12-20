package dev.dergoogler.mmrl.compat.core

open class BrickException(
    msg: String? = null,
    val helpMessage: String? = null,
    val helpLink: String? = null,
) : RuntimeException(msg)