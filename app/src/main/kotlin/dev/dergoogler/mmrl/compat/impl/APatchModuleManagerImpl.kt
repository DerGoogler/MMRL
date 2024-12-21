package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback
import dev.dergoogler.mmrl.compat.stub.IShellCallback

internal class APatchModuleManagerImpl(
    shell: Shell,
    seLinuxContext: String,
    private val fileManager: FileManagerImpl,
) : BaseModuleManagerImpl(
    shell, seLinuxContext
) {
    override fun getManagerName(): String {
        return "APatch"
    }

    override fun hasMagicMount(): Boolean =
        fileManager.exists("/data/adb/.bind_mount_enable") && (versionCode >= 11011 && !fileManager.exists(
            "/data/adb/.overlay_enable"
        ))

    override fun enable(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) callback.onFailure(id, null)

        if (useShell) {
            "apd module enable $id".submit {
                if (it.isSuccess) {
                    callback.onSuccess(id)
                } else {
                    callback.onFailure(id, it.out.joinToString())
                }
            }
        } else {
            runCatching {
                dir.resolve("remove").apply { if (exists()) delete() }
                dir.resolve("disable").apply { if (exists()) delete() }
            }.onSuccess {
                callback.onSuccess(id)
            }.onFailure {
                callback.onFailure(id, it.message)
            }
        }
    }

    override fun disable(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) return callback.onFailure(id, null)

        if (useShell) {
            "apd module disable $id".submit {
                if (it.isSuccess) {
                    callback.onSuccess(id)
                } else {
                    callback.onFailure(id, it.out.joinToString())
                }
            }
        } else {
            runCatching {
                dir.resolve("remove").apply { if (exists()) delete() }
                dir.resolve("disable").createNewFile()
            }.onSuccess {
                callback.onSuccess(id)
            }.onFailure {
                callback.onFailure(id, it.message)
            }
        }
    }

    override fun remove(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) return callback.onFailure(id, null)

        if (useShell) {
            "apd module uninstall $id".submit {
                if (it.isSuccess) {
                    callback.onSuccess(id)
                } else {
                    callback.onFailure(id, it.out.joinToString())
                }
            }
        } else {
            runCatching {
                dir.resolve("disable").apply { if (exists()) delete() }
                dir.resolve("remove").createNewFile()
            }.onSuccess {
                callback.onSuccess(id)
            }.onFailure {
                callback.onFailure(id, it.message)
            }
        }
    }

    override fun action(modId: String, legacy: Boolean, callback: IShellCallback) {
        if (legacy) {
            val cmds = arrayOf(
                "export ASH_STANDALONE=1",
                "export APATCH=true",
                "export APATCH_VER=${version}",
                "export APATCH_VER_CODE=${versionCode}",
                "busybox sh /data/adb/modules/$modId/action.sh"
            )

            action(
                cmd = cmds,
                callback = callback
            )
        } else {
            action(
                cmd = arrayOf("apd module action $modId"),
                callback = callback
            )
        }
    }

    override fun install(path: String, bulkModules: List<BulkModule>, callback: IShellCallback) {
        install(
            cmd = "apd module install '${path}'",
            path = path,
            bulkModules = bulkModules,
            callback = callback
        )
    }
}