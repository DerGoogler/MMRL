package com.dergoogler.mmrl.ui.activity.webui

import android.annotation.SuppressLint
import android.view.ViewGroup
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.systemBars
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.net.toUri
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.webkit.WebViewAssetLoader
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.activity.webui.handlers.MMRLWebUIHandler
import com.dergoogler.mmrl.ui.activity.webui.handlers.SuFilePathHandler
import com.dergoogler.mmrl.ui.activity.webui.interfaces.ksu.AdvancedKernelSUAPI
import com.dergoogler.mmrl.ui.activity.webui.interfaces.ksu.BaseKernelSUAPI
import com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl.FileInterface
import com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl.MMRLInterface
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.WebUIViewModel
import dev.dergoogler.mmrl.compat.core.MMRLUriHandlerImpl
import timber.log.Timber
import java.io.File


@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebUIScreen(
    modId: String,
    viewModel: WebUIViewModel = hiltViewModel(),
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

    val rootShell = viewModel.createRootShell(
        globalMnt = true,
        devMode = userPrefs.developerMode
    )

    WebView.setWebContentsDebuggingEnabled(userPrefs.developerMode)

    val moduleDir = "/data/adb/modules/$modId"
    val webRoot = File("$moduleDir/webroot")
    val domainSafeRegex = Regex("^https?://mui\\.kernelsu\\.org(/.*)?$")

    var topInset by remember { mutableIntStateOf(0) }
    var bottomInset by remember { mutableIntStateOf(0) }

    val allowedFsApi = modId in userPrefs.allowedFsModules
    val allowedKsuApi = modId in userPrefs.allowedKsuModules

    val insets = WindowInsets.systemBars
    LaunchedEffect(Unit) {
        topInset = (insets.getTop(density) / density.density).toInt()
        bottomInset = (insets.getBottom(density) / density.density).toInt()

        Timber.d("Insets calculated: top = $topInset, bottom = $bottomInset")
    }

    val webViewAssetLoader = remember(topInset, bottomInset) {
        WebViewAssetLoader.Builder()
            .setDomain("mui.kernelsu.org")
            .addPathHandler(
                "/",
                SuFilePathHandler(
                    context,
                    webRoot,
                    rootShell
                )
            )
            .addPathHandler(
                "/mmrl/",
                MMRLWebUIHandler(
                    topInset = topInset,
                    bottomInset = bottomInset,
                    colorScheme = colorScheme,
                    typography = typography,
                    filledTonalButtonColors = filledTonalButtonColors,
                    cardColors = cardColors
                )
            )
            .build()
    }

    if (topInset != 0 && bottomInset != 0) {
        AndroidView(
            factory = {
                WebView(context).apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )

                    ViewCompat.setOnApplyWindowInsetsListener(this) { _, _ ->
                        WindowInsetsCompat.CONSUMED
                    }

                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(
                            view: WebView,
                            request: WebResourceRequest?,
                        ): Boolean {
                            val mUrl = request?.url?.toString() ?: return false

                            return if (!domainSafeRegex.matches(mUrl)) {
                                browser.openUri(
                                    uri = mUrl,
                                    onSuccess = { intent, uri ->
                                        intent.launchUrl(context, uri.toUri())
                                        Toast.makeText(
                                            context,
                                            context.getString(R.string.unsafe_url_redirecting, uri),
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

                        override fun shouldInterceptRequest(
                            view: WebView,
                            request: WebResourceRequest,
                        ): WebResourceResponse? {
                            return webViewAssetLoader.shouldInterceptRequest(request.url)
                        }
                    }

                    addJavascriptInterface(
                        if (allowedKsuApi) {
                            AdvancedKernelSUAPI(
                                context,
                                this,
                                moduleDir,
                                viewModel,
                                userPrefs
                            )
                        } else {
                            BaseKernelSUAPI(
                                context,
                                this,
                                moduleDir
                            )
                        }, "ksu"
                    )

                    addJavascriptInterface(
                        MMRLInterface(
                            topInset = topInset,
                            bottomInset = bottomInset,
                            context = context,
                            isDark = isDarkMode,
                            webview = this,
                            managerName = viewModel.managerName,
                            managerVersionCode = viewModel.versionCode,
                            managerVersionName = viewModel.versionName
                        ), "$${viewModel.sanitizeModId(modId)}"
                    )

                    if (allowedFsApi) {
                        addJavascriptInterface(
                            FileInterface(
                                context = context,
                                allowRestrictedPaths = userPrefs.webuiAllowRestrictedPaths,
                                webView = this
                            ),
                            "$${viewModel.sanitizeModIdWithFile(modId)}File"
                        )
                    }
                }
            },
            update = { webview ->
                webview.settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    allowFileAccess = false
                    userAgentString = "DON'T TRACK ME DOWN MOTHERFUCKER!"
                }
                webview.loadUrl("https://mui.kernelsu.org/index.html")
            }
        )
    } else {
        Loading()
    }
}
