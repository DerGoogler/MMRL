package com.dergoogler.core;

import android.os.Build;
import android.webkit.JavascriptInterface;

import com.dergoogler.mmrl.BuildConfig;

public class BuildConfigNative {
    @JavascriptInterface
    public int VERSION_CODE() {
        return BuildConfig.VERSION_CODE;
    }

    @JavascriptInterface
    public String VERSION_NAME() {
        return BuildConfig.VERSION_NAME;
    }

    @JavascriptInterface
    public String APPLICATION_ID() {
        return BuildConfig.APPLICATION_ID;
    }

    @Deprecated
    @JavascriptInterface
    public int SDK_INT() {
        return Build.VERSION.SDK_INT;
    }

    @JavascriptInterface
    public boolean DEBUG() {
        return BuildConfig.DEBUG;
    }

    @JavascriptInterface
    public String BUILD_TYPE() {
        return BuildConfig.BUILD_TYPE;
    }
}
