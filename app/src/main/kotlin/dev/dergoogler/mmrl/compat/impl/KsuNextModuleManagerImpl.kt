package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell
import dev.dergoogler.mmrl.compat.content.ModuleCompatibility
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback
import dev.dergoogler.mmrl.compat.stub.IShell
import dev.dergoogler.mmrl.compat.stub.IShellCallback

internal class KsuNextModuleManagerImpl(
    shell: Shell,
    seLinuxContext: String,
) : KernelSUModuleManagerImpl(
    shell, seLinuxContext
) {
    override fun getModuleCompatibility() = ModuleCompatibility(
        hasMagicMount = false,
        canRestoreModules = true
    )

    override fun enable(id: String, useShell: Boolean, callback: IModuleOpsCallback) {
        val dir = modulesDir.resolve(id)
        if (!dir.exists()) callback.onFailure(id, null)

        if (useShell) {
            "ksud module restore $id && ksud module enable $id".submit {
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


    override fun action(modId: String, legacy: Boolean, callback: IShellCallback): IShell =
        if (legacy) {
            val cmds = arrayOf(
                "export ASH_STANDALONE=1",
                "export KSU=true",
                "export KSU_NEXT=true",
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
