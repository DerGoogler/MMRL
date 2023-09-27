package com.dergoogler.core;

import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

import java.io.IOException;
import java.util.ArrayList;


public class NativeShell {
    private final WebView wv;
    ArrayList<String> output = new ArrayList<>();

    public NativeShell(WebView wv) {
        this.wv = wv;
    }

    static {
        System.loadLibrary("native-shell-lib");
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
    public void isSuccess(String command) {
        Shell.cmd(command).exec().isSuccess();
    }

    @JavascriptInterface
    public void getCode(String command) {
        Shell.cmd(command).exec().getCode();
    }

    @JavascriptInterface
    public boolean isSuAvailable() {
        try {
            Runtime.getRuntime().exec("su --version");
            return true;
        } catch (IOException e) {
            // java.io.IOException: Cannot run program "su": error=2, No such file or directory
            return false;
        }
    }

    @JavascriptInterface
    public static native boolean isMagiskSU();

    @JavascriptInterface
    public static native boolean isKernelSU();

    @JavascriptInterface
    public static native String getenv(String key);

    @JavascriptInterface
    public static native void setenv(String key, String value, int override);

    @JavascriptInterface
    public boolean isAppGrantedRoot() {
        return Shell.cmd("if grep ' / ' /proc/mounts | grep -q '/dev/root' &> /dev/null; " +
                        "then echo true; else echo false; fi", "magisk -V", "magisk --path")
                .to(output).exec().isSuccess();
    }
}
