package com.dergoogler.plugin;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import com.topjohnwu.superuser.CallbackList;
import com.topjohnwu.superuser.Shell;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
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
                        .submit();

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
