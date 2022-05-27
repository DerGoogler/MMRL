package com.dergoogler.components;

import android.util.Base64;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.nio.charset.StandardCharsets;

public abstract class ModuleViewClient extends WebViewClient {

    public String onCssInject() {
        return "";
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        try {
            byte[] data = this.onCssInject().getBytes(StandardCharsets.UTF_8);
            String encoded = Base64.encodeToString(data, Base64.NO_WRAP);
            view.loadUrl("javascript:(function() {" +
                    "var parent = document.getElementsByTagName('head').item(0);" +
                    "var style = document.createElement('style');" +
                    "style.type = 'text/css';" +
                    // Tell the browser to BASE64-decode the string into your script !!!
                    "style.innerHTML = window.atob('" + encoded + "');" +
                    "parent.appendChild(style)" +
                    "})()");
        } catch (Exception e) {
            e.printStackTrace();
        }
        super.onPageFinished(view, url);
    }
}
