package com.dergoogler.core;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.DisplayCutout;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;

import com.dergoogler.mmrl.MainActivity;

public class NativeOS {
    private final MainActivity ctx;

    public NativeOS(MainActivity ctx) {
        this.ctx = ctx;
    }


    @JavascriptInterface
    public void makeToast(String content, int duration) {
        Toast.makeText(this.ctx, content, duration).show();
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

    @JavascriptInterface
    public void open(String link, String color) {
        Uri uriUrl = Uri.parse(link);
        CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
        CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(Color.parseColor(color))
                .build();
        intentBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, params);
        CustomTabsIntent customTabsIntent = intentBuilder.build();

        // It's not the best, but it should work
        try {
            customTabsIntent.launchUrl(this.ctx, uriUrl);
        } catch (ActivityNotFoundException e) {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(link));
            this.ctx.startActivity(intent);
        }
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
    public int sdk() {
        return Build.VERSION.SDK_INT;
    }

    private static int manipulateColor(int color, float factor) {
        int a = Color.alpha(color);
        int r = Math.round(Color.red(color) * (100 + factor) / 100);
        int g = Math.round(Color.green(color) * (100 + factor) / 100);
        int b = Math.round(Color.blue(color) * (100 + factor) / 100);
        return Color.argb(a,
                Math.min(r,255),
                Math.min(g,255),
                Math.min(b,255));
    }

    @JavascriptInterface
    public String getMonetColor(String id) {
        @SuppressLint("DiscouragedApi") int nameResourceID = this.ctx.getResources().getIdentifier("@android:color/" + id,
                "color", this.ctx.getApplicationInfo().packageName);
        if (nameResourceID == 0) {
            throw new IllegalArgumentException(
                    "No resource string found with name " + id);
        } else {
            return String.format("#%06x", manipulateColor(ContextCompat.getColor(this.ctx, nameResourceID) & 0xffffff, 75));
        }
    }

    @JavascriptInterface
    public int getStatusBarHeight() {
        Resources res = ctx.getApplicationContext().getResources();
        int statusBarHeight;
        int resourceId = res.getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            statusBarHeight = res.getDimensionPixelSize(resourceId);
            return (int) (statusBarHeight / res.getDisplayMetrics().density);
        } else {
            return 0;
        }
    }

    @JavascriptInterface
    public int getSafeAreaInsets(String type) {
        float leftInset = 0, rightInset = 0, topInset = 0, bottomInset = 0;
        Resources res = ctx.getApplicationContext().getResources();
        WindowInsets windowInsets = ctx.getWindow().getDecorView().getRootWindowInsets();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            if (windowInsets != null) {
                final DisplayCutout cutout = windowInsets.getDisplayCutout();

                leftInset = cutout != null ? cutout.getSafeInsetLeft() : 0;
                rightInset = cutout != null ? cutout.getSafeInsetRight() : 0;
                topInset = cutout != null ? cutout.getSafeInsetTop() : 0;
                bottomInset = cutout != null ? cutout.getSafeInsetBottom() : 0;

                @SuppressLint("RestrictedApi") Insets insets = Insets.wrap(windowInsets.getSystemWindowInsets());
                leftInset = Math.max(leftInset, insets.left) / res.getDisplayMetrics().density;
                rightInset = Math.max(rightInset, insets.right) / res.getDisplayMetrics().density;
                topInset = Math.max(topInset, insets.top) / res.getDisplayMetrics().density;
                bottomInset = Math.max(bottomInset, insets.bottom) / res.getDisplayMetrics().density;
            }
        }


        if (type.equals("top")) {
            return (int) topInset;
        } else {

            return (int) bottomInset;
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
