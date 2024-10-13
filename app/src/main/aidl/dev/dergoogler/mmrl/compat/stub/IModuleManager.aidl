package dev.dergoogler.mmrl.compat.stub;

import dev.dergoogler.mmrl.compat.content.LocalModule;
import dev.dergoogler.mmrl.compat.stub.IInstallCallback;
import dev.dergoogler.mmrl.compat.stub.IModuleOpsCallback;

interface IModuleManager {
    String getManagerName();
    String getVersion();
    int getVersionCode();
    List<LocalModule> getModules();
    LocalModule getModuleById(String id);
    LocalModule getModuleInfo(String zipPath);
    oneway void reboot();
    oneway void enable(String id, IModuleOpsCallback callback);
    oneway void disable(String id, IModuleOpsCallback callback);
    oneway void remove(String id, IModuleOpsCallback callback);
    oneway void install(String path, IInstallCallback callback);
}