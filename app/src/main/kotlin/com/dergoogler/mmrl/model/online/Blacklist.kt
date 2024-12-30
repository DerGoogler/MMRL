package com.dergoogler.mmrl.model.online

import androidx.compose.runtime.Composable
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.squareup.moshi.JsonClass
import dev.dergoogler.mmrl.compat.ext.isNotNullOrBlank
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

@JsonClass(generateAdapter = true)
data class Blacklist(
    val id: String,
    val source: String,
    val notes: String? = null,
    val antifeatures: List<String>? = null,
) {
    val isValid = id.isNotNullOrBlank() && source.isNotNullOrBlank()

    companion object {
        val EMPTY = Blacklist(
            id = "",
            source = "",
            notes = null,
            antifeatures = null,
        )

        @Composable
        inline fun <R> hasBlacklist(blacklist: Blacklist?, block: (Blacklist) -> R): R? =
            if (isBlacklisted(blacklist)) {
                block(blacklist!!)
            } else {
                null
            }


        @Composable
        fun isBlacklisted(blacklist: Blacklist?): Boolean =
            isBlacklisted(LocalUserPreferences.current.blacklistAlerts, blacklist)

        @OptIn(ExperimentalContracts::class)
        fun isBlacklisted(enabled: Boolean, blacklist: Blacklist?): Boolean {
            contract {
                returns(true) implies (blacklist != null)
            }

            return enabled &&
                    blacklist != null &&
                    !(blacklist.antifeatures != null && blacklist.antifeatures.size == 1 && blacklist.antifeatures.contains(
                        "NoSourceSince"
                    )) &&
                    blacklist.isValid
        }
    }
}
