package com.dergoogler.core;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;

import com.dergoogler.mmrl.BuildConfig;

public class OSNative {
    private final Context ctx;

    public OSNative(Context ctx) {
        this.ctx = ctx;
    }


    @JavascriptInterface
    public void makeToast(String content, int duration) {
        Toast.makeText(this.ctx, content, duration).show();
    }

    @Deprecated
    @JavascriptInterface
    public void log(String TAG, String message) {
        Log.i(TAG, message);
    }

    @JavascriptInterface
    public void logi(String TAG, String message) {
        Log.i(TAG, message);
    }

    @JavascriptInterface
    public void logw(String TAG, String message) {
        Log.w(TAG, message);
    }

    @JavascriptInterface
    public void loge(String TAG, String message) {
        Log.e(TAG, message);
    }


    @JavascriptInterface
    public String getSchemeParam(String param) {
        Intent intent = ((Activity) this.ctx).getIntent();
        if (Intent.ACTION_VIEW.equals(intent.getAction())) {
            Uri uri = intent.getData();
            return uri.getQueryParameter(param);
        } else {
            return "";
        }
    }

    @JavascriptInterface
    public boolean hasStoragePermission() {
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            return this.ctx.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED;
        }
    }

    @JavascriptInterface
    public void requestStoargePermission() {
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            Uri uri = Uri.fromParts("package", this.ctx.getPackageName(), null);
            intent.setData(uri);
            this.ctx.startActivity(intent);
        } else {
            ((Activity) this.ctx).requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1000);
        }
    }
    // Others

    @JavascriptInterface
    public void open(String link) {
        Uri uriUrl = Uri.parse(link);
        CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
        CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(Color.parseColor("#4a148c"))
                .build();
        intentBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, params);
        CustomTabsIntent customTabsIntent = intentBuilder.build();
        customTabsIntent.launchUrl(this.ctx, uriUrl);
    }

    @JavascriptInterface
    public void close() {
        ((Activity) this.ctx).finishAffinity();
        int pid = android.os.Process.myPid();
        android.os.Process.killProcess(pid);
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        this.ctx.startActivity(intent);
    }

    @JavascriptInterface
    public boolean isPackageInstalled(String targetPackage) {
        PackageManager pm = this.ctx.getPackageManager();
        try {
            pm.getPackageInfo(targetPackage, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    @JavascriptInterface
    public void launchAppByPackageName(String targetPackage) {
        Intent launchIntent = this.ctx.getPackageManager().getLaunchIntentForPackage(targetPackage);
        if (launchIntent != null) {
            this.ctx.startActivity(launchIntent);//null pointer check in case package name was not found
        }
    }

    @JavascriptInterface
    public String getMonetColor(String id) {
        int nameResourceID = this.ctx.getResources().getIdentifier("@android:color/" + id,
                "color", this.ctx.getApplicationInfo().packageName);
        if (nameResourceID == 0) {
            throw new IllegalArgumentException(
                    "No resource string found with name " + id);
        } else {
            int color = ContextCompat.getColor(this.ctx, nameResourceID);
            int red = Color.red(color);
            int blue = Color.blue(color);
            int green = Color.green(color);
            return String.format("#%02x%02x%02x", red, green, blue);
        }
    }

    @JavascriptInterface
    public void setStatusBarColor(String color, boolean white) {
        if (white) {
            try {
                ((Activity) this.ctx).getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            ((Activity) this.ctx).getWindow().setStatusBarColor(Color.parseColor(color));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public void setNavigationBarColor(String color) {
        try {
            ((Activity) this.ctx).getWindow().setNavigationBarColor(Color.parseColor(color));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
