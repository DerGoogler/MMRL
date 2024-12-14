package com.dergoogler.mmrl.database.entity

import androidx.room.ColumnInfo
import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.TypeConverters
import com.dergoogler.mmrl.model.online.Manager
import com.dergoogler.mmrl.model.online.ModuleFeatures
import com.dergoogler.mmrl.model.online.ModuleNote
import com.dergoogler.mmrl.model.online.ModuleRoot
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.online.RootManager
import com.dergoogler.mmrl.model.online.TrackJson
import com.squareup.moshi.Json

@Entity(tableName = "onlineModules", primaryKeys = ["id", "repoUrl"])
data class OnlineModuleEntity(
    val id: String,
    val repoUrl: String,
    val name: String,
    val version: String,
    val versionCode: Int,
    val author: String,
    val description: String,

    val maxApi: Int? = null,
    val minApi: Int? = null,

    val size: Int? = null,
    val categories: List<String>? = null,
    val icon: String? = null,
    val homepage: String? = null,
    val donate: String? = null,
    val support: String? = null,
    val cover: String? = null,
    val screenshots: List<String>? = null,
    val license: String? = "",
    val readme: String? = null,
    val require: List<String>? = null,
    val verified: Boolean? = null,

    @Embedded val manager: ManagerEntity? = null,
    @Embedded val root: ModuleRootEntity? = null,
    @Embedded val note: ModuleNoteEntity? = null,
    @Embedded val features: ModuleFeaturesEntity? = null,
    @Embedded val track: TrackJsonEntity,
) {
    constructor(
        original: OnlineModule,
        repoUrl: String,
    ) : this(
        id = original.id,
        repoUrl = repoUrl,
        name = original.name,
        version = original.version,
        versionCode = original.versionCode,
        author = original.author,
        description = original.description,
        track = TrackJsonEntity(original.track),
        note = ModuleNoteEntity(original.note),
        root = ModuleRootEntity(original.root),
        features = ModuleFeaturesEntity(original.features),
        maxApi = original.maxApi,
        minApi = original.minApi,
        size = original.size,
        categories = original.categories,
        icon = original.icon,
        homepage = original.homepage,
        donate = original.donate,
        support = original.support,
        cover = original.cover,
        screenshots = original.screenshots,
        license = original.license,
        readme = original.readme,
        require = original.require,
        verified = original.verified,
        manager = ManagerEntity(original.manager),
    )

    fun toModule() = OnlineModule(
        id = id,
        name = name,
        version = version,
        versionCode = versionCode,
        author = author,
        description = description,
        track = track.toTrack(),
        note = note?.toNote(),
        root = root?.toRoot(),
        features = features?.toFeatures(),
        versions = listOf(),
        maxApi = maxApi,
        minApi = minApi,
        size = size,
        categories = categories,
        icon = icon,
        homepage = homepage,
        donate = donate,
        support = support,
        cover = cover,
        screenshots = screenshots,
        license = license,
        readme = readme,
        require = require,
        verified = verified,
        manager = manager?.toManager(),
    )
}

@Entity(tableName = "track")
@TypeConverters
data class TrackJsonEntity(
    val type: String,
    val added: Float? = 0f,
    val source: String,
    val antifeatures: List<String>? = null,
) {
    constructor(original: TrackJson) : this(
        type = original.type.name,
        added = original.added,
        source = original.source,
        antifeatures = original.antifeatures,
    )

    fun toTrack() = TrackJson(
        typeName = type,
        added = added,
        source = source,
        antifeatures = antifeatures
    )
}

@Entity(tableName = "note")
@TypeConverters
data class ModuleNoteEntity(
    val title: String? = null,
    val message: String? = null,
) {
    constructor(original: ModuleNote?) : this(
        title = original?.title,
        message = original?.message,
    )

    fun toNote() = ModuleNote(
        title = title,
        message = message,
    )
}

@Entity(tableName = "root")
data class ModuleRootEntity(
    val magisk: String? = null,
    val kernelsu: String? = null,
    val apatch: String? = null,
) {
    constructor(original: ModuleRoot?) : this(
        magisk = original?.magisk,
        kernelsu = original?.kernelsu,
        apatch = original?.apatch,
    )

    fun toRoot() = ModuleRoot(
        magisk = magisk,
        kernelsu = kernelsu,
        apatch = apatch,
    )
}

@Entity(tableName = "manager")
data class ManagerEntity(
    @ColumnInfo(name = "magiskManager") val magisk: RootManager? = null,
    @ColumnInfo(name = "kernelsuManager") val kernelsu: RootManager? = null,
    @ColumnInfo(name = "apatchManager") val apatch: RootManager? = null,
) {
    constructor(original: Manager?) : this(
        magisk = original?.magisk,
        kernelsu = original?.kernelsu,
        apatch = original?.apatch,
    )

    fun toManager() = Manager(
        magisk = magisk,
        kernelsu = kernelsu,
        apatch = apatch,
    )
}

@Entity(tableName = "manager_root")
@TypeConverters
data class RootManagerEntity(
    val min: Int? = null,
    val devices: List<String>? = null,
    val arch: List<String>? = null,
    val require: List<String>? = null,
) {
    constructor(original: RootManager?) : this(
        min = original?.min,
        devices = original?.devices,
        arch = original?.arch,
        require = original?.require,
    )

    fun toRoot() = RootManager(
        min = min,
        devices = devices,
        arch = arch,
        require = require,
    )
}

@Entity(tableName = "root")
@TypeConverters
data class ModuleFeaturesEntity(
    val service: Boolean? = false,
    @Json(name = "post_fs_data") val postFsData: Boolean? = false,
    val resetprop: Boolean? = false,
    val sepolicy: Boolean? = false,
    val zygisk: Boolean? = false,
    val apks: Boolean? = false,
    val webroot: Boolean? = false,
    @Json(name = "post_mount") val postMount: Boolean? = false,
    @Json(name = "boot_completed") val bootCompleted: Boolean? = false,
    val action: Boolean? = false,
) {
    constructor(original: ModuleFeatures?) : this(
        service = original?.service,
        postFsData = original?.postFsData,
        resetprop = original?.resetprop,
        sepolicy = original?.sepolicy,
        zygisk = original?.zygisk,
        apks = original?.apks,
        webroot = original?.webroot,
        postMount = original?.postMount,
        bootCompleted = original?.bootCompleted,
        action = original?.action,
    )

    fun toFeatures() = ModuleFeatures(
        service = service,
        postFsData = postFsData,
        resetprop = resetprop,
        sepolicy = sepolicy,
        zygisk = zygisk,
        apks = apks,
        webroot = webroot,
        postMount = postMount,
        bootCompleted = bootCompleted,
        action = action
    )
}