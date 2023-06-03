package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.PermissionRequest;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.component.ModuleChromeClient;
import com.dergoogler.component.ModuleView;
import com.dergoogler.core.BuildConfigNative;
import com.dergoogler.core.BuildNative;
import com.dergoogler.core.FileSystemNative;
import com.dergoogler.core.OSNative;
import com.dergoogler.core.SharedPreferencesNative;
import com.dergoogler.core.ShellNative;

public class MainActivity extends AppCompatActivity {
    private ModuleView view;
    private ValueCallback<Uri[]> fileChooserCallback;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        view = findViewById(R.id.mmrl_view);

        // Options
        view.setJavaScriptEnabled(true);
        view.setAllowFileAccess(true);
        view.setAllowContentAccess(true);
        view.setAllowFileAccessFromFileURLs(true);
        view.setAllowUniversalAccessFromFileURLs(true);
        view.setDatabaseEnabled(true);
        view.setDomStorageEnabled(false);
        view.setUserAgentString("MMRL");

        // Content
        view.loadHTML("file:///android_asset/", new Page(this).load());

        // Core
        view.addJavascriptInterface(new FileSystemNative(this), "nfs");
        view.addJavascriptInterface(new ShellNative(this), "nshell");
        view.addJavascriptInterface(new BuildNative(), "nbuild");
        view.addJavascriptInterface(new BuildConfigNative(), "nbuildconfig");
        view.addJavascriptInterface(new OSNative(this), "nos");
        view.addJavascriptInterface(new SharedPreferencesNative(this), "nativeStorage");
    }

    @Override
    public void onBackPressed() {
        view.eventDispatcher("onBackButton");
    }
}
