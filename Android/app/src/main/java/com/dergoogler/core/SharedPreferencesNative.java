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
        if (this.localstorage.contains(key)) {
            return this.localstorage.getString(key, defValue);
        } else {
            return defValue;
        }
    }

    @JavascriptInterface
    public boolean getBoolean(String key, boolean defValue) {
        if (this.localstorage.contains(key)) {
            return this.localstorage.getBoolean(key, defValue);
        } else {
            return defValue;
        }
    }

    @JavascriptInterface
    public int getInt(String key, int defValue) {
        if (this.localstorage.contains(key)) {
            return this.localstorage.getInt(key, defValue);
        } else {
            return defValue;
        }
    }

    @JavascriptInterface
    public void setString(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    @JavascriptInterface
    public void setBoolean(String key, String value) {
        if (value.equals("true")) {
            this.localstorage.edit().putBoolean(key, true).apply();
        } else {
            this.localstorage.edit().putBoolean(key, false).apply();
        }
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
