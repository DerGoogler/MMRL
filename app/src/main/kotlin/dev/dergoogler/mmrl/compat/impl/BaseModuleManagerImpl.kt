package dev.dergoogler.mmrl.compat.impl

//import java.util.zip.ZipFile
import android.os.Build
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.Compat
import com.topjohnwu.superuser.CallbackList
import com.topjohnwu.superuser.Shell
import com.topjohnwu.superuser.ShellUtils
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.content.LocalModule
import dev.dergoogler.mmrl.compat.content.LocalModuleFeatures
import dev.dergoogler.mmrl.compat.content.ModuleCompatibility
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.stub.IFileManager
import dev.dergoogler.mmrl.compat.stub.IModuleManager
import dev.dergoogler.mmrl.compat.stub.IShell
import dev.dergoogler.mmrl.compat.stub.IShellCallback
import org.apache.commons.compress.archivers.zip.ZipFile
import java.io.File

internal abstract class BaseModuleManagerImpl(
    private val shell: Shell,
    private val seLinuxContext: String,
    private val fileManager: IFileManager
) : IModuleManager.Stub() {
    internal val modulesDir = File(MODULES_PATH)

    private val mVersion by lazy {
        runCatching {
            "su -v".exec()
        }.getOrDefault("unknown")
    }

    private val mVersionCode by lazy {
        runCatching {
            "su -V".exec().toInt()
        }.getOrDefault(-1)
    }

    override fun getManagerName(): String {
        return "Unknown"
    }

    override fun getVersion(): String {
        return mVersion
    }

    override fun getVersionCode(): Int {
        return mVersionCode
    }

    override fun getModuleCompatibility() = ModuleCompatibility(
        hasMagicMount = false,
        canRestoreModules = true
    )

    override fun getSeLinuxContext(): String = seLinuxContext

    override fun reboot(reason: String) {
        if (reason == "recovery") {
            "/system/bin/input keyevent 26".exec()
        }

        "/system/bin/svc power reboot $reason || /system/bin/reboot $reason".exec()
    }

    override fun getModules() = modulesDir.listFiles()
        .orEmpty()
        .mapNotNull { dir ->
            readProps(dir)?.toModule(dir)
        }

    private fun hasWebUI(id: String): Boolean {
        val moduleDir = modulesDir.resolve(id)
        val webroot = moduleDir.resolve(WEBROOT_PATH)
        return webroot.exists() && webroot.isDirectory
    }

    private fun hasFeature(type: String, id: String): Boolean {
        val moduleDir = modulesDir.resolve(id)
        val feature = moduleDir.resolve(type)
        return feature.exists() && feature.isFile
    }

    override fun getModuleById(id: String): LocalModule? {
        val dir = modulesDir.resolve(id)
        return readProps(dir)?.toModule(dir)
    }

    override fun getModuleInfo(zipPath: String): LocalModule? {
        val zipFile = ZipFile.Builder().setFile(zipPath).get()
        val entry = zipFile.getEntry(PROP_FILE) ?: return null

        return zipFile.getInputStream(entry).use {
            it.bufferedReader()
                .readText()
                .let(::readProps)
                .toModule()
        }
    }

    private fun readProps(props: String) = props.lines()
        .associate { line ->
            val items = line.split("=", limit = 2).map { it.trim() }
            if (items.size != 2) {
                "" to ""
            } else {
                items[0] to items[1]
            }
        }

    private fun readProps(moduleDir: File) =
        moduleDir.resolve(PROP_FILE).let {
            when {
                it.exists() -> readProps(it.readText())
                else -> null
            }
        }

    private fun readState(moduleDir: File): State {
        moduleDir.resolve("remove").apply {
            if (exists()) return State.REMOVE
        }

        moduleDir.resolve("disable").apply {
            if (exists()) return State.DISABLE
        }

        moduleDir.resolve("update").apply {
            if (exists()) return State.UPDATE
        }

        return State.ENABLE
    }

    private fun readLastUpdated(moduleDir: File): Long {
        MODULE_FILES.forEach { filename ->
            val file = moduleDir.resolve(filename)
            if (file.exists()) {
                return file.lastModified()
            }
        }

        return 0L
    }

    private fun Map<String, String>.toModule(
        dir: File,
    ): LocalModule {
        val id = getOrDefault("id", dir.name)

        return toModule(
            path = dir.name,
            state = readState(dir),
            features = LocalModuleFeatures(
                webui = hasWebUI(id),
                action = hasFeature(ACTION_FILE, id),
                service = hasFeature(SERVICE_FILE, id),
                postFsData = hasFeature(POST_FS_DATA_FILE, id),
                postMount = hasFeature(POST_MOUNT_FILE, id),
                resetprop = hasFeature(SYSTEM_PROP_FILE, id),
                bootCompleted = hasFeature(BOOT_COMPLETED_FILE, id),
                sepolicy = hasFeature(SE_POLICY, id),
                zygisk = false,
                apks = false
            ),
            size = fileManager.sizeRecursive(dir.path),
            lastUpdated = readLastUpdated(dir)
        )
    }

    private fun Map<String, String>.toModule(
        path: String = "unknown",
        state: State = State.ENABLE,
        lastUpdated: Long = 0L,
        size: Long = 0L,
        features: LocalModuleFeatures = LocalModuleFeatures.EMPTY,
    ) = LocalModule(
        id = getOrDefault("id", path),
        name = getOrDefault("name", path),
        version = getOrDefault("version", ""),
        versionCode = getOrDefault("versionCode", "-1").toIntOr(-1),
        author = getOrDefault("author", ""),
        description = getOrDefault("description", ""),
        updateJson = getOrDefault("updateJson", ""),
        state = state,
        features = features,
        size = size,
        lastUpdated = lastUpdated
    )

    private fun String.toIntOr(defaultValue: Int) =
        runCatching {
            toInt()
        }.getOrDefault(defaultValue)

    private fun String.exec() = ShellUtils.fastCmd(shell, this)

    internal fun install(
        cmd: String,
        path: String,
        bulkModules: List<BulkModule>,
        callback: IShellCallback,
    ): IShell {
        val cmds = listOf(
            "export MMRL=true",
            "export MMRL_VER=${BuildConfig.VERSION_NAME}",
            "export MMRL_VER_CODE=${BuildConfig.VERSION_CODE}",
            "export BULK_MODULES=\"${bulkModules.joinToString(" ") { it.id }}\"",
            cmd
        )

        val module = getModuleInfo(path)

        return getShell(cmds, module, callback)
    }

    internal fun action(cmd: Array<String>, callback: IShellCallback): IShell {
        val cmds = listOf(
            "export PATH=/data/adb/ap/bin:/data/adb/ksu/bin:/data/adb/magisk:\$PATH",
            "export MMRL=true",
            "export MMRL_VER=${BuildConfig.VERSION_NAME}",
            "export MMRL_VER_CODE=${BuildConfig.VERSION_CODE}",
            "export BOOTMODE=true",
            "export ARCH=${Build.SUPPORTED_ABIS[0]}",
            "export API=${Build.VERSION.SDK_INT}",
            "export IS64BIT=${Build.SUPPORTED_64_BIT_ABIS.isNotEmpty()}",
            *cmd
        )

        return this.getShell(cmds, null, callback)
    }

    override fun getShell(
        command: List<String>,
        module: LocalModule?,
        callback: IShellCallback,
    ): IShell =
        object : IShell.Stub() {
            val main = Compat.createRootShell()

            override fun isAlive(): Boolean = main.isAlive

            override fun exec() {
                val stdout = object : CallbackList<String?>() {
                    override fun onAddElement(msg: String?) {
                        msg?.let(callback::onStdout)
                    }
                }

                val stderr = object : CallbackList<String?>() {
                    override fun onAddElement(msg: String?) {
                        msg?.let(callback::onStderr)
                    }
                }

                val result = main.newJob().add(*command.toTypedArray()).to(stdout, stderr).exec()
                if (result.isSuccess) {
                    callback.onSuccess(module)
                } else {
                    callback.onFailure()
                }
            }

            override fun close() {
                main.close()
            }
        }

    internal fun String.submit(cb: Shell.ResultCallback) = shell
        .newJob().add(this).to(ArrayList(), null)
        .submit(cb)

    companion object {
        const val PROP_FILE = "module.prop"
        const val WEBROOT_PATH = "webroot"
        const val MODULES_PATH = "/data/adb/modules"

        const val ACTION_FILE = "action.sh"
        const val BOOT_COMPLETED_FILE = "boot-completed.sh"
        const val SERVICE_FILE = "service.sh"
        const val POST_FS_DATA_FILE = "post-fs-data.sh"
        const val POST_MOUNT_FILE = "post-mount.sh"
        const val SYSTEM_PROP_FILE = "system.prop"
        const val SE_POLICY = "sepolicy.rule"


        val MODULE_SERVICE_FILES = listOf(
            ACTION_FILE,
            SERVICE_FILE,
            POST_FS_DATA_FILE,
            POST_MOUNT_FILE,
            WEBROOT_PATH,
            BOOT_COMPLETED_FILE
        )
        val MODULE_FILES = listOf(
            SE_POLICY,
            *MODULE_SERVICE_FILES.toTypedArray(),
            "uninstall.sh",
            "system", "module.prop",
        )
    }
}