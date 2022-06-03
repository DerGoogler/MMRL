package com.dergoogler.core;

import android.os.Build;
import android.webkit.JavascriptInterface;

import com.dergoogler.mmrl.BuildConfig;

public class BuildConfig {
    @JavascriptInterface
    public int VERSION_CODE() {
        return com.dergoogler.mmrl.BuildConfig.VERSION_CODE;
    }

    @JavascriptInterface
    public String VERSION_NAME() {
        return com.dergoogler.mmrl.BuildConfig.VERSION_NAME;
    }

    @JavascriptInterface
    public String APPLICATION_ID() {
        return com.dergoogler.mmrl.BuildConfig.APPLICATION_ID;
    }

    @JavascriptInterface
    public int SDK_INT() {
        return Build.VERSION.SDK_INT;
    }

    @JavascriptInterface
    public boolean DEBUG() {
        return com.dergoogler.mmrl.BuildConfig.DEBUG;
    }

    @JavascriptInterface
    public String BUILD_TYPE() {
        return com.dergoogler.mmrl.BuildConfig.BUILD_TYPE;
    }
}
