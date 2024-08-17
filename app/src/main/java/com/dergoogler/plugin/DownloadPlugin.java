package com.dergoogler.plugin;

import android.os.Handler;
import android.os.Looper;

import com.topjohnwu.superuser.io.SuFileOutputStream;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class DownloadPlugin extends CordovaPlugin {
    private static final String TAG = "DownloadPlugin";
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler handler = new Handler(Looper.getMainLooper());
    private CallbackContext downloadCallbackContext = null;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("start")) {
            String url = args.getString(0);
            String dest = args.getString(1);
            this.downloadCallbackContext = callbackContext;
            executor.execute(() -> downloadFile(url, dest, callbackContext));
            return true;
        }
        return false;
    }

    private void downloadFile(String fileUrl, String fileDest, CallbackContext callbackContext) {
        InputStream input = null;
        OutputStream output = null;
        HttpURLConnection connection = null;
        try {
            URL url = new URL(fileUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.connect();

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                String error = "Server returned HTTP " + connection.getResponseCode() + " " + connection.getResponseMessage();
                handler.post(() -> updateError(error));
                return;
            }

            int fileLength = connection.getContentLength();

            input = new BufferedInputStream(connection.getInputStream());
            output = SuFileOutputStream.open(fileDest);

            byte[] data = new byte[4096];
            long total = 0;
            int count;
            while ((count = input.read(data)) != -1) {
                total += count;
                if (fileLength > 0) {
                    int progress = (int) (total * 100 / fileLength);
                    JSONObject progressObj = new JSONObject();
                    progressObj.put("type", "downloading");
                    progressObj.put("state", progress);
                    handler.post(() -> updateResult(progressObj));
                }
                output.write(data, 0, count);
            }
            JSONObject progressObj = new JSONObject();
            progressObj.put("type", "finished");
            progressObj.put("state", null);
            handler.post(() -> updateResult(progressObj));
        } catch (Exception e) {
            handler.post(() -> updateError(e.toString()));
        } finally {
            try {
                if (output != null) {
                    output.close();
                }
                if (input != null) {
                    input.close();
                }
            } catch (Exception ignored) {
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private void updateError(String err) {
        sendUpdate(PluginResult.Status.ERROR, err);
    }

    private void updateResult(JSONObject line) {
        sendUpdate(PluginResult.Status.OK, line);
    }

    private void sendUpdate(PluginResult.Status status, String res) {
        if (this.downloadCallbackContext != null) {
            PluginResult result = new PluginResult(status, res);
            result.setKeepCallback(true);
            this.downloadCallbackContext.sendPluginResult(result);
        }
    }

    private void sendUpdate(PluginResult.Status status, JSONObject res) {
        if (this.downloadCallbackContext != null) {
            PluginResult result = new PluginResult(status, res);
            result.setKeepCallback(true);
            this.downloadCallbackContext.sendPluginResult(result);
        }
    }
}
