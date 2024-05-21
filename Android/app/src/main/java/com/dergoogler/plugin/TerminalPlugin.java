package com.dergoogler.plugin;

import android.util.Log;

import com.topjohnwu.superuser.io.SuFile;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class TerminalPlugin extends CordovaPlugin {
    private static final String LOG_TAG = "TerminalPlugin";
    private CallbackContext terminalCallbackContext = null;

    private int ProcessCode = 1000;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "exec":
                String cmd = data.getString(0);
                JSONObject envp = data.getJSONObject(1);
                String cwd = data.getString(2);
                boolean printError = data.getBoolean(3);

                this.terminalCallbackContext = callbackContext;
                String[] commands = {"su", "-c", cmd};


                cordova.getThreadPool().execute(() -> {
                    try {
                        run(envp, cwd, commands);
                    } catch (IOException | JSONException e) {
                        e.printStackTrace();
                        if (printError) {
                            updateTerminalLine(e.toString());
                        }
                        updateTerminalExit(500);
                    }
                });
                return true;
            case "test":
                String msg = data.getString(0);
                Log.i("d", msg);
                return true;

            default:
                return false;
        }

    }

    public void run(JSONObject envp, String cwd, String... command) throws IOException, JSONException {
        ProcessBuilder pb = new ProcessBuilder(command).redirectErrorStream(true);
        if (envp != null) {
            Map<String, String> m = pb.environment();
            m.putAll(toMap(envp));
        }

        pb.directory(new SuFile(cwd));
        Process process = pb.start();
        try (BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            while (true) {
                String line = in.readLine();
                if (line == null)
                    break;
                updateTerminalLine(line);
            }
            updateTerminalExit(process.exitValue());
        } catch (Exception e) {
            updateTerminalExit(500);
        }
    }

    private void updateTerminalLine(String line) {
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


    private void sendUpdate(PluginResult.Status status, String line) {
        if (this.terminalCallbackContext != null) {
            PluginResult result = new PluginResult(status, line);
            result.setKeepCallback(true);
            this.terminalCallbackContext.sendPluginResult(result);
        }
    }

    public static Map<String, String> toMap(JSONObject jsonobj) throws JSONException {
        Map<String, String> map = new HashMap<String, String>();
        Iterator<String> keys = jsonobj.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            String value = jsonobj.getString(key);
            map.put(key, value);
        }
        return map;
    }

    public static List<Object> toList(JSONArray array) throws JSONException {
        List<Object> list = new ArrayList<Object>();
        for (int i = 0; i < array.length(); i++) {
            Object value = array.get(i);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }

}
