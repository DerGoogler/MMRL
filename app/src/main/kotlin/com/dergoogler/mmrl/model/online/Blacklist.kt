package com.dergoogler.mmrl.model.online

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Blacklist(
    val id: String,
    val source: String,
    val notes: String? = null,
    val antifeatures: List<String>? = null,
)
