package com.dergoogler.mmrl.model.json

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class License(
    val licenseText: String,
    val name: String,
    val licenseId: String,
    val seeAlso: List<String>,
    val isOsiApproved: Boolean,
    val isFsfLibre: Boolean = false,
) {
    fun hasLabel() = isFsfLibre || isOsiApproved
}
