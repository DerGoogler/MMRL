package com.dergoogler.mmrl.model.online

import com.dergoogler.mmrl.utils.Utils
import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class VersionItem(
    @Json(ignore = true) val repoUrl: String = "",
    val timestamp: Float,
    val version: String,
    val versionCode: Int,
    val zipUrl: String,
    val size: Int? = null,
    val changelog: String = ""
) {
    val versionDisplay get() = Utils.getVersionDisplay(version, versionCode)
    val hasSize = size != null
}