package dev.dergoogler.mmrl.compat.content

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class LocalModuleRunners(
    val webui: Boolean,
    val action: Boolean
) : Parcelable {
    companion object
}

@Parcelize
data class LocalModule(
    val id: String,
    val name: String,
    val version: String,
    val versionCode: Int,
    val author: String,
    val description: String,
    val updateJson: String,
    val state: State,
    val runners: LocalModuleRunners,
    val lastUpdated: Long
) : Parcelable {
    companion object
}