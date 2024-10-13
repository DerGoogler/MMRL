package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.stub.IInstallCallback
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback

internal class KernelSUModuleManagerImpl(
    private val shell: Shell,
) : BaseModuleManagerImpl(shell) {
    override fun getManagerName(): String {
        return "KernelSU"
    }

    override fun enable(id: String, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) callback.onFailure(id, null)

        "ksud module enable $id".submit {
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

        "ksud module disable $id".submit {
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

        "ksud module uninstall $id".submit {
            if (it.isSuccess) {
                callback.onSuccess(id)
            } else {
                callback.onFailure(id, it.out.joinToString())
            }
        }
    }

    override fun install(path: String, callback: IInstallCallback) {
        install(
            cmd = "ksud module install '${path}'",
            path = path,
            callback = callback
        )
    }
}