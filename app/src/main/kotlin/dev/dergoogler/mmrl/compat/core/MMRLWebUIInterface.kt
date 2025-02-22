package dev.dergoogler.mmrl.compat.core

import android.app.Activity
import android.content.Context
import android.webkit.WebView

open class MMRLWebUIInterface(
    internal val webView: WebView,
    internal val context: Context,
) {
    internal val console = WebViewLog(context, webView)

    internal fun <R, T> runTryJsWith(
        with: T,
        message: String = "Unknown Error",
        block: T.() -> R,
    ): R? = runTryJsWith(with, message, null, block)

    internal fun <R, T> runTryJsWith(
        with: T,
        message: String = "Unknown Error",
        default: R,
        block: T.() -> R,
    ): R {
        return try {
            with(with, block)
        } catch (e: Throwable) {
            (context as Activity).runOnUiThread {
                webView.loadUrl("javascript:(new Error('$message', { cause: \"${e.message}\" }))")
            }
            return default
        }
    }
}

internal class WebViewLog(
    private val context: Context,
    private val webView: WebView,
) {
    fun error(message: String) = (context as Activity).runOnUiThread {
        webView.loadUrl("javascript:(console.error('$message'))")
    }
    fun info(message: String) = (context as Activity).runOnUiThread {
        webView.loadUrl("javascript:(console.info('$message'))")
    }
    fun log(message: String) = (context as Activity).runOnUiThread {
        webView.loadUrl("javascript:(console.log('$message'))")
    }
    fun warn(message: String) = (context as Activity).runOnUiThread {
        webView.loadUrl("javascript:(console.warn('$message'))")
    }
}