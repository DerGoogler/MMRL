package com.dergoogler.core;

import android.util.Log;
import android.webkit.JavascriptInterface;

public class NativeLog {
    @JavascriptInterface
    public void native_log(int prio, String tag, String msg) {
        Log.println(prio, tag, msg);
    }

}
