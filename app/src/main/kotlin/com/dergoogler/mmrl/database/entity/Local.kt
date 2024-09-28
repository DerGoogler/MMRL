package com.dergoogler.mmrl.database.entity

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.State

@Entity(tableName = "localModules")
data class LocalModuleEntity(
    @PrimaryKey val id: String,
    val name: String,
    val version: String,
    val versionCode: Int,
    val author: String,
    val description: String,
    val state: String,
    val updateJson: String,
    val lastUpdated: Long
) {
    constructor(original: LocalModule) : this(
        id = original.id,
        name = original.name,
        version = original.version,
        versionCode = original.versionCode,
        author = original.author,
        description = original.description,
        state = original.state.name,
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
        lastUpdated = lastUpdated
    )
}

@Entity(tableName = "localModules_updatable")
data class LocalModuleUpdatable(
    @PrimaryKey val id: String,
    val updatable: Boolean
)