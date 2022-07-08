package com.dergoogler.component;

import androidx.annotation.Nullable;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Message;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.GeolocationPermissions;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;

public class ModuleChromeClient extends WebChromeClient {
    public ModuleChromeClient() {
        super();
    }

    public void onProgressChanged(ModuleView view, int newProgress) {
        super.onProgressChanged(view, newProgress);
    }

    public void onReceivedTitle(ModuleView view, String title) {
        super.onReceivedTitle(view, title);
    }

    public void onReceivedIcon(ModuleView view, Bitmap icon) {
        super.onReceivedIcon(view, icon);
    }

    public void onReceivedTouchIconUrl(ModuleView view, String url, boolean precomposed) {
        super.onReceivedTouchIconUrl(view, url, precomposed);
    }

    public void onShowCustomView(View view, android.webkit.WebChromeClient.CustomViewCallback callback) {
        super.onShowCustomView(view, callback);
    }

    public void onHideCustomView() {
        super.onHideCustomView();
    }

    public boolean onCreateWindow(ModuleView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
        return super.onCreateWindow(view, isDialog, isUserGesture, resultMsg);
    }

    public void onRequestFocus(ModuleView view) {
        super.onRequestFocus(view);
    }

    public void onCloseWindow(ModuleView window) {
        super.onCloseWindow(window);
    }

    public boolean onJsAlert(ModuleView view, String url, String message, JsResult result) {
        return super.onJsAlert(view, url, message, result);
    }

    public boolean onJsConfirm(ModuleView view, String url, String message, JsResult result) {
        return super.onJsConfirm(view, url, message, result);
    }

    public boolean onJsPrompt(ModuleView view, String url, String message, String defaultValue, JsPromptResult result) {
        return super.onJsPrompt(view, url, message, defaultValue, result);
    }

    public boolean onJsBeforeUnload(ModuleView view, String url, String message, JsResult result) {
        return super.onJsBeforeUnload(view, url, message, result);
    }

    public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        super.onGeolocationPermissionsShowPrompt(origin, callback);
    }

    public void onGeolocationPermissionsHidePrompt() {
        super.onGeolocationPermissionsHidePrompt();
    }

    public void onPermissionRequest(PermissionRequest request) {
        super.onPermissionRequest(request);
    }

    public void onPermissionRequestCanceled(PermissionRequest request) {
        super.onPermissionRequestCanceled(request);
    }

    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        return super.onConsoleMessage(consoleMessage);
    }

    @Nullable
    public Bitmap getDefaultVideoPoster() {
        return super.getDefaultVideoPoster();
    }

    @Nullable
    public View getVideoLoadingProgressView() {
        return super.getVideoLoadingProgressView();
    }

    public void getVisitedHistory(ValueCallback<String[]> callback) {
        super.getVisitedHistory(callback);
    }

    public boolean onShowFileChooser(ModuleView webView, ValueCallback<Uri[]> filePathCallback, android.webkit.WebChromeClient.FileChooserParams fileChooserParams) {
        return super.onShowFileChooser(webView, filePathCallback, fileChooserParams);
    }

    public abstract static class FileChooserParams {
        public static final int MODE_OPEN = 0;
        public static final int MODE_OPEN_MULTIPLE = 1;
        public static final int MODE_SAVE = 3;

        public FileChooserParams() {
            super();
        }

        public abstract int getMode();

        public abstract String[] getAcceptTypes();

        public abstract boolean isCaptureEnabled();

        @Nullable
        public abstract CharSequence getTitle();

        @Nullable
        public abstract String getFilenameHint();

        public abstract Intent createIntent();
    }

    public interface CustomViewCallback {
        void onCustomViewHidden();
    }
}