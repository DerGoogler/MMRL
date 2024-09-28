package com.dergoogler.mmrl.model.state

import androidx.compose.runtime.Immutable
import com.dergoogler.mmrl.database.entity.Repo
import com.dergoogler.mmrl.database.entity.RepoMetadata

@Immutable
data class RepoState(
    val url: String,
    val name: String,
    val enable: Boolean,
    val compatible: Boolean,
    val version: Int,
    val timestamp: Float,
    val submission: String? = null,
    val website: String? = null,
    val donate: String? = null,
    val support: String? = null,
    val size: Int
) {
    constructor(repo: Repo) : this(
        url = repo.url,
        name = repo.name,
        enable = repo.enable,
        compatible = repo.isCompatible,
        version = repo.metadata.version,
        timestamp = repo.metadata.timestamp,
        website = repo.website,
        support = repo.support,
        submission = repo.submission,
        donate = repo.donate,
        size = repo.metadata.size
    )

    fun toRepo() = Repo(
        url = url,
        name = name,
        enable = enable,
        website = website,
        support = support,
        submission = submission,
        donate = donate,
        metadata = RepoMetadata(
            version = version,
            timestamp = timestamp,
            size = size
        )
    )
}