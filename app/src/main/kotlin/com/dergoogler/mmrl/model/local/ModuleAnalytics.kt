package com.dergoogler.mmrl.model.local

import dev.dergoogler.mmrl.compat.stub.IFileManager

data class ModuleAnalytics(
    private val local: List<LocalModule>,
    private val fileManager: IFileManager,
) {
    val totalModules = local.size

    private fun getTotalByState(state: State) = local.filter { it.state == state }.size

    val totalEnabled = getTotalByState(State.ENABLE)
    val totalDisabled = getTotalByState(State.DISABLE)
    val totalUpdated = getTotalByState(State.UPDATE)

    val totalModulesUsageBytes = fileManager.sizeRecursive("/data/adb/modules")
    val totalDeviceStorageBytes: Long
        get() = with(fileManager) {
            val paths = listOf(
                "/data",
                "/system",
                "/dev",
                "/cache",
                "/mnt",
                "/vendor"
            )

            return paths.sumOf { totalStat(it) }
        }

    val totalStorageUsage = (totalModulesUsageBytes.toFloat() / totalDeviceStorageBytes.toFloat()) * 1000
}
