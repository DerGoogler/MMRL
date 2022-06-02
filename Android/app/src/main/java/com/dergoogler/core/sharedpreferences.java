package com.dergoogler.core;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;


public class sharedpreferences {
    private final Context ctx;
    private final SharedPreferences localstorage;

    public sharedpreferences(Context ctx) {
        this.ctx = ctx;
        this.localstorage = ctx.getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
    }

    @JavascriptInterface
    public void setPref(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    @JavascriptInterface
    public String getPref(String key) {
        return this.localstorage.getString(key, "");
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
