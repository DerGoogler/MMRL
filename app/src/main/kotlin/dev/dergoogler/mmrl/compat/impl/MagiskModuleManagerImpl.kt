package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback
import dev.dergoogler.mmrl.compat.stub.IShellCallback

internal class MagiskModuleManagerImpl(
    private val shell: Shell,
) : BaseModuleManagerImpl(shell) {
    override fun getManagerName(): String {
        return "Magisk"
    }


    override fun enable(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) callback.onFailure(id, null)

        runCatching {
            dir.resolve("remove").apply { if (exists()) delete() }
            dir.resolve("disable").apply { if (exists()) delete() }
        }.onSuccess {
            callback.onSuccess(id)
        }.onFailure {
            callback.onFailure(id, it.message)
        }
    }

    override fun disable(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) return callback.onFailure(id, null)

        runCatching {
            dir.resolve("remove").apply { if (exists()) delete() }
            dir.resolve("disable").createNewFile()
        }.onSuccess {
            callback.onSuccess(id)
        }.onFailure {
            callback.onFailure(id, it.message)
        }
    }

    override fun remove(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) return callback.onFailure(id, null)

        runCatching {
            dir.resolve("disable").apply { if (exists()) delete() }
            dir.resolve("remove").createNewFile()
        }.onSuccess {
            callback.onSuccess(id)
        }.onFailure {
            callback.onFailure(id, it.message)
        }
    }

    override fun action(modId: String, legacy: Boolean, callback: IShellCallback) {
        val cmds = arrayOf(
            "sh /data/adb/modules/$modId/action.sh"
        )

        action(
            cmd = cmds,
            callback = callback
        )
    }

    override fun install(path: String, bulkModules: List<BulkModule>, callback: IShellCallback) {
        install(
            cmd = "magisk --install-module '${path}'",
            path = path,
            bulkModules = bulkModules,
            callback = callback
        )
    }
}