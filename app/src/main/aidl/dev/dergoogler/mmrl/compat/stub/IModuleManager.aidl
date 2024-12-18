package dev.dergoogler.mmrl.compat.stub;

import dev.dergoogler.mmrl.compat.content.LocalModule;
import dev.dergoogler.mmrl.compat.content.ModuleInfo;
import dev.dergoogler.mmrl.compat.content.BulkModule;
import dev.dergoogler.mmrl.compat.stub.IShellCallback;
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback;

interface IModuleManager {
    String getManagerName();
    String getVersion();
    int getVersionCode();
    List<LocalModule> getModules();
    boolean hasMagicMount();
    LocalModule getModuleById(String id);
    LocalModule getModuleInfo(String zipPath);
    oneway void reboot(String reason);
    oneway void enable(String id, boolean useShell, IModuleOpsCallback callback);
    oneway void disable(String id, boolean useShell, IModuleOpsCallback callback);
    oneway void remove(String id, boolean useShell, IModuleOpsCallback callback);
    oneway void install(String path, in List<BulkModule> bulkModule, IShellCallback callback);
    oneway void action(String modId, boolean legacy, IShellCallback callback);
    ModuleInfo fetchModuleInfo();
}