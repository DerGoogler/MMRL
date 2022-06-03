package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.URLUtil;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.components.ModuleView;
import com.dergoogler.core.BuildConfig;
import com.dergoogler.core.FileSystem;
import com.dergoogler.core.OS;
import com.dergoogler.core.SharedPreferences;
import com.dergoogler.core.Shell;


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
        view.loadHTML("file:///android_asset/", Page.load());
        view.setJavascriptInterface(new FileSystem(this), "nfs");
        view.setJavascriptInterface(new Shell(this), "nshell");
        view.setJavascriptInterface(new BuildConfig(), "nbuildconfig");
        view.setJavascriptInterface(new OS(this), "nos");
        view.setJavascriptInterface(new SharedPreferences(this), "nsharedpreferences");
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
