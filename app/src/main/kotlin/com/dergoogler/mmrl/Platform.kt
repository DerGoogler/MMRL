package com.dergoogler.mmrl

class Platform(private val realPlatform: String) {
    private val magisk = "magisk"
    private val kernelSU = "kernelsu"
    private val kernelSuNext = "ksunext"
    private val apatch = "apatch"

    val isMagisk get() = realPlatform == magisk
    val isKernelSU get() = realPlatform == kernelSU
    val isKernelSuNext get() = realPlatform == kernelSuNext
    val isAPatch get() = realPlatform == apatch

    val isNotMagisk get() = realPlatform != magisk
    val isNotKernelSU get() = realPlatform != kernelSU || realPlatform != kernelSuNext
    val isNotKernelSuNext get() = realPlatform != kernelSuNext
    val isNotAPatch get() = realPlatform != apatch

    val isValid get() = isMagisk || isKernelSU || isAPatch

    val current: String
        get() = when {
            isMagisk -> magisk
            isKernelSU -> kernelSU
            isKernelSuNext -> kernelSuNext
            isAPatch -> apatch
            else -> ""
        }

    fun only(platform: Boolean, block: Platform.() -> Unit) {
        if (platform) {
            block()
        }
    }
}