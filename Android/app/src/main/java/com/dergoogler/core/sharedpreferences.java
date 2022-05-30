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

    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     * <p>
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     * <p>
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    @JavascriptInterface
    public void setPref(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    /**
     * Returns the current value associated with the given key, or null if the given key does not exist.
     */
    @JavascriptInterface
    public String getPref(String key) {
        return this.localstorage.getString(key, "");
    }

    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     * <p>
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    @JavascriptInterface
    public void removePref(String key) {
        this.localstorage.edit().remove(key).apply();
    }

    /**
     * Removes all key/value pairs, if there are any.
     * <p>
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    @JavascriptInterface
    public void clearPrefs() {
        this.localstorage.edit().clear().apply();
    }

}
