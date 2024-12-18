package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback
import dev.dergoogler.mmrl.compat.stub.IShellCallback

internal class KernelSUModuleManagerImpl(
    shell: Shell,
) : BaseModuleManagerImpl(shell) {
    override fun getManagerName(): String {
        return "KernelSU"
    }

    override fun hasMagicMount(): Boolean = false
    
    override fun enable(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) callback.onFailure(id, null)

        if (useShell) {
            "ksud module enable $id".submit {
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
            "ksud module disable $id".submit {
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
            "ksud module uninstall $id".submit {
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
                "export KSU=true",
                "export KSU_VER=${version}",
                "export KSU_VER_CODE=${versionCode}",
                "busybox sh /data/adb/modules/$modId/action.sh"
            )

            action(
                cmd = cmds,
                callback = callback
            )
        } else {
            action(
                cmd = arrayOf("ksud module action $modId"),
                callback = callback
            )
        }
    }

    override fun install(path: String, bulkModules: List<BulkModule>, callback: IShellCallback) {
        install(
            cmd = "ksud module install '${path}'",
            path = path,
            bulkModules = bulkModules,
            callback = callback
        )
    }
}