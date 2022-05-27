package com.dergoogler.mmrl;

import static android.content.ContentValues.TAG;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.components.ModuleView;
import com.dergoogler.components.ModuleViewClient;
import com.dergoogler.utils.MvFile;

import java.io.IOException;


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
        view.loadHTML(Lib.baseUrl(), Lib.pageContent());
        view.setJavascriptInterface(new Interface(this), Lib.interfaceName());
        view.setWebViewClient(new ModuleViewClient() {
            @Override
            public String onCssInject() {
                String themeFile = "/MMRL/Theme.css";
                MvFile file = new MvFile(themeFile);
                if (file.exists()) {
                    return new MvFile(MvFile.getExternalStorageDir() + themeFile).read();
                } else {
                    Log.w(TAG, "onCssInject: Theme.css file was not found");
                    return "";
                }
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
