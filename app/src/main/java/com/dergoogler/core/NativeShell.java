package com.dergoogler.core;

import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.dergoogler.plugin.TerminalPlugin;
import com.dergoogler.util.Json;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class NativeShell {
    private static final String TAG = "NativeShell";
    private final WebView wv;
    ArrayList<String> output = new ArrayList<>();

    public NativeShell(WebView wv) {
        this.wv = wv;
    }

    @JavascriptInterface
    public Object v2(String jsonArr) {
        String[] cmds;
        try {
            cmds = Json.getStringArray(new JSONArray(jsonArr));
        } catch (JSONException e) {
            Log.e(TAG, e.toString());
            return null;
        }
        Shell.Job shell = Shell.cmd(cmds);

        final Shell.Result[] result = new Shell.Result[1];

        return new Object() {

            @JavascriptInterface
            public void exec() {
                result[0] = shell.exec();
            }

            @JavascriptInterface
            public String result() {
                List<String> out = shell.to(new ArrayList<>(), null).exec().getOut();
                return ShellUtils.isValidOutput(out) ? out.get(out.size() - 1) : "";
            }

            @JavascriptInterface
            public boolean isSuccess() {
                return result[0].isSuccess();
            }

            @JavascriptInterface
            public int getCode(String command) {
                return result[0].getCode();
            }


        };
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
    public boolean isSuccess(String command) {
        return Shell.cmd(command).exec().isSuccess();
    }

    @JavascriptInterface
    public int getCode(String command) {
        return Shell.cmd(command).exec().getCode();
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
    public boolean isAppGrantedRoot() {
        return Shell.cmd("if grep ' / ' /proc/mounts | grep -q '/dev/root' &> /dev/null; " +
                        "then echo true; else echo false; fi", "magisk -V", "magisk --path")
                .to(output).exec().isSuccess();
    }

    @JavascriptInterface
    public static native int pw_uid();

    @JavascriptInterface
    public static native int pw_gid();

    @JavascriptInterface
    public static native String pw_name();
}
