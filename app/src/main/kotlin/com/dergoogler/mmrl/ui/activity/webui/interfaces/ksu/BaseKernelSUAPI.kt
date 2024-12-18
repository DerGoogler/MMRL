package com.dergoogler.mmrl.ui.activity.webui.interfaces.ksu

import android.app.Activity
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.Window
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import org.json.JSONObject
import java.io.File

open class BaseKernelSUAPI(
    val context: Context,
    val webView: WebView,
    private val modDir: String
) {

    @JavascriptInterface
    fun mmrl(): Boolean {
        return true
    }

    @JavascriptInterface
    fun toast(msg: String) {
        webView.post {
            Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
        }
    }

    @JavascriptInterface
    fun fullScreen(enable: Boolean) {
        if (context is Activity) {
            Handler(Looper.getMainLooper()).post {
                if (enable) {
                    hideSystemUI(context.window)
                } else {
                    showSystemUI(context.window)
                }
            }
        }
    }

    @JavascriptInterface
    fun moduleInfo(): String {
        val currentModuleInfo = JSONObject()
        currentModuleInfo.put("moduleDir", modDir)
        val moduleId = File(modDir).getName()
        currentModuleInfo.put("id", moduleId)
        return currentModuleInfo.toString()
    }
}

fun hideSystemUI(window: Window) =
    WindowInsetsControllerCompat(window, window.decorView).let { controller ->
        controller.hide(WindowInsetsCompat.Type.systemBars())
        controller.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    }

fun showSystemUI(window: Window) =
    WindowInsetsControllerCompat(
        window,
        window.decorView
    ).show(WindowInsetsCompat.Type.systemBars())