package com.dergoogler.components;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.Keep;

import java.util.Map;

@Keep
public class ModuleView extends WebView {

    private final WebSettings webSettings;

    static {
        System.loadLibrary("native-lib");
    }
    /**
     * Returns the html page to load. This is to prevent js injection though the html page with <script/> tags
     * @return HTML page string
     */
    public static native String pageContent(@NonNull String cssInject);

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

    @Override
    public void loadUrl(String url, Map<String, String> additionalHttpHeaders) {
        throw new RuntimeException("Stub!");
    }

    @Override
    public void loadUrl(@NonNull String url) {
        throw new RuntimeException("Stub!");
    }

    @Override
    public void postUrl(@NonNull String url, @NonNull byte[] postData) {
        throw new RuntimeException("Stub!");
    }

    @Override
    public void evaluateJavascript(@NonNull String script, @Nullable ValueCallback<String> resultCallback) {
        throw new RuntimeException("Stub!");
    }

    @SuppressLint("JavascriptInterface")
    public void setJavascriptInterface(Object object, String name) {
        this.addJavascriptInterface(object, name);
    }
}
