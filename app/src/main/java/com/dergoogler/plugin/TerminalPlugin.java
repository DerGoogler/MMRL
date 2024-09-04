package com.dergoogler.plugin;

import android.util.Log;

import com.dergoogler.util.Json;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.io.SuFile;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class TerminalPlugin extends CordovaPlugin {
    private static final String TAG = "TerminalPlugin";
    private CallbackContext terminalCallbackContext = null;

    private int ProcessCode = 1000;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "exec":
                String cmd = data.getString(0);
                JSONObject envp = data.getJSONObject(1);
                String cwd = data.getString(2);

                this.terminalCallbackContext = callbackContext;
                String[] commands = {"su", "-c", cmd};


                cordova.getThreadPool().execute(() -> {
                    try {
                        run(envp, cwd, commands);
                    } catch (IOException | JSONException e) {
                        Log.e(TAG + ":execute", e.toString());
                    }
                });
                return true;
            case "test":
                String msg = data.getString(0);
                Log.i(TAG, msg);
                return true;

            default:
                return false;
        }

    }

    public void run(JSONObject envp, String cwd, String... command) throws IOException, JSONException {
        ProcessBuilder pb = new ProcessBuilder(command);

        if (envp != null) {
            Map<String, String> m = pb.environment();
            m.putAll(Json.toMap(envp));
        }

        pb.directory(new SuFile(cwd));
        Process process = pb.start();

        try (BufferedReader stdoutReader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = stdoutReader.readLine()) != null) {
                JSONObject progressObj = new JSONObject();
                progressObj.put("stdout", line);
                progressObj.put("stderr", null);
                updateTerminalOutput(progressObj);
            }
        } catch (Exception e) {
            Log.e(TAG + ":run -> stdout", e.toString());
        }

        try (BufferedReader stderrReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String line;
            while ((line = stderrReader.readLine()) != null) {
                JSONObject progressObj = new JSONObject();
                progressObj.put("stdout", null);
                progressObj.put("stderr", line);
                updateTerminalOutput(progressObj);
            }
        } catch (Exception e) {
            Log.e(TAG + ":run -> stderr", e.toString());
        }

        int exitCode;
        try {
            exitCode = process.waitFor();
            updateTerminalExit(exitCode);
            process.destroy();
        } catch (InterruptedException e) {
            Log.e(TAG + ":run -> exit", e.toString());
            updateTerminalExit(500);
            process.destroy();
        }
    }


    private void updateTerminalOutput(JSONObject line) {
        sendUpdate(PluginResult.Status.OK, line);
    }

    private void updateTerminalExit(int code) {
        sendUpdate(PluginResult.Status.ERROR, code);
    }


    private void sendUpdate(PluginResult.Status status, int line) {
        if (this.terminalCallbackContext != null) {
            PluginResult result = new PluginResult(status, line);
            result.setKeepCallback(true);
            this.terminalCallbackContext.sendPluginResult(result);
        }
    }


    private void sendUpdate(PluginResult.Status status, JSONObject obj) {
        if (this.terminalCallbackContext != null) {
            PluginResult result = new PluginResult(status, obj);
            result.setKeepCallback(true);
            this.terminalCallbackContext.sendPluginResult(result);
        }
    }
}
