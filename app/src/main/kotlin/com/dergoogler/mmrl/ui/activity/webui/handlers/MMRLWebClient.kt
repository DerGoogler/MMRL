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

    override fun onPageFinished(view: WebView, url: String?) {
        val allowInjectEruda = viewModel.modId in userPrefs.injectEruda

        if (allowInjectEruda) {
            view.loadUrl(
                """
            javascript:(() => {
                const head = document.getElementsByTagName("head")[0];
                const script = document.createElement("script");
                script.type = "module";
                script.innerText = `import eruda from "https://mui.kernelsu.org/mmrl/assets/eruda.mjs"; 
                    eruda.init();
                    const sheet = new CSSStyleSheet();
                    sheet.replaceSync('.eruda-dev-tools { padding-bottom: var(--window-inset-bottom) }');
                    window.eruda.shadowRoot.adoptedStyleSheets.push(sheet)
                `;
                head.insertBefore(script, head.firstChild);
            })()
      """
            )
        }
        super.onPageFinished(view, url)
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