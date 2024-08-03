package com.dergoogler.core;

import android.content.Context;
import android.content.ContextWrapper;
import android.os.Environment;
import android.webkit.JavascriptInterface;

public class NativeEnvironment {

    private final Context ctx;

    public NativeEnvironment(Context ctx) {
        this.ctx = ctx;
    }

    @JavascriptInterface
    public String getExternalStorageDir() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    @JavascriptInterface
    public String getPackageDataDir() {
        return this.ctx.getExternalFilesDir(null).getAbsolutePath();
    }

    @JavascriptInterface
    public String getPublicDir(String type) {
        return Environment.getExternalStoragePublicDirectory(type).getAbsolutePath();
    }

    @JavascriptInterface
    public String getDataDir() {
        return new ContextWrapper(this.ctx).getFilesDir().getPath();
    }

}
