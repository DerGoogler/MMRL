package com.dergoogler.mmrl.ui.activity.webui.handlers

import android.annotation.SuppressLint
import android.content.Context
import android.net.http.SslError
import android.webkit.SslErrorHandler
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.core.net.toUri
import androidx.webkit.WebViewAssetLoader
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.UserPreferencesCompat
import com.dergoogler.mmrl.viewmodel.WebUIViewModel
import dev.dergoogler.mmrl.compat.core.MMRLUriHandlerImpl


class MMRLWebClient(
    private val context: Context,
    private val viewModel: WebUIViewModel,
    private val browser: MMRLUriHandlerImpl,
    private val userPrefs: UserPreferencesCompat,
    private val webViewAssetLoader: WebViewAssetLoader,
) : WebViewClient() {
    override fun shouldOverrideUrlLoading(
        view: WebView,
        request: WebResourceRequest?,
    ): Boolean {
        val mUrl = request?.url?.toString() ?: return false

        return if (!viewModel.isDomainSafe(mUrl)) {
            browser.openUri(
                uri = mUrl,
                onSuccess = { intent, uri ->
                    intent.launchUrl(context, uri.toUri())
                    Toast.makeText(
                        context,
                        context.getString(
                            R.string.unsafe_url_redirecting,
                            uri
                        ),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            )
            true
        } else {
            view.loadUrl(mUrl)
            false
        }
    }

    @SuppressLint("WebViewClientOnReceivedSslError")
    override fun onReceivedSslError(
        view: WebView?,
        handler: SslErrorHandler?,
        error: SslError?,
    ) {
        if (userPrefs.developerMode && userPrefs.useWebUiDevUrl) {
            handler?.proceed()
        } else {
            handler?.cancel()
        }
    }

    override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest,
    ): WebResourceResponse? {
        return webViewAssetLoader.shouldInterceptRequest(request.url)
    }
}