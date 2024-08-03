package com.dergoogler.core;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;


public class NativeStorage {
    private final SharedPreferences localStorage;
    private String localStorageName;

    public NativeStorage(Context ctx) {
        this.localStorage = ctx.getSharedPreferences("localstorage_v2", Activity.MODE_PRIVATE);
    }

    @JavascriptInterface
    public void defineName(String name) {
        this.localStorageName = name;
    }

    @JavascriptInterface
    public String getItem(String key, String def) {
        try {
            return this.localStorage.getString(key, def);
        } catch (Exception e) {
            return null;
        }
    }

    @JavascriptInterface
    public String getItem(String key) {
        try {
            return this.localStorage.getString(key, null);
        } catch (Exception e) {
            return null;
        }
    }

    @JavascriptInterface
    public void setItem(String key, String value) {
        this.localStorage.edit().putString(key, value).apply();
    }

    @JavascriptInterface
    public void removeItem(String key) {
        this.localStorage.edit().remove(key).apply();
    }

    @JavascriptInterface
    public void clear() {
        this.localStorage.edit().clear().apply();
    }

}