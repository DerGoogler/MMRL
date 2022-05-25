package com.dergoogler.mmrl;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.annotation.Keep;
import androidx.annotation.RequiresApi;
import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;

import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;

import java.io.InputStream;

@Keep
public class Interface {
    private final Context context;
    private final SharedPreferences localstorage;

    public Interface(Context context) {
        this.context = context;
        this.localstorage = context.getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
    }

    @JavascriptInterface
    public void exec(String command) {
        InputStream bashrc = this.context.getResources().openRawResource(R.raw.bashrc);
        Shell.cmd(bashrc).add(command).exec();
    }

    @JavascriptInterface
    public String execResult(String command) {
        return ShellUtils.fastCmd(command);
    }

    @JavascriptInterface
    public Boolean isAppGrantedRoot() {
        Boolean appGrantedRoot = Shell.isAppGrantedRoot();
        if (appGrantedRoot == null) {
            return false;
        } else return appGrantedRoot;
    }


    // Native preferences

    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     * <p>
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     * <p>
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    @JavascriptInterface
    public void setPref(String key, String value) {
        this.localstorage.edit().putString(key, value).apply();
    }

    /**
     * Returns the current value associated with the given key, or null if the given key does not exist.
     */
    @JavascriptInterface
    public String getPref(String key) {
        return this.localstorage.getString(key, "");
    }

    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     * <p>
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    @JavascriptInterface
    public void removePref(String key) {
        this.localstorage.edit().remove(key).apply();
    }

    /**
     * Removes all key/value pairs, if there are any.
     * <p>
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    @JavascriptInterface
    public void clearPrefs() {
        this.localstorage.edit().clear().apply();
    }

    // Statusbar utils
    @JavascriptInterface
    public void setStatusbarColor(String color) {
        try {
            ((Activity) this.context).getWindow().setStatusBarColor(Color.parseColor(color));
        } catch (Exception e) {
            Toast.makeText(this.context, e.toString(), Toast.LENGTH_SHORT).show();
        }
    }

    @JavascriptInterface
    public void setStatusbarBackgroundWhite() {
        try {
            ((Activity) this.context).getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        } catch (Exception e) {
            Toast.makeText(this.context, e.toString(), Toast.LENGTH_SHORT).show();
        }
    }

    // Storage utils

    @JavascriptInterface
    public boolean hasStoragePermission() {
        return this.context.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED;
    }

    @RequiresApi(api = Build.VERSION_CODES.R)
    @JavascriptInterface
    public void requestStoargePermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            Uri uri = Uri.fromParts("package", this.context.getPackageName(), null);
            intent.setData(uri);
            this.context.startActivity(intent);
        } else {
            //below android 11=======
            ((Activity) this.context).requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.MANAGE_EXTERNAL_STORAGE}, 1000);
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
        customTabsIntent.launchUrl(this.context, uriUrl);
    }

    @JavascriptInterface
    public void close() {
        ((Activity) this.context).finishAffinity();
        int pid = android.os.Process.myPid();
        android.os.Process.killProcess(pid);
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        this.context.startActivity(intent);
    }

    // Version sht

    /**
     * Return current app version code
     */
    @JavascriptInterface
    public int getAppVersionCode() {
        return BuildConfig.VERSION_CODE;
    }

    /**
     * Return current app version name
     */
    @JavascriptInterface
    public String getAppVersionName() {
        return BuildConfig.VERSION_NAME;
    }

    @JavascriptInterface
    public String getAppPackageId() {
        return BuildConfig.APPLICATION_ID;
    }

    /**
     * Return current android sdk-int version code, see:
     * https://source.android.com/setup/start/build-numbers
     */
    @JavascriptInterface
    public int getAndroidVersionCode() {
        return Build.VERSION.SDK_INT;
    }

    @JavascriptInterface
    public String getMagiskVersionCode() {
        return ShellUtils.fastCmd("su -V");
    }
}
