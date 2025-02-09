package com.dergoogler.mmrl.model.online

import android.content.Context
import com.dergoogler.mmrl.R
import com.squareup.moshi.JsonClass
import dev.dergoogler.mmrl.compat.ext.toDollars

@JsonClass(generateAdapter = true)
data class Sponsor(
    val login: String,
    val avatarUrl: String,
    val url: String,
    val amount: Int,
) {
    fun toMember(context: Context) = ExploreRepositoryMember(
        avatar = avatarUrl,
        name = login,
        title = context.getString(R.string.in_total, amount.toDollars()),
        links = listOf(
            SocialLink(
                icon = "github",
                link = url,
            )
        )
    )
}
