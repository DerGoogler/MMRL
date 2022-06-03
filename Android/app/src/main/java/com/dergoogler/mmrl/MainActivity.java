package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.components.ModuleView;
import com.dergoogler.core.BuildConfigNative;
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
        view.setJavaScriptEnabled(true);
        view.setUserAgentString("MMRL");
        view.loadHTML("file:///android_asset/", new Page(this).load());
        view.setJavascriptInterface(new FileSystemNative(this), "nfs");
        view.setJavascriptInterface(new ShellNative(this), "nshell");
        view.setJavascriptInterface(new BuildConfigNative(), "nbuildconfig");
        view.setJavascriptInterface(new OSNative(this), "nos");
        view.setJavascriptInterface(new SharedPreferencesNative(this), "nsharedpreferences");
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
