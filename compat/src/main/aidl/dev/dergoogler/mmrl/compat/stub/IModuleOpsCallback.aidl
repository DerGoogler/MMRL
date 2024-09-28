package dev.dergoogler.mmrl.compat.stub;

interface IModuleOpsCallback {
    void onSuccess(String id);
    void onFailure(String id, String msg);
}