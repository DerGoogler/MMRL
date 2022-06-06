package com.dergoogler.component;

import androidx.annotation.Nullable;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Message;
import android.view.KeyEvent;
import android.webkit.ClientCertRequest;
import android.webkit.HttpAuthHandler;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.SafeBrowsingResponse;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebViewClient;

public class ModuleViewClient extends WebViewClient {
    public ModuleViewClient() {

    }

    public boolean shouldOverrideUrlLoading(ModuleView view, WebResourceRequest request) {
        return super.shouldOverrideUrlLoading(view, request);
    }

    public void onPageStarted(ModuleView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
    }

    public void onPageFinished(ModuleView view, String url) {
        super.onPageFinished(view, url);
    }

    public void onLoadResource(ModuleView view, String url) {
        super.onLoadResource(view, url);
    }

    public void onPageCommitVisible(ModuleView view, String url) {
        super.onPageCommitVisible(view, url);
    }

    @Nullable
    public WebResourceResponse shouldInterceptRequest(ModuleView view, WebResourceRequest request) {
        return super.shouldInterceptRequest(view, request);
    }

    public void onReceivedError(ModuleView view, WebResourceRequest request, WebResourceError error) {
        super.onReceivedError(view, request, error);
    }

    public void onReceivedHttpError(ModuleView view, WebResourceRequest request, WebResourceResponse errorResponse) {
        super.onReceivedHttpError(view, request, errorResponse);
    }

    public void onFormResubmission(ModuleView view, Message dontResend, Message resend) {
        super.onFormResubmission(view, dontResend, resend);
    }

    public void doUpdateVisitedHistory(ModuleView view, String url, boolean isReload) {
        super.doUpdateVisitedHistory(view, url, isReload);
    }

    public void onReceivedSslError(ModuleView view, SslErrorHandler handler, SslError error) {
        super.onReceivedSslError(view, handler, error);
    }

    public void onReceivedClientCertRequest(ModuleView view, ClientCertRequest request) {
        super.onReceivedClientCertRequest(view, request);
    }

    public void onReceivedHttpAuthRequest(ModuleView view, HttpAuthHandler handler, String host, String realm) {
        super.onReceivedHttpAuthRequest(view, handler, host, realm);
    }

    public boolean shouldOverrideKeyEvent(ModuleView view, KeyEvent event) {
        return super.shouldOverrideKeyEvent(view, event);
    }

    public void onUnhandledKeyEvent(ModuleView view, KeyEvent event) {
        super.onUnhandledKeyEvent(view, event);
    }

    public void onScaleChanged(ModuleView view, float oldScale, float newScale) {
        super.onScaleChanged(view, oldScale, newScale);
    }

    public void onReceivedLoginRequest(ModuleView view, String realm, @Nullable String account, String args) {
        super.onReceivedLoginRequest(view, realm, account, args);
    }

    public boolean onRenderProcessGone(ModuleView view, RenderProcessGoneDetail detail) {
        return super.onRenderProcessGone(view, detail);
    }

    public void onSafeBrowsingHit(ModuleView view, WebResourceRequest request, int threatType, SafeBrowsingResponse callback) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            super.onSafeBrowsingHit(view, request, threatType, callback);
        }
    }
}
