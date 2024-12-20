package dev.dergoogler.mmrl.compat.impl

import com.topjohnwu.superuser.Shell

internal class KsuNextModuleManagerImpl(
    shell: Shell,
) : KernelSUModuleManagerImpl(shell) {
    override fun hasMagicMount(): Boolean = true
}