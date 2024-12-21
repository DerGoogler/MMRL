package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell

internal class KsuNextModuleManagerImpl(
    shell: Shell,
    seLinuxContext: String,
) : KernelSUModuleManagerImpl(
    shell, seLinuxContext
) {
    override fun hasMagicMount(): Boolean = true
}