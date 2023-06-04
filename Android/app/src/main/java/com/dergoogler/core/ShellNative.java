package com.dergoogler.core;

import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.topjohnwu.superuser.CallbackList;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

import java.util.ArrayList;
import java.util.List;


public class ShellNative {
    private final WebView wv;
    ArrayList<String> output = new ArrayList<>();

    public ShellNative(WebView wv) {
        this.wv = wv;
    }

    @JavascriptInterface
    public void exec(String command) {
        Shell.cmd(command).exec();
    }

    @JavascriptInterface
    public String result(String command) {
        return ShellUtils.fastCmd(command);
    }

    @JavascriptInterface
    public boolean isAppGrantedRoot() {
        return Shell.cmd("if grep ' / ' /proc/mounts | grep -q '/dev/root' &> /dev/null; " +
                        "then echo true; else echo false; fi", "magisk -V", "magisk --path")
                .to(output).exec().isSuccess();
    }
}
