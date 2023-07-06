package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.dergoogler.core.BuildConfigNative;
import com.dergoogler.core.BuildNative;
import com.dergoogler.core.FileSystemNative;
import com.dergoogler.core.OSNative;
import com.dergoogler.core.NativeStorage;
import com.dergoogler.core.ShellNative;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewImpl;
import org.apache.cordova.CoreAndroid;
import org.apache.cordova.LOG;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;

public class MainActivity extends CordovaActivity {
    @Override
    @SuppressLint("SetJavaScriptEnabled")
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        appView = findViewById(R.id.mmrl_view);
        super.init();

        WebView wv = (WebView) appView.getEngine().getView();
        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

        WebSettings webViewSettings = wv.getSettings();
        // Options
        webViewSettings.setJavaScriptEnabled(true);
        webViewSettings.setAllowFileAccess(true);
        webViewSettings.setAllowContentAccess(true);
        webViewSettings.setAllowFileAccessFromFileURLs(true);
        webViewSettings.setAllowUniversalAccessFromFileURLs(true);
        webViewSettings.setDatabaseEnabled(true);
        webViewSettings.setDomStorageEnabled(false);
        webViewSettings.setUserAgentString("MMRL");
        webViewSettings.setAllowFileAccessFromFileURLs(false);
        webViewSettings.setAllowUniversalAccessFromFileURLs(false);
        webViewSettings.setAllowFileAccess(false);
        webViewSettings.setAllowContentAccess(false);

        // Core
        wv.addJavascriptInterface(new FileSystemNative(this), "__fs__");
        wv.addJavascriptInterface(new ShellNative(wv), "__shell__");
        wv.addJavascriptInterface(new BuildConfigNative(), "__buildconfig__");
        wv.addJavascriptInterface(new OSNative(this), "__os__");
        wv.addJavascriptInterface(new NativeStorage(this), "__nativeStorage__");

    }
}
