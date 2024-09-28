package dev.dergoogler.mmrl.compat.impl

import android.content.Context
//import android.os.IPowerManager // what huh?
import android.os.SELinux
import android.os.ServiceManager
import android.system.Os
import com.topjohnwu.superuser.Shell
import com.topjohnwu.superuser.ShellUtils
import dev.dergoogler.mmrl.compat.stub.IFileManager
import dev.dergoogler.mmrl.compat.stub.IModuleManager
import dev.dergoogler.mmrl.compat.stub.IPowerManager
import dev.dergoogler.mmrl.compat.stub.IServiceManager
import kotlin.system.exitProcess

internal class ServiceManagerImpl : IServiceManager.Stub() {
    private val main by lazy {
        Shell.Builder.create()
            .build("sh")
    }

    private val platform by lazy {
        when {
            "which magisk".execResult() -> Platform.Magisk
            "which ksud".execResult() -> Platform.KernelSU
            "which apd".execResult() -> Platform.APatch
            else -> throw IllegalArgumentException("unsupported platform: $seLinuxContext")
        }
    }

    private val moduleManager by lazy {
        when (platform) {
            Platform.Magisk -> MagiskModuleManagerImpl(main)
            Platform.KernelSU -> KernelSUModuleManagerImpl(main)
            Platform.APatch -> APatchModuleManagerImpl(main)
        }
    }

    private val fileManager by lazy {
        FileManagerImpl()
    }

    private val powerManager by lazy {
        PowerManagerImpl(
            IPowerManager.Stub.asInterface(
                ServiceManager.getService(Context.POWER_SERVICE)
            )
        )
    }

    override fun getUid(): Int {
        return Os.getuid()
    }

    override fun getPid(): Int {
        return Os.getpid()
    }

    override fun getSELinuxContext(): String {
        return SELinux.getContext()
    }

    override fun currentPlatform(): String {
        return platform.name
    }

    override fun getModuleManager(): IModuleManager {
        return moduleManager
    }

    override fun getFileManager(): IFileManager {
        return fileManager
    }

    override fun getPowerManager(): IPowerManager {
        return powerManager
    }

    override fun destroy() {
        exitProcess(0)
    }

    private fun String.execResult() = ShellUtils.fastCmdResult(main, this)
}