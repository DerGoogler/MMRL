package com.dergoogler.mmrl.modules.NativeStorage; // replace com.your-app-name with your app’s name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.SharedPreferences;

public class NativeStorageModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext ctx;
    private final SharedPreferences localstorage;

    NativeStorageModule(ReactApplicationContext context) {
        super(context);
        this.ctx = context;
        this.localstorage = context.getSharedPreferences("nativestorage", Activity.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return "NativeStorageModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getItem(String key) {
        try {
            return this.localstorage.getString(key, null);
        } catch (Exception e) {
            return null;
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void setItem(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void removeItem(String key) {
        this.localstorage.edit().remove(key).apply();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void clear() {
        this.localstorage.edit().clear().apply();
    }
}