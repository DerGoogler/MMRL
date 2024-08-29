package com.dergoogler.core;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.res.Resources;
import android.graphics.Color;
import android.os.Build;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.view.DisplayCutout;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.dergoogler.mmrl.MainActivity;
import com.dergoogler.util.Json;
import com.topjohnwu.superuser.Shell;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

public class NativeView {
    private static final String TAG = "NativeView";
    private final Activity ctx;
    private Insets insets;
    private final WindowInsetsControllerCompat windowInsetsController;

    public NativeView(Activity ctx, WebView wv) {
        this.ctx = ctx;
        ViewCompat.setOnApplyWindowInsetsListener(wv, (v, windowInsets) -> {
            this.insets = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
            return WindowInsetsCompat.CONSUMED;
        });
        this.windowInsetsController = WindowCompat.getInsetsController(ctx.getWindow(), wv);
        WindowCompat.setDecorFitsSystemWindows(ctx.getWindow(), false);
        this.windowInsetsController.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);

    }

    private int dpToPx(int dp) {
        float scale = this.ctx.getResources().getDisplayMetrics().density;
        return (int) (dp / scale);
    }

    @JavascriptInterface
    public int getWindowTopInsets() {
        return dpToPx(this.insets.top);
    }

    @JavascriptInterface
    public int getWindowRightInsets() {
        return dpToPx(this.insets.right);
    }

    @JavascriptInterface
    public int getWindowBottomInsets() {
        return dpToPx(this.insets.bottom);
    }

    @JavascriptInterface
    public int getWindowLeftInsets() {
        return dpToPx(this.insets.left);
    }

    @JavascriptInterface
    public boolean isAppearanceLightNavigationBars() {
        return windowInsetsController.isAppearanceLightNavigationBars();
    }

    @JavascriptInterface
    public void setAppearanceLightNavigationBars(boolean isLight) {
        windowInsetsController.setAppearanceLightNavigationBars(isLight);
    }

    @JavascriptInterface
    public boolean isAppearanceLightStatusBars() {
        return windowInsetsController.isAppearanceLightStatusBars();
    }

    @JavascriptInterface
    public void setAppearanceLightStatusBars(boolean isLight) {
        windowInsetsController.setAppearanceLightStatusBars(isLight);
    }

    private void hideSystemBars(int type) {
        windowInsetsController.hide(type);
    }

    private void showSystemBars(int type) {
        windowInsetsController.show(type);
    }

    @JavascriptInterface
    public void addFlag(int flag) {
        try {
            ctx.getWindow().addFlags(flag);
        } catch (Exception e) {
            Log.e(TAG + ":addFlag", e.toString());
        }
    }

    @JavascriptInterface
    public void clearFlag(int flag) {
        try {
            ctx.getWindow().clearFlags(flag);
        } catch (Exception e) {
            Log.e(TAG + ":clearFlag", e.toString());
        }
    }


    @Deprecated
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

    @Deprecated
    @JavascriptInterface
    public void setNavigationBarColor(String color) {
        try {
            ((Activity) this.ctx).getWindow().setNavigationBarColor(Color.parseColor(color));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
