package com.dergoogler.components;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.Keep;

import com.dergoogler.mmrl.Lib;

@Keep
public class ModuleView extends WebView {

    private final WebSettings webSettings;

    public ModuleView(Context context) {
        super(context);
        this.webSettings = this.getSettings();
        this.init();
    }

    public ModuleView(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.webSettings = this.getSettings();
        this.init();
    }

    public ModuleView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.webSettings = this.getSettings();
        this.init();
    }

    public ModuleView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        this.webSettings = this.getSettings();
        this.init();
    }

    private void init() {
        this.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
        this.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        this.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
    }

    @SuppressLint("SetJavaScriptEnabled")
    public void setJavaScriptEnabled(boolean enabled) {
        this.webSettings.setJavaScriptEnabled(enabled);
    }

    public void setUserAgentString(String userAgent) {
        this.webSettings.setUserAgentString(userAgent);
    }

    public void loadHTML(String htmlString) {
        this.loadData(htmlString, "text/html", "UTF-8");
    }

    public void loadHTML(String baseUrl, String htmlString) {
        this.loadDataWithBaseURL(baseUrl, htmlString, "text/html",
                "utf-8", null);
    }

    @SuppressLint("JavascriptInterface")
    public void setJavascriptInterface(Object object, String name) {
        this.addJavascriptInterface(object, name);
    }
}
