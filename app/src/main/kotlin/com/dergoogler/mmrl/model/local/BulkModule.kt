package com.dergoogler.mmrl.model.local

import com.dergoogler.mmrl.model.online.VersionItem

data class BulkModule(
    val id: String,
    val name: String,
    val versionItem: VersionItem,
)
