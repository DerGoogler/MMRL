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

import java.util.List;

public class TerminalPlugin extends CordovaPlugin {
    private static final String LOG_TAG = "TerminalPlugin";


    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "exec":
                String cmd = data.getString(0);

                cordova.getThreadPool().execute(() -> {
                    List<String> callbackList = new CallbackList<String>() {
                        @Override
                        public void onAddElement(String s) {
                            PluginResult result = new PluginResult(PluginResult.Status.OK, s);
                            result.setKeepCallback(true);
                            callbackContext.sendPluginResult(result);

                        }
                    };

                    Shell.cmd(cmd)
                            .to(callbackList)
                            .submit(result -> {
                                if (result.isSuccess()) {
                                    callbackContext.error(1);
                                } else {
                                    callbackContext.error(0);
                                }
                            });

                });

                PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
                pluginResult.setKeepCallback(true); // Keep callback

                return true;

            case "test":
                String msg = data.getString(0);
                Log.i("d", msg);
                return true;

            default:
                return false;
        }

    }

}
