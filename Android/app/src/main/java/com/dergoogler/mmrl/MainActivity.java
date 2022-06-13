package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.component.ModuleView;
import com.dergoogler.core.BuildConfigNative;
import com.dergoogler.core.BuildNative;
import com.dergoogler.core.FileSystemNative;
import com.dergoogler.core.OSNative;
import com.dergoogler.core.SharedPreferencesNative;
import com.dergoogler.core.ShellNative;

public class MainActivity extends AppCompatActivity {
    private ModuleView view;

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
        view.addJavascriptInterface(new SharedPreferencesNative(this), "nsharedpreferences");
    }

    @Override
    public void onBackPressed() {
        if (view.canGoBack()) {
            view.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
