package com.dergoogler.mmrl.database.entity.local

import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.State
import dev.dergoogler.mmrl.compat.content.LocalModuleFeatures


@Entity(tableName = "localModules")
@TypeConverters
data class LocalModuleEntity(
    @PrimaryKey val id: String,
    val name: String,
    val version: String,
    val versionCode: Int,
    val author: String,
    val description: String,
    val state: String,
    val size: Long,
    @Embedded val features: LocalModuleFeatures,
    val updateJson: String,
    val lastUpdated: Long,
) {
    constructor(original: LocalModule) : this(
        id = original.id,
        name = original.name,
        version = original.version,
        versionCode = original.versionCode,
        author = original.author,
        description = original.description,
        state = original.state.name,
        features = original.features,
        size = original.size,
        updateJson = original.updateJson,
        lastUpdated = original.lastUpdated
    )

    fun toModule() = LocalModule(
        id = id,
        name = name,
        version = version,
        versionCode = versionCode,
        author = author,
        description = description,
        updateJson = updateJson,
        state = State.valueOf(state),
        features = features,
        size = size,
        lastUpdated = lastUpdated
    )
}

@Entity(tableName = "localModules_updatable")
data class LocalModuleUpdatable(
    @PrimaryKey val id: String,
    val updatable: Boolean,
)