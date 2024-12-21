package dev.dergoogler.mmrl.compat.impl

import android.os.Build
import com.topjohnwu.superuser.CallbackList
import com.topjohnwu.superuser.Shell
import com.topjohnwu.superuser.ShellUtils
import dev.dergoogler.mmrl.compat.content.BulkModule
import dev.dergoogler.mmrl.compat.content.LocalModule
import dev.dergoogler.mmrl.compat.content.LocalModuleRunners
import dev.dergoogler.mmrl.compat.content.ModuleInfo
import dev.dergoogler.mmrl.compat.content.State
import dev.dergoogler.mmrl.compat.stub.IModuleManager
import dev.dergoogler.mmrl.compat.stub.IShellCallback
import java.io.File
import java.util.zip.ZipFile

internal abstract class BaseModuleManagerImpl(
    private val shell: Shell,
    private val seLinuxContext: String,
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

    override fun hasMagicMount(): Boolean = false

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

    private fun hasAction(id: String): Boolean {
        val moduleDir = modulesDir.resolve(id)
        val webroot = moduleDir.resolve(ACTION_FILE)
        return webroot.exists() && webroot.isFile
    }

    override fun getModuleById(id: String): LocalModule? {
        val dir = modulesDir.resolve(id)
        return readProps(dir)?.toModule(dir)
    }

    override fun getModuleInfo(zipPath: String): LocalModule? {
        val zipFile = ZipFile(zipPath)
        val entry = zipFile.getEntry(PROP_FILE) ?: return null

        return zipFile.getInputStream(entry).use {
            it.bufferedReader()
                .readText()
                .let(::readProps)
                .toModule()
        }
    }

    override fun fetchModuleInfo(): ModuleInfo {
        val folders = modulesDir.listFiles()?.filter { it.isDirectory } ?: emptyList()

        var total = 0
        var withServiceFiles = 0
        var disabled = 0
        var updatable = 0
        val disabledList = mutableListOf<String>()
        val updatedList = mutableListOf<String>()

        for (folder in folders) {
            total++

            val serviceFileExists = MODULE_SERVICE_FILES.any { File(folder, it).exists() }
            if (serviceFileExists) withServiceFiles++

            if (File(folder, "disable").exists()) {
                disabled++
                disabledList.add(folder.name)
            }

            if (File(folder, "update").exists()) {
                updatable++
                updatedList.add(folder.name)
            }
        }

        return ModuleInfo(
            totalModules = total,
            modulesWithServiceFiles = withServiceFiles,
            disabledModules = disabled,
            updatableModules = updatable,
            enabledModules = total.minus(disabled),
            disabledModulesList = disabledList,
            updatedModulesList = updatedList
        )
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
    ) = toModule(
        path = dir.name,
        state = readState(dir),
        runners = LocalModuleRunners(
            webui = hasWebUI(getOrDefault("id", dir.name)),
            action = hasAction(getOrDefault("id", dir.name)),
        ),
        lastUpdated = readLastUpdated(dir)
    )

    private fun Map<String, String>.toModule(
        path: String = "unknown",
        state: State = State.ENABLE,
        lastUpdated: Long = 0L,
        runners: LocalModuleRunners = LocalModuleRunners(
            webui = false,
            action = false
        ),
    ) = LocalModule(
        id = getOrDefault("id", path),
        name = getOrDefault("name", path),
        version = getOrDefault("version", ""),
        versionCode = getOrDefault("versionCode", "-1").toIntOr(-1),
        author = getOrDefault("author", ""),
        description = getOrDefault("description", ""),
        updateJson = getOrDefault("updateJson", ""),
        state = state,
        runners = runners,
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
    ) {
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

        val cmds = arrayOf(
            "export MMRL=true",
            "export BULK_MODULES=\"${bulkModules.joinToString(" ") { it.id }}\"",
            cmd
        )

        val result = shell.newJob().add(*cmds).to(stdout, stderr).exec()
        if (result.isSuccess) {
            val module = getModuleInfo(path)
            callback.onSuccess(module)
        } else {
            callback.onFailure()
        }
    }

    internal fun action(cmd: Array<String>, callback: IShellCallback) {
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

        val cmds = arrayOf(
            "export PATH=/data/adb/ap/bin:/data/adb/ksu/bin:/data/adb/magisk:\$PATH",
            "export MMRL=true",
            "export BOOTMODE=true",
            "export ARCH=${Build.SUPPORTED_ABIS[0]}",
            "export API=${Build.VERSION.SDK_INT}",
            "export IS64BIT=${Build.SUPPORTED_64_BIT_ABIS.isNotEmpty()}",
            *cmd
        )

        val result = shell.newJob().add(*cmds).to(stdout, stderr).exec()
        if (result.isSuccess) {
            callback.onSuccess(null)
        } else {
            callback.onFailure()
        }
    }

    internal fun String.submit(cb: Shell.ResultCallback) = shell
        .newJob().add(this).to(ArrayList(), null)
        .submit(cb)

    companion object {
        const val PROP_FILE = "module.prop"
        const val WEBROOT_PATH = "webroot"
        const val ACTION_FILE = "action.sh"
        const val MODULES_PATH = "/data/adb/modules"

        val MODULE_SERVICE_FILES = listOf(
            "service.sh",
            "post-fs-data.sh",
            "action.sh",
            "post-mount.sh",
            "boot-completed.sh",
            "webroot"
        )
        val MODULE_FILES = listOf(
            "post-fs-data.sh", "service.sh", "uninstall.sh",
            "system", "system.prop", "module.prop",
            // KernelSU, APatch and MMRL related files
            "action.sh", "post-mount.sh", "boot-completed.sh",
            "webroot"
        )
    }
}