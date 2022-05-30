package com.dergoogler.core;

import android.content.Context;
import android.graphics.Color;
import android.net.Uri;
import android.webkit.JavascriptInterface;

import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;

public class window {
    private final Context ctx;

    public window(Context ctx) {
        this.ctx = ctx;
    }

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
}
