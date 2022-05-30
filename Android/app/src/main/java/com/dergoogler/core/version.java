package com.dergoogler.core;

import android.content.Context;
import android.os.Build;
import android.webkit.JavascriptInterface;

import com.dergoogler.mmrl.BuildConfig;

public class version {
    /**
     * Return current app version code
     */
    @JavascriptInterface
    public int getAppVersionCode() {
        return BuildConfig.VERSION_CODE;
    }

    /**
     * Return current app version name
     */
    @JavascriptInterface
    public String getAppVersionName() {
        return BuildConfig.VERSION_NAME;
    }

    @JavascriptInterface
    public String getAppPackageId() {
        return BuildConfig.APPLICATION_ID;
    }

    /**
     * Return current android sdk-int version code, see:
     * https://source.android.com/setup/start/build-numbers
     */
    @JavascriptInterface
    public int getAndroidVersionCode() {
        return Build.VERSION.SDK_INT;
    }
}
