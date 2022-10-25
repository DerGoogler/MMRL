package com.dergoogler.mmrl.modules.SuperUser; // replace com.your-app-name with your app’s name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

public class SuperUserModule extends ReactContextBaseJavaModule {
    SuperUserModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "SuperUserModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void exec(String command) {
        Shell.cmd(command).exec();
    }
    
    @ReactMethod(isBlockingSynchronousMethod = true)    
    public String result(String command) {
        return ShellUtils.fastCmd(command);
    }
    
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isAppGrantedRoot() {
        Boolean appGrantedRoot = Shell.isAppGrantedRoot();
        if (appGrantedRoot == null) {
            return false;
        } else return appGrantedRoot;
    }
}