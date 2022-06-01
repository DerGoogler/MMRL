package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.components.ModuleView;
import com.dergoogler.core.nbuildconfig;
import com.dergoogler.core.fs;
import com.dergoogler.core.os;
import com.dergoogler.core.sharedpreferences;
import com.dergoogler.core.shell;
import com.dergoogler.core.window;


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
        view.setJavascriptInterface(new fs(this), "nfs");
        view.setJavascriptInterface(new shell(this), "nshell");
        view.setJavascriptInterface(new nbuildconfig(), "nbuildconfig");
        view.setJavascriptInterface(new os(this), "nos");
        view.setJavascriptInterface(new window(this), "window");
        view.setJavascriptInterface(new sharedpreferences(this), "nsharedpreferences");
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
