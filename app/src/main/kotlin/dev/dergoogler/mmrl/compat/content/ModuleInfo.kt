package dev.dergoogler.mmrl.compat.content

import android.os.Parcelable
import kotlinx.parcelize.Parcelize


@Parcelize
data class ModuleInfo(
    val totalModules: Int,
    val modulesWithServiceFiles: Int,
    val disabledModules: Int,
    val updatableModules: Int,
    val enabledModules: Int,
    val disabledModulesList: List<String>,
    val updatedModulesList: List<String>
) : Parcelable {
    companion object
}