package com.dergoogler.mmrl.ui.activity.webui

import android.annotation.SuppressLint
import android.view.ViewGroup
import android.webkit.WebView
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.systemBars
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewAssetLoader
import com.dergoogler.mmrl.datastore.developerMode
import com.dergoogler.mmrl.ui.activity.webui.handlers.MMRLWebClient
import com.dergoogler.mmrl.ui.activity.webui.handlers.MMRLWebUIHandler
import com.dergoogler.mmrl.ui.activity.webui.handlers.SuFilePathHandler
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.WebUIViewModel
import dev.dergoogler.mmrl.compat.core.MMRLUriHandlerImpl
import timber.log.Timber


@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebUIScreen(
    viewModel: WebUIViewModel,
) {
    val context = LocalContext.current
    val userPrefs = LocalUserPreferences.current
    val density = LocalDensity.current
    val browser = LocalUriHandler.current as MMRLUriHandlerImpl
    val colorScheme = MaterialTheme.colorScheme
    val typography = MaterialTheme.typography
    val filledTonalButtonColors = ButtonDefaults.filledTonalButtonColors()
    val cardColors = CardDefaults.cardColors()
    val isDarkMode = userPrefs.isDarkMode()

    val webView = WebView(context)
    WebView.setWebContentsDebuggingEnabled(userPrefs.developerMode)

    val insets = WindowInsets.systemBars
    LaunchedEffect(Unit) {
        viewModel.initInsets(density, insets)
        Timber.d("Insets calculated: top = ${viewModel.topInset}, bottom = ${viewModel.bottomInset}")
    }

    DisposableEffect(Unit) {
        onDispose {
            viewModel.destroyJavascriptInterfaces(webView)
            webView.destroy()
        }
    }

    if (viewModel.topInset != null && viewModel.bottomInset != null) {
        val webViewAssetLoader = remember(viewModel.topInset, viewModel.bottomInset) {
            WebViewAssetLoader.Builder()
                .setDomain("mui.kernelsu.org")
                .addPathHandler(
                    "/",
                    SuFilePathHandler(
                        directory = viewModel.webRoot,
                        useShell = userPrefs.useShellToLoadWebUIAssets,
                        shell = viewModel.rootShell,
                    )
                )
                .addPathHandler(
                    "/mmrl/",
                    MMRLWebUIHandler(
                        topInset = viewModel.topInset,
                        bottomInset = viewModel.bottomInset,
                        colorScheme = colorScheme,
                        typography = typography,
                        filledTonalButtonColors = filledTonalButtonColors,
                        cardColors = cardColors
                    )
                )
                .build()
        }

        AndroidView(
            factory = {
                webView.apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )

                    ViewCompat.setOnApplyWindowInsetsListener(this) { _, _ ->
                        WindowInsetsCompat.CONSUMED
                    }

                    webViewClient = MMRLWebClient(
                        context = context,
                        browser = browser,
                        webViewAssetLoader = webViewAssetLoader,
                        userPrefs = userPrefs,
                        viewModel = viewModel,
                    )

                    viewModel.createJavascriptInterfaces(
                        webView = this,
                        isDarkMode = isDarkMode
                    )
                }
            },
            update = { webview ->
                webview.settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    allowFileAccess = false
                    userPrefs.developerMode({ useWebUiDevUrl }) {
                        mixedContentMode =
                            android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                    }
                    userAgentString = "DON'T TRACK ME DOWN MOTHERFUCKER!"
                }
                webview.loadUrl(viewModel.domainUrl)
            }
        )
    } else {
        Loading()
    }
}
