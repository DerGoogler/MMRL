package dev.dergoogler.mmrl.compat.delegate

import android.os.Build
import android.os.PowerManagerHidden
import androidx.annotation.RequiresApi
import dev.dergoogler.mmrl.compat.BuildCompat
import dev.dergoogler.mmrl.compat.stub.IPowerManager

class PowerManagerDelegate(
    private val powerManager: IPowerManager
) {
    fun reboot(reason: Reason = Reason.UserRequested) {
        powerManager.reboot(false, reason.reason, true)
    }

    enum class Reason(
        internal val reason: String
    ) {
        UserRequested(SHUTDOWN_USER_REQUESTED),
        @RequiresApi(Build.VERSION_CODES.R)
        Userspace(REBOOT_USERSPACE),
        Recovery(REBOOT_RECOVERY),
        Bootloader(REBOOT_BOOTLOADER)
    }

    companion object {
        const val SHUTDOWN_USER_REQUESTED = "userrequested"

        @RequiresApi(Build.VERSION_CODES.R)
        const val REBOOT_USERSPACE = "userspace"

        const val REBOOT_RECOVERY = "recovery"

        const val REBOOT_BOOTLOADER = "bootloader"

        fun isRebootingUserspaceSupported() =
            BuildCompat.atLeastR && PowerManagerHidden.isRebootingUserspaceSupportedImpl()
    }
}