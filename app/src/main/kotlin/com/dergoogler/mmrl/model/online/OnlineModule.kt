package com.dergoogler.mmrl.model.online

import com.dergoogler.mmrl.utils.Utils
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class OnlineModule(
    val id: String,
    val name: String,
    val version: String,
    val versionCode: Int,
    val author: String,
    val description: String,
    val track: TrackJson,
    val versions: List<VersionItem>,

    val maxApi: Int? = null,
    val minApi: Int? = null,

    val size: Int? = null,
    val categories: List<String>? = null,
    val icon: String? = null,
    val homepage: String? = null,
    val donate: String? = null,
    val support: String? = null,
    val cover: String? = null,
    val screenshots: List<String>? = null,
    val license: String? = "",
    val readme: String? = null,
    val require: List<String>? = null,
    val verified: Boolean? = null,

    val root: ModuleRoot? =null,
    val note: ModuleNote? = null,
    val features: ModuleFeatures? = null
) {
    val versionDisplay get() = Utils.getVersionDisplay(version, versionCode)
    val hasLicense
        get() = license.orEmpty().isNotBlank()
                && license.orEmpty().uppercase() != "UNKNOWN"

    val hasRequire = require.orEmpty().isNotEmpty()
    val hasIcon = icon.orEmpty().isNotEmpty()
    val hasHomepage = homepage.orEmpty().isNotEmpty()
    val hasDonate = donate.orEmpty().isNotEmpty()
    val hasSupport = support.orEmpty().isNotEmpty()
    val hasCover = cover.orEmpty().isNotEmpty()
    val hasScreenshots = screenshots.orEmpty().isNotEmpty()
    val hasRoot = root != null
    val hasNote = note != null
    val hasReadme = readme.orEmpty().isNotEmpty()
    val hasCategories = categories.orEmpty().isNotEmpty()
    val hasMaxApi = maxApi != null
    val hasMinApi = minApi != null
    val hasSize = size != null
    val isVerified = verified != null && verified


    override fun equals(other: Any?): Boolean {
        return when (other) {
            is OnlineModule -> id == other.id
            else -> false
        }
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    companion object {
        fun example() = OnlineModule(
            id = "online_example",
            name = "Example",
            version = "2022.08.16",
            versionCode = 1703,
            author = "Sanmer",
            description = "This is an example!",
            license = "GPL-3.0",
            track = TrackJson(
                typeName = "ONLINE_JSON",
                added = 0f,
                antifeatures = emptyList()
            ),
            versions = emptyList()
        )
    }
}