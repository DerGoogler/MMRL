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
import android.os.Environment;
import android.provider.Settings;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.annotation.Keep;

import com.dergoogler.utils.LinkManager;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;
import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Keep
public class Interface {
    private final Context context;
    private final SharedPreferences localstorage;
    private final LinkManager link;

    public Interface(Context context) {
        this.context = context;
        this.localstorage = context.getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
        this.link = new LinkManager(this.context);
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
    public String getProp(String module, String prop) {
        return ShellUtils.fastCmd("cat /data/adb/modules/" + module + "/module.prop | sed -n \"s|^" + prop + "=||p\"");
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
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            return this.context.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED;
        }
    }

    @JavascriptInterface
    public String getDataDir() {
        return this.link.getDataDir();
    }

    @JavascriptInterface
    public String readModules() {
        String[] modules = new SuFile("/data/adb/modules").list();
        return String.join(",", modules);
    }

    @JavascriptInterface
    public void requestStoargePermission() {
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            Uri uri = Uri.fromParts("package", this.context.getPackageName(), null);
            intent.setData(uri);
            this.context.startActivity(intent);
        } else {
            ((Activity) this.context).requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1000);
        }
    }

    // Others

    @JavascriptInterface
    public void open(String link) {
        this.link.openCustomTab(link);
    }

    @JavascriptInterface
    public void downloadFile(String url, String outputFile) {
        try {
            this.link.downloadFile(url, outputFile);
        } catch (Exception e) {
            Toast.makeText(this.context, e.toString(), Toast.LENGTH_SHORT).show();
        }

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
