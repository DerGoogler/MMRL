package com.dergoogler.mmrl.ui.activity.webui

import android.annotation.SuppressLint
import android.view.ViewGroup
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.webkit.WebViewAssetLoader
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.WebUIViewModel
import java.io.File


@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebUIScreen(
    modId: String,
    viewModel: WebUIViewModel = hiltViewModel(),
) {
    val context = LocalContext.current
    val userPrefs = LocalUserPreferences.current

    val rootShell = viewModel.createRootShell(
        globalMnt = true,
        devMode = userPrefs.developerMode
    )

    val moduleDir = "/data/adb/modules/$modId"
    val webRoot = File("$moduleDir/webroot")

    val webViewAssetLoader = WebViewAssetLoader.Builder()
        .setDomain("mui.kernelsu.org")
        .addPathHandler(
            "/",
            SuFilePathHandler(
                context,
                webRoot,
                rootShell
            )
        )
        .build()

    AndroidView(
        modifier = Modifier
            .statusBarsPadding()
            .navigationBarsPadding(),
        factory = {
            WebView(context).apply {
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
                webViewClient = object : android.webkit.WebViewClient() {
                    override fun shouldInterceptRequest(
                        view: WebView,
                        request: WebResourceRequest,
                    ): WebResourceResponse? {
                        return webViewAssetLoader.shouldInterceptRequest(request.url)
                    }
                }

            }
        }, update = { webview ->
            webview.settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                allowFileAccess = false
            }
            webview.apply {
                loadUrl("https://mui.kernelsu.org/index.html")
                addJavascriptInterface(WebViewInterface(context, this, moduleDir, viewModel, userPrefs), "ksu")
            }
        })
}