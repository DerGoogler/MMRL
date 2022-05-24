package com.dergoogler.components;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.Keep;

@Keep
public class ModuleView extends WebView {

    private final WebSettings webSettings;

    public ModuleView(Context context) {
        super(context);
        this.webSettings = this.getSettings();
    }

    public ModuleView(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.webSettings = this.getSettings();
    }

    public ModuleView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.webSettings = this.getSettings();
    }

    public ModuleView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        this.webSettings = this.getSettings();
    }

    @SuppressLint("SetJavaScriptEnabled")
    public void setJavaScriptEnabled(boolean enabled) {
        this.webSettings.setJavaScriptEnabled(enabled);
    }

    public void setUserAgentString(String userAgent) {
        this.webSettings.setUserAgentString(userAgent);
    }
}
