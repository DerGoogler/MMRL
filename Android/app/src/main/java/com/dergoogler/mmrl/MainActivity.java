package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.component.ModuleView;
import com.dergoogler.component.ModuleViewClient;
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
        view.setJavaScriptEnabled(true);
        view.setUserAgentString("MMRL");
        view.loadHTML("file:///android_asset/", new Page(this).load());
        view.addJavascriptInterface(new FileSystemNative(this), "nfs");
        view.addJavascriptInterface(new ShellNative(this), "nshell");
        view.addJavascriptInterface(new BuildNative(), "nbuild");
        view.addJavascriptInterface(new BuildConfigNative(), "nbuildconfig");
        view.addJavascriptInterface(new OSNative(this), "nos");
        view.addJavascriptInterface(new SharedPreferencesNative(this), "nsharedpreferences");
        view.setWebViewClient(new ModuleViewClient() {
            @Override
            public void onPageFinished(ModuleView view, String url) {
                super.onPageFinished(view, url);
                view.loadUrl("javascript:function inputClick(val){native.abcd(val);}");
            }
        });
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
