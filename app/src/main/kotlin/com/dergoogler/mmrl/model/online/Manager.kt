package com.dergoogler.mmrl.model.online

import android.annotation.SuppressLint
import android.os.Build
import androidx.compose.runtime.Composable
import com.squareup.moshi.JsonClass
import dev.dergoogler.mmrl.compat.ext.isNotNullOrEmpty

@JsonClass(generateAdapter = true)
data class Manager(
    val magisk: RootManager? = null,
    val kernelsu: RootManager? = null,
    val apatch: RootManager? = null,
) {
    operator fun get(solution: String) = when (solution.lowercase()) {
        "magisk" -> magisk
        "kernelsu" -> kernelsu
        "apatch" -> apatch
        else -> RootManager()
    }

    val all: List<RootManager>
        get() = listOfNotNull(
            magisk,
            kernelsu,
            apatch,
        )
}

@JsonClass(generateAdapter = true)
data class RootManager(
    val min: Int? = null,
    val devices: List<String>? = null,
    val arch: List<String>? = null,
    val require: List<String>? = null,
) {
    @SuppressLint("ComposableNaming")
    @Composable
    fun isNotSupportedRootVersion(
        version: Int,
        block: @Composable (Int) -> Unit,
    ) {
        if (isNotSupportedRootVersion(version)) {
            block(min!!)
        }
    }

    private fun isNotSupportedRootVersion(
        version: Int,
    ) = min != null && version < min || min == -1

    private fun isNotSupportedDevice() =
        devices.isNotNullOrEmpty() && !devices.map { it.lowercase() }.contains(Build.MODEL.lowercase())

    @SuppressLint("ComposableNaming")
    @Composable
    fun isNotSupportedDevice(
        block: @Composable () -> Unit,
    ) {
        if (isNotSupportedDevice()) {
            block()
        }
    }

    private fun isNotSupportedArch() = arch.isNotNullOrEmpty() && !arch.map { it.lowercase() }
        .contains(Build.SUPPORTED_ABIS[0].lowercase())

    @SuppressLint("ComposableNaming")
    @Composable
    fun isNotSupportedArch(
        block: @Composable () -> Unit,
    ) {
        if (isNotSupportedArch()) {
            block()
        }
    }
}