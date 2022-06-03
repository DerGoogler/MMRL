package com.dergoogler.core;

import android.content.Context;
import android.webkit.JavascriptInterface;

import com.dergoogler.mmrl.R;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

import java.io.InputStream;

public class Shell {
    private final Context ctx;

    public Shell(Context ctx) {
        this.ctx = ctx;
    }

    @JavascriptInterface
    public void exec(String command) {
        InputStream bashrc = this.ctx.getResources().openRawResource(R.raw.bashrc);
        com.topjohnwu.superuser.Shell.cmd(bashrc).add(command).exec();
    }

    @JavascriptInterface
    public String result(String command) {
        return ShellUtils.fastCmd(command);
    }

    @JavascriptInterface
    public boolean isAppGrantedRoot() {
        Boolean appGrantedRoot = com.topjohnwu.superuser.Shell.isAppGrantedRoot();
        if (appGrantedRoot == null) {
            return false;
        } else return appGrantedRoot;
    }
}
