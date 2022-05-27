package com.dergoogler.mmrl;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.annotation.Dimension;
import androidx.annotation.Keep;
import androidx.annotation.Px;

import com.dergoogler.utils.Link;
import com.dergoogler.utils.MvFile;
import com.topjohnwu.superuser.Shell;
import com.topjohnwu.superuser.ShellUtils;
import com.topjohnwu.superuser.io.SuFile;

import java.io.IOException;
import java.io.InputStream;

@Keep
public class Interface {
    private final Context context;
    private final Link link;

    public Interface(Context context) {
        this.context = context;
        this.link = new Link(this.context);
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

    @JavascriptInterface
    public void makeToast(String content, int duration) {
        Toast.makeText(this.context, content, duration).show();
    }

    @JavascriptInterface
    public void log(String TAG, String message) {
        Log.i(TAG, message);
    }

    // Native preferences

    @JavascriptInterface
    public Object getSharedPreferences() {
        class retn {
            private final SharedPreferences localstorage;

            public retn(Context context) {
                this.localstorage = context.getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
            }

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

        }
        return new retn(this.context);
    }

    @JavascriptInterface
    public Object phoneComponents() {
        class retn {
            private final Context context;

            public retn(Context context) {
                this.context = context;
            }

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

            @JavascriptInterface
            @Dimension
            @Px
            public int getStatusBarHeight() {
                Rect rectangle = new Rect();
                Window window = ((Activity) this.context).getWindow();
                window.getDecorView().getWindowVisibleDisplayFrame(rectangle);
                return rectangle.top;
            }
        }
        return new retn(this.context);
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
    public String readFile(String path) {
        return new MvFile(path).read();
    }

    @JavascriptInterface
    public static Object SuFile(String path) {
        class readWrapper {

            @JavascriptInterface
            public Object storage() {
                class retn {
                    @JavascriptInterface
                    public String read() {
                        return new MvFile(path).read();
                    }

                    @JavascriptInterface
                    public boolean delete() {
                        return new SuFile(path).delete();
                    }

                    @JavascriptInterface
                    public boolean exists() {
                        return new SuFile(path).exists();
                    }
                }
                return new retn();
            }

            @JavascriptInterface
            public Object system() {
                class retn {
                    @JavascriptInterface
                    public String read() {
                        try {
                            return new MvFile(path).suRead();
                        } catch (IOException e) {
                            e.printStackTrace();
                            return "";
                        }
                    }

                    @JavascriptInterface
                    public String list() {
                        String[] modules = new SuFile(path).list();
                        return String.join(",", modules);
                    }
                }
                return new retn();
            }
        }
        return new readWrapper();
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

    @JavascriptInterface
    public Object version() {
        class retnWrappper {
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
        }
        return new retnWrappper();
    }
}
