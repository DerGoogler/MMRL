package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.stub.IInstallCallback
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback

internal class APatchModuleManagerImpl(
    private val shell: Shell,
) : BaseModuleManagerImpl(shell) {
    override fun enable(id: String, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) callback.onFailure(id, null)

        "apd module enable $id".submit {
            if (it.isSuccess) {
                callback.onSuccess(id)
            } else {
                callback.onFailure(id, it.out.joinToString())
            }
        }
    }

    override fun disable(id: String, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) return callback.onFailure(id, null)

        "apd module disable $id".submit {
            if (it.isSuccess) {
                callback.onSuccess(id)
            } else {
                callback.onFailure(id, it.out.joinToString())
            }
        }
    }

    override fun remove(id: String, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) return callback.onFailure(id, null)

        "apd module uninstall $id".submit {
            if (it.isSuccess) {
                callback.onSuccess(id)
            } else {
                callback.onFailure(id, it.out.joinToString())
            }
        }
    }

    override fun install(path: String, callback: IInstallCallback) {
        install(
            cmd = "apd module install '${path}'",
            path = path,
            callback = callback
        )
    }
}