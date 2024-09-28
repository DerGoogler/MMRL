package com.dergoogler.mmrl.model.online

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class ModuleNote(
    val title: String? = null,
    val message: String? = null,
) {
    fun isNotEmpty() =
        title.orEmpty().isNotEmpty() || message.orEmpty()
            .isNotEmpty()
}

