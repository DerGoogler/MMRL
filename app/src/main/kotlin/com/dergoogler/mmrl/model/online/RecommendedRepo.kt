package com.dergoogler.mmrl.model.online

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class RecommendedRepo(
    val name: String,
    val url: String,
)
