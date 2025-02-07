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
import com.dergoogler.mmrl.ui.activity.webui.interfaces.ksu.AdvancedKernelSUAPI
import com.dergoogler.mmrl.ui.activity.webui.interfaces.ksu.BaseKernelSUAPI
import com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl.FileInterface
import com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl.MMRLInterface
import com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl.VersionInterface
import com.dergoogler.mmrl.ui.component.ConfirmDialog
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.viewmodel.SettingsViewModel
import com.dergoogler.mmrl.viewmodel.WebUIViewModel
import dev.dergoogler.mmrl.compat.core.MMRLUriHandlerImpl
import timber.log.Timber


@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebUIScreen(
    viewModel: WebUIViewModel,
    settingsViewModel: SettingsViewModel,
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
            webView.destroy()
        }
    }


    val allowedFsApi = viewModel.modId in userPrefs.allowedFsModules
    val allowedKsuApi = viewModel.modId in userPrefs.allowedKsuModules

    if (!allowedKsuApi && viewModel.dialogRequestAdvancedKernelSUAPI) {
        ConfirmDialog(
            title = "Allow Advanced Kernel SU API?",
            description = "Allow this module to access the Advanced Kernel SU API? If you don't feel secure with this module, don't allow it!",
            onClose = {
                viewModel.dialogRequestAdvancedKernelSUAPI = false
            },
            onConfirm = {
                viewModel.dialogRequestAdvancedKernelSUAPI = false
                val newModules = userPrefs.allowedKsuModules + viewModel.modId
                settingsViewModel.setAllowedKsuModules(newModules)
            }
        )
    }

    if (!allowedFsApi && viewModel.dialogRequestFileSystemAPI) {
        ConfirmDialog(
            title = "Allow FileSystem API?",
            description = "Allow this module to access the FileSystem API? If you don't feel secure with this module, don't allow it!",
            onClose = {
                viewModel.dialogRequestFileSystemAPI = false
            },
            onConfirm = {
                viewModel.dialogRequestFileSystemAPI = false
                val newModules = userPrefs.allowedFsModules + viewModel.modId
                settingsViewModel.setAllowedFsModules(newModules)
            }
        )
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
                    "/mmrl/assets/",
                    WebViewAssetLoader.AssetsPathHandler(context)
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

                    addJavascriptInterface(
                        VersionInterface(
                            context = context,
                            webView = this,
                            viewModel = viewModel,
                        ), "mmrl"
                    )
                }
            },
            update = {
                it.apply {
                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        allowFileAccess = false
                        userPrefs.developerMode({ useWebUiDevUrl }) {
                            mixedContentMode =
                                android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        }
                        userAgentString = "DON'T TRACK ME DOWN MOTHERFUCKER!"
                    }

                    addJavascriptInterface(
                        MMRLInterface(
                            viewModel = viewModel,
                            context = context,
                            isDark = isDarkMode,
                            webview = this,
                            allowedFsApi = allowedFsApi,
                            allowedKsuApi = allowedKsuApi
                        ), "$${viewModel.sanitizedModId}"
                    )

                    addJavascriptInterface(
                        if (allowedKsuApi) {
                            AdvancedKernelSUAPI(context, this, viewModel.moduleDir, userPrefs)
                        } else {
                            BaseKernelSUAPI(context, this, viewModel.moduleDir)
                        }, "ksu"
                    )

                    if (allowedFsApi) {
                        addJavascriptInterface(
                            FileInterface(this, context),
                            viewModel.sanitizedModIdWithFile
                        )
                    }

                    loadUrl(viewModel.domainUrl)
                }
            }
        )
    } else {
        Loading()
    }
}
