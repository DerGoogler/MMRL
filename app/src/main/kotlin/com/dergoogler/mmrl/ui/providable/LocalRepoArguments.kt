package com.dergoogler.mmrl.ui.providable

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.navigation.NavHostController
import dev.dergoogler.mmrl.compat.ext.toDecodedUrl
import java.net.URLDecoder
import java.net.URLEncoder

data class RepoArguments(
    private val repoUrl: String,
    private val repoName: String,
) {
    val url: String
        get() = repoUrl.toDecodedUrl()

    val name: String
        get() = repoName.toDecodedUrl()
}

val LocalRepoArguments = staticCompositionLocalOf<RepoArguments> {
    error("CompositionLocal RepoArguments not present")
}