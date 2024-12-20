package dev.dergoogler.mmrl.compat.impl

//import android.os.IPowerManager // what huh?
import android.os.SELinux
import android.system.Os
import com.topjohnwu.superuser.Shell
import com.topjohnwu.superuser.ShellUtils
import dev.dergoogler.mmrl.compat.stub.IFileManager
import dev.dergoogler.mmrl.compat.stub.IModuleManager
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
            "`which kusd` | grep -qE \"KernelSU-Next|KernelSU Next\" && exit 0 || exit 1".execResult() -> Platform.KsuNext
            "which apd".execResult() -> Platform.APatch
            else -> throw IllegalArgumentException("unsupported platform: $seLinuxContext")
        }
    }

    private val fileManager by lazy {
        FileManagerImpl()
    }

    private val moduleManager by lazy {
        when (platform) {
            Platform.Magisk -> MagiskModuleManagerImpl(main)
            Platform.KernelSU -> KernelSUModuleManagerImpl(main)
            Platform.KsuNext -> KsuNextModuleManagerImpl(main)
            Platform.APatch -> APatchModuleManagerImpl(main, fileManager)
        }
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
        return platform.name.lowercase()
    }

    override fun getModuleManager(): IModuleManager {
        return moduleManager
    }

    override fun getFileManager(): IFileManager {
        return fileManager
    }

    override fun destroy() {
        exitProcess(0)
    }

    private fun String.execResult() = ShellUtils.fastCmdResult(main, this)
}