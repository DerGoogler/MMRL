package com.dergoogler.mmrl;

import static android.content.ContentValues.TAG;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.dergoogler.components.ModuleView;
import com.dergoogler.utils.MvFile;


public class MainActivity extends AppCompatActivity {
    private ModuleView view;

    private String cssInject() {
        String themeFile = "/MMRL/Theme.css";
        MvFile file = new MvFile(themeFile);
        if (file.exists()) {
            return new MvFile(MvFile.getExternalStorageDir() + themeFile).read();
        } else {
            Log.w(TAG, "onCssInject: Theme.css file was not found");
            return "";
        }
    }

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        view = findViewById(R.id.mmrl_view);
        view.setJavaScriptEnabled(true);
        view.setUserAgentString(Lib.getUserAgent());
        view.loadHTML(Lib.baseUrl(), Lib.pageContent(this.cssInject()));
        view.setJavascriptInterface(new Interface(this), Lib.interfaceName());
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
