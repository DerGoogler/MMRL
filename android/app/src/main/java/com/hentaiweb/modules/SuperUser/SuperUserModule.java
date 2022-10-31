package com.dergoogler.mmrl.modules.SuperUser; // replace com.your-app-name with your app’s name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;
import com.topjohnwu.superuser.CallbackList;

public class SuperUserModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    SuperUserModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
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
    public void execWithEvent(final String command, final Callback call) {
        List<String> callbackList = new CallbackList<String>() {
            @Override
            public void onAddElement(String s) {
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onShell", s);
            }
        };

        Shell.cmd(command)
                .to(callbackList)
                .submit(result -> {
                    call.invoke();
                });
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isAppGrantedRoot() {
        Boolean appGrantedRoot = Shell.isAppGrantedRoot();
        if (appGrantedRoot == null) {
            return false;
        } else
            return appGrantedRoot;
    }
}