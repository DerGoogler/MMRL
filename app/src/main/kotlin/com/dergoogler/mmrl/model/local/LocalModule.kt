package com.dergoogler.mmrl.model.local

import com.dergoogler.mmrl.utils.Utils
import dev.dergoogler.mmrl.compat.content.LocalModule
import dev.dergoogler.mmrl.compat.content.LocalModuleFeatures

typealias LocalModule = LocalModule
typealias LocalModuleFeatures = LocalModuleFeatures

val LocalModule.versionDisplay get() = Utils.getVersionDisplay(version, versionCode)

val LocalModuleFeatures.hasFeatures
    get() = webui ||
            action ||
            service ||
            postFsData ||
            resetprop ||
            sepolicy ||
            zygisk ||
            apks ||
            postMount ||
            bootCompleted


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
        features = LocalModuleFeatures.EMPTY,
        size = 0,
        lastUpdated = 0L
    )