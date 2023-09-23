package com.dergoogler.plugin;

import android.util.Log;

import com.topjohnwu.superuser.CallbackList;
import com.topjohnwu.superuser.Shell;

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
import java.util.List;

public class TerminalPlugin extends CordovaPlugin {
    private static final String LOG_TAG = "TerminalPlugin";
    private CallbackContext terminalCallbackContext = null;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "exec":
                String cmd = data.getString(0);

                this.terminalCallbackContext = callbackContext;
                String[] commands = {"su", "-c", cmd};


                cordova.getThreadPool().execute(() -> {
                    try {
                        run(commands);
                        callbackContext.error(1);
                    } catch (IOException e) {
                        callbackContext.error(0);
                        e.printStackTrace();
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

    public void run(String... command) throws IOException {
        ProcessBuilder pb = new ProcessBuilder(command).redirectErrorStream(true);
        Process process = pb.start();
        try (BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            while (true) {
                String line = in.readLine();
                if (line == null)
                    break;
                updateTerminal(line);
            }
        }
    }

    private void updateTerminal(String line) {
        sendUpdate(line, true);
    }

    private void sendUpdate(String line, boolean keepCallback) {
        if (this.terminalCallbackContext != null) {
            PluginResult result = new PluginResult(PluginResult.Status.OK, line);
            result.setKeepCallback(keepCallback);
            this.terminalCallbackContext.sendPluginResult(result);
        }
    }

}
