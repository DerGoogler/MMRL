package com.dergoogler.core;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;


public class NativeStorage {
    private final SharedPreferences localstorage;

    public NativeStorage(@NonNull Context ctx) {
        this.localstorage = ctx.getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
    }

    @JavascriptInterface
    public String getItem(String key) {
        try {
            return this.localstorage.getString(key, null);
        } catch (Exception e) {
            return null;
        }
    }

    @JavascriptInterface
    public void setItem(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    @JavascriptInterface
    public void removeItem(String key) {
        this.localstorage.edit().remove(key).apply();
    }

    @JavascriptInterface
    public void clear() {
        this.localstorage.edit().clear().apply();
    }

}