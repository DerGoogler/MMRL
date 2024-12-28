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

    val totalModulesUsageBytes = getFolderSize("/data/adb/modules")
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


    private fun getFolderSize(path: String): Long = with(fileManager) {
        val items = list(path) ?: return 0
        return items.sumOf { item ->
            val fullPath = "$path/$item"
            if (isDirectory(fullPath)) {
                getFolderSize(fullPath)
            } else {
                size(fullPath)
            }
        }
    }

    val totalStorageUsage = (totalModulesUsageBytes.toFloat() / totalDeviceStorageBytes.toFloat()) * 1000
}
