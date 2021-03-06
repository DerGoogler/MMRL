package com.dergoogler.core;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;


public class SharedPreferencesNative {
    private final SharedPreferences localstorage;

    public SharedPreferencesNative(@NonNull Context ctx) {
        this.localstorage = ctx.getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
    }

    @JavascriptInterface
    public String getString(String key, String defValue) {
        return this.localstorage.getString(key, defValue);
    }

    @JavascriptInterface
    public boolean getBoolean(String key, boolean defValue) {
        return this.localstorage.getBoolean(key, defValue);
    }

    @JavascriptInterface
    public int getInt(String key, int defValue) {
        return this.localstorage.getInt(key, defValue);
    }

    @JavascriptInterface
    public void setString(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    @JavascriptInterface
    public void setBoolean(String key, boolean value) {
        this.localstorage.edit().putBoolean(key, value).apply();
    }

    @JavascriptInterface
    public void setInt(String key, int value) {
        this.localstorage.edit().putInt(key, value).apply();
    }

    @JavascriptInterface
    public void removePref(String key) {
        this.localstorage.edit().remove(key).apply();
    }

    @JavascriptInterface
    public void clearPrefs() {
        this.localstorage.edit().clear().apply();
    }

}
