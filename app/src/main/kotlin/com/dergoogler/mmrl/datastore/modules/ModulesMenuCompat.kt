package com.dergoogler.mmrl.datastore.modules

import com.dergoogler.mmrl.datastore.repository.Option

data class ModulesMenuCompat(
    val option: Option,
    val descending: Boolean,
    val pinEnabled: Boolean,
    val showUpdatedTime: Boolean
) {
    constructor(original: ModulesMenu) : this(
        option = original.option,
        descending = original.descending,
        pinEnabled = original.pinEnabled,
        showUpdatedTime = original.showUpdatedTime
    )

    fun toProto(): ModulesMenu = ModulesMenu.newBuilder()
        .setOption(option)
        .setDescending(descending)
        .setPinEnabled(pinEnabled)
        .setShowUpdatedTime(showUpdatedTime)
        .build()

    companion object {
        fun default() = ModulesMenuCompat(
            option = Option.NAME,
            descending = false,
            pinEnabled = false,
            showUpdatedTime = true
        )
    }
}