package com.dergoogler.mmrl.ui.activity.webui.interfaces.mmrl

import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.viewmodel.WebUIViewModel

class VersionInterface(
    private val context: Context,
    private val webView: WebView,
    private val viewModel: WebUIViewModel,
) {
    inner class BuildConfigDetails {
        @get:JavascriptInterface
        val applicationId = BuildConfig.APPLICATION_ID

        @get:JavascriptInterface
        val buildType = BuildConfig.BUILD_TYPE

        @get:JavascriptInterface
        val versionCode = BuildConfig.VERSION_CODE

        @get:JavascriptInterface
        val versionName = BuildConfig.VERSION_NAME

        @get:JavascriptInterface
        val isDevVersion: Boolean = BuildConfig.IS_DEV_VERSION

        @get:JavascriptInterface
        val isGooglePlayBuild: Boolean = BuildConfig.IS_GOOGLE_PLAY_BUILD
    }

    inner class RootConfigDetails {
        @get:JavascriptInterface
        val platform = viewModel.platform.current

        @get:JavascriptInterface
        val versionName = viewModel.versionName

        @get:JavascriptInterface
        val versionCode = viewModel.versionCode
    }

    @get:JavascriptInterface
    val buildConfig get() = BuildConfigDetails()

    @get:JavascriptInterface
    val rootConfig get() = RootConfigDetails()

    inner class ToastBuilderInterface {
        private val toast = Toast(context)

        @JavascriptInterface
        fun setText(msg: String) {
            toast.setText(msg)
        }

        @JavascriptInterface
        fun show() {
            webView.post {
                toast.show()
            }
        }

        @JavascriptInterface
        fun cancel() {
            webView.post {
                toast.cancel()
            }
        }

        @JavascriptInterface
        fun setDuration(duration: Int) {
            toast.duration = duration
        }
    }
    
    @JavascriptInterface
    fun toastBuilder(): ToastBuilderInterface {
        return ToastBuilderInterface()
    }
}