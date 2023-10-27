package com.dergoogler.core;

import android.webkit.JavascriptInterface;

public class NativeProperties {

    static {
        System.loadLibrary("properties");
    }

    @JavascriptInterface
    public static native String get(String key, String def);

    @JavascriptInterface
    public static native int set(String key, String value);
}
