package com.dergoogler.mmrl.model.online

import com.squareup.moshi.JsonClass
import dev.dergoogler.mmrl.compat.ext.isNotNullOrBlank
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

@JsonClass(generateAdapter = true)
data class ModuleNote(
    val title: String? = null,
    val message: String? = null,
) {
    val hasTitle = title.isNotNullOrBlank()
    val hasMessage = message.isNotNullOrBlank()
    val isDeprecated = title.orEmpty().lowercase() == "deprecated"

    fun isNotEmpty() =
        title.isNotNullOrBlank() || message.isNotNullOrBlank()
}


inline fun <R> ModuleNote?.hasValidMessage(block: (ModuleNote) -> R): R? {
    if (this != null && isNotEmpty()) {
        return block(this)
    }

    return null
}