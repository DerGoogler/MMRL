package com.dergoogler.mmrl.datastore.repositories

import com.dergoogler.mmrl.datastore.repository.Option

data class RepositoriesMenuCompat(
    val option: Option,
    val descending: Boolean,
    val showUpdatedTime: Boolean,
    val showCover: Boolean,
    val showModulesCount: Boolean,
) {
    constructor(original: RepositoriesMenu) : this(
        option = original.option,
        descending = original.descending,
        showUpdatedTime = original.showUpdatedTime,
        showCover = original.showCover,
        showModulesCount = original.showModulesCount,
    )

    fun toProto(): RepositoriesMenu = RepositoriesMenu.newBuilder()
        .setOption(option)
        .setDescending(descending)
        .setShowUpdatedTime(showUpdatedTime)
        .setShowCover(showCover)
        .setShowModulesCount(showModulesCount)
        .build()

    companion object {
        fun default() = RepositoriesMenuCompat(
            option = Option.NAME,
            descending = false,
            showUpdatedTime = true,
            showCover = true,
            showModulesCount = true,
        )
    }
}