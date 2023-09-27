package com.dergoogler.mmrl;

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.dergoogler.core.NativeEnvironment;
import com.dergoogler.core.NativeSuFile;
import com.dergoogler.core.NativeLog;
import com.dergoogler.core.NativeOS;
import com.dergoogler.core.NativeProperties;
import com.dergoogler.core.NativeStorage;
import com.dergoogler.core.NativeShell;
import com.dergoogler.core.NativeBuildConfig;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity {
    @Override
    @SuppressLint("SetJavaScriptEnabled")
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        appView = findViewById(R.id.mmrl_view);
        super.init();

        if (isEmulator) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        WebView wv = (WebView) appView.getEngine().getView();
        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

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
        webViewSettings.setUserAgentString(this.mmrlUserAgent());
        webViewSettings.setAllowFileAccessFromFileURLs(false);
        webViewSettings.setAllowUniversalAccessFromFileURLs(false);
        webViewSettings.setAllowFileAccess(false);
        webViewSettings.setAllowContentAccess(false);

        // Core
        wv.addJavascriptInterface(new NativeSuFile(this), "__sufile__");
        wv.addJavascriptInterface(new NativeEnvironment(this), "__environment__");
        wv.addJavascriptInterface(new NativeShell(wv), "__shell__");
        wv.addJavascriptInterface(new NativeBuildConfig(), "__buildconfig__");
        wv.addJavascriptInterface(new NativeOS(this), "__os__");
        wv.addJavascriptInterface(new NativeStorage(this), "__nativeStorage__");
        wv.addJavascriptInterface(new NativeProperties(), "__properties__");
        wv.addJavascriptInterface(new NativeLog(), "__log__");

    }

    private String mmrlUserAgent() {
        return "MMRL/" + BuildConfig.VERSION_NAME + " (Linux; Android " + Build.VERSION.RELEASE + "; " + Build.MODEL + " Build/" + Build.DISPLAY + ")";
    }


    private boolean isEmulator = (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
            || Build.FINGERPRINT.startsWith("generic")
            || Build.FINGERPRINT.startsWith("unknown")
            || Build.HARDWARE.contains("goldfish")
            || Build.HARDWARE.contains("ranchu")
            || Build.MODEL.contains("google_sdk")
            || Build.MODEL.contains("Emulator")
            || Build.MODEL.contains("Android SDK built for x86")
            || Build.MANUFACTURER.contains("Genymotion")
            || Build.PRODUCT.contains("sdk_google")
            || Build.PRODUCT.contains("google_sdk")
            || Build.PRODUCT.contains("sdk")
            || Build.PRODUCT.contains("sdk_x86")
            || Build.PRODUCT.contains("sdk_gphone64_arm64")
            || Build.PRODUCT.contains("vbox86p")
            || Build.PRODUCT.contains("emulator")
            || Build.PRODUCT.contains("simulator");
}
