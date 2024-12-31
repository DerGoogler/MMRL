package com.dergoogler.mmrl.ui.providable

import androidx.compose.runtime.staticCompositionLocalOf
import dev.dergoogler.mmrl.compat.ext.toDecodedUrl

data class ModuleArguments(
    private val moduleId: String,
    private val repoUrl: String,
) {
    val id: String
        get() = moduleId.toDecodedUrl()

    /**
     * # REPO URL!
     */
    val url: String
        get() = repoUrl.toDecodedUrl()
}

val LocalModuleArguments = staticCompositionLocalOf<ModuleArguments> {
    error("CompositionLocal ModuleArguments not present")
}