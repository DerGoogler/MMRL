package dev.dergoogler.mmrl.compat.content

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class LocalModuleFeatures(
    val webui: Boolean,
    val action: Boolean,
    val service: Boolean,
    val postFsData: Boolean,
    val resetprop: Boolean,
    val sepolicy: Boolean,
    val zygisk: Boolean,
    val apks: Boolean,
    val postMount: Boolean,
    val bootCompleted: Boolean,
) : Parcelable {
    companion object {
        val EMPTY = LocalModuleFeatures(
            webui = false,
            action = false,
            service = false,
            postFsData = false,
            resetprop = false,
            sepolicy = false,
            zygisk = false,
            apks = false,
            postMount = false,
            bootCompleted = false,
        )
    }

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
    val size: Long,
    val features: LocalModuleFeatures,
    val lastUpdated: Long,
) : Parcelable {
    companion object
}