package com.dergoogler.utils;

import android.app.DownloadManager;
import android.content.Context;
import android.content.ContextWrapper;
import android.graphics.Color;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

public class LinkManager {
    private final Context context;
    private final ContextWrapper contextwrapper;


    public LinkManager(Context context) {
        this.context = context;
        this.contextwrapper = new ContextWrapper(this.context);
    }

    public String getDataDir() {
        return this.contextwrapper.getFilesDir().getPath();
    }

    public void downloadFile(String urlStr, String outputFile) {
        InputStream input = null;
        OutputStream output = null;
        String destinationFilePath = this.contextwrapper.getFilesDir().getPath() + "/" + outputFile;
        HttpURLConnection connection = null;
        try {
            URL url = new URL(urlStr);

            connection = (HttpURLConnection) url.openConnection();
            connection.connect();

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                Log.d("downloadZipFile", "Server ResponseCode=" + connection.getResponseCode() + " ResponseMessage=" + connection.getResponseMessage());
            }

            // download the file
            input = connection.getInputStream();

            Log.d("downloadZipFile", "destinationFilePath=" + destinationFilePath);
            new File(destinationFilePath).createNewFile();
            Toast.makeText(this.context, "Begin download", Toast.LENGTH_SHORT).show();
            output = new FileOutputStream(destinationFilePath);

            byte[] data = new byte[4096];
            int count;
            while ((count = input.read(data)) != -1) {
                output.write(data, 0, count);
            }
        } catch (Exception e) {
            Toast.makeText(this.context, e.toString(), Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        } finally {
            try {
                if (output != null) output.close();
                if (input != null) input.close();
            } catch (IOException e) {
                Toast.makeText(this.context, e.toString(), Toast.LENGTH_SHORT).show();
                e.printStackTrace();
            }

            if (connection != null) connection.disconnect();
        }
        Toast.makeText(this.context, "Download finished", Toast.LENGTH_SHORT).show();
    }

    public void openCustomTab(String url) {
        Uri uriUrl = Uri.parse(url);
        CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
        CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(Color.parseColor("#4a148c"))
                .build();
        intentBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, params);
        CustomTabsIntent customTabsIntent = intentBuilder.build();
        customTabsIntent.launchUrl(this.context, uriUrl);
    }
}
