package com.dergoogler.core;

import android.webkit.JavascriptInterface;

public class NativeLog {

    static {
        System.loadLibrary("native-log-lib");
    }

    @JavascriptInterface
    public static native void native_log(int prio, String tag, String msg);

}
