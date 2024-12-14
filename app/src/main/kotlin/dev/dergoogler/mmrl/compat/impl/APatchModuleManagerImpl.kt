package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.stub.IInstallCallback
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback

internal class APatchModuleManagerImpl(
    private val shell: Shell,
) : BaseModuleManagerImpl(shell) {
    override fun getManagerName(): String {
        return "APatch"
    }

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

    override fun install(path: String, bulkModules: List<BulkModule>, callback: IInstallCallback) {
        install(
            cmd = "apd module install '${path}'",
            path = path,
            bulkModules = bulkModules,
            callback = callback
        )
    }
}