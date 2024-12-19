package com.dergoogler.mmrl

class Platform(private val realPlatform: String) {
    private val magisk = "magisk"
    private val kernelSU = "kernelsu"
    private val apatch = "apatch"

    val isMagisk get() = realPlatform == magisk
    val isKernelSU get() = realPlatform == kernelSU
    val isAPatch get() = realPlatform == apatch

    val isNotMagisk get() = realPlatform != magisk
    val isNotKernelSU get() = realPlatform != kernelSU
    val isNotAPatch get() = realPlatform != apatch

    val current: String
        get() = when {
            isMagisk -> magisk
            isKernelSU -> kernelSU
            isAPatch -> apatch
            else -> ""
        }

    fun only(platform: Boolean, block: Platform.() -> Unit) {
        if (platform) {
            block()
        }
    }
}