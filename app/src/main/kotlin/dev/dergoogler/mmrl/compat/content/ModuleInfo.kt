package dev.dergoogler.mmrl.compat.content

import android.os.Parcelable
import kotlinx.parcelize.Parcelize


@Parcelize
data class ModuleInfo(
    val totalFolders: Int,
    val foldersWithServiceFiles: Int,
    val disabledModules: Int,
    val updatableModules: Int,
    val disabledModulesList: List<String>,
    val updatableModulesList: List<String>
) : Parcelable {
    companion object
}