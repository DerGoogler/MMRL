package com.dergoogler.mmrl.datastore.modules

import com.dergoogler.mmrl.datastore.repository.Option

data class ModulesMenuCompat(
    val option: Option,
    val descending: Boolean,
    val pinEnabled: Boolean,
    val pinAction: Boolean,
    val pinWebUI: Boolean,
    val showUpdatedTime: Boolean
) {
    constructor(original: ModulesMenu) : this(
        option = original.option,
        descending = original.descending,
        pinEnabled = original.pinEnabled,
        pinAction = original.pinAction,
        pinWebUI = original.pinWebUI,
        showUpdatedTime = original.showUpdatedTime
    )

    fun toProto(): ModulesMenu = ModulesMenu.newBuilder()
        .setOption(option)
        .setDescending(descending)
        .setPinEnabled(pinEnabled)
        .setPinAction(pinAction)
        .setPinWebUI(pinWebUI)
        .setShowUpdatedTime(showUpdatedTime)
        .build()

    companion object {
        fun default() = ModulesMenuCompat(
            option = Option.NAME,
            descending = false,
            pinEnabled = false,
            pinAction = false,
            pinWebUI = false,
            showUpdatedTime = true
        )
    }
}