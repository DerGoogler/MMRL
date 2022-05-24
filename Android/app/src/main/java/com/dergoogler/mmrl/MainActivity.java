package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.components.ModuleView;


public class MainActivity extends AppCompatActivity {
    private ModuleView view;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        view = findViewById(R.id.mmrl_view);
        view.setJavaScriptEnabled(true);
        view.setUserAgentString(Lib.getUserAgent());
        view.setWebViewClient(new MyWebViewClient());
        view.loadUrl(Lib.indexFile());
        view.addJavascriptInterface(new Interface(this), Lib.interfaceName());
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
