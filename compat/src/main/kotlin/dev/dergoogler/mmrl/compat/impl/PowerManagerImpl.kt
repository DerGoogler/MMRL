package dev.dergoogler.mmrl.compat.impl

import dev.dergoogler.mmrl.compat.stub.IPowerManager

internal class PowerManagerImpl(
    private val original: IPowerManager
) : IPowerManager.Stub() {
    override fun reboot(confirm: Boolean, reason: String?, wait: Boolean) {
        original.reboot(confirm, reason, wait)
    }
}