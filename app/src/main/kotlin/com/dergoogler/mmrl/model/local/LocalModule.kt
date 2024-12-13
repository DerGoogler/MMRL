package com.dergoogler.mmrl.model.local

import com.dergoogler.mmrl.utils.Utils
import dev.dergoogler.mmrl.compat.content.LocalModule
import dev.dergoogler.mmrl.compat.content.LocalModuleRunners

typealias LocalModule = LocalModule
typealias LocalModuleRunners = LocalModuleRunners

val LocalModule.versionDisplay get() = Utils.getVersionDisplay(version, versionCode)

val LocalModuleRunners.hasRunners get() = webui || action

fun LocalModule.Companion.example() =
    LocalModule(
        id = "local_example",
        name = "Example",
        version = "2022.08.16",
        versionCode = 1703,
        author = "Sanmer",
        description = "This is an example!",
        updateJson = "",
        state = State.ENABLE,
        runners = LocalModuleRunners(
            webui = false,
            action = false
        ),
        lastUpdated = 0L
    )