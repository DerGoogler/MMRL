package com.dergoogler.mmrl.model.online

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Sponsor(
    val login: String,
    val avatarUrl: String,
    val url: String,
)