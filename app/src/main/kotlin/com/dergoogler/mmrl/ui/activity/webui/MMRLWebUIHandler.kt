package com.dergoogler.mmrl.ui.activity.webui

import android.webkit.WebResourceResponse
import androidx.compose.material3.ColorScheme
import androidx.compose.ui.graphics.Color
import androidx.webkit.WebViewAssetLoader.PathHandler
import timber.log.Timber
import java.io.ByteArrayInputStream
import java.io.InputStream
import java.nio.charset.StandardCharsets
import kotlin.reflect.full.memberProperties


class MMRLWebUIHandler(
    private val topInset: Int,
    private val bottomInset: Int,
    private val colorScheme: ColorScheme,
) : PathHandler {
    override fun handle(path: String): WebResourceResponse? {
        Timber.d("Handling path: $path")

        return when (path) {
            "insets.css" -> windowInsetsStyle()
            "colors.css" -> appColors()
            else -> null
        }
    }

    private fun windowInsetsStyle(): WebResourceResponse {
        val content = """
            :root {
                --window-inset-top: ${topInset}px;
                --window-inset-bottom: ${bottomInset}px;
            }
        """.trimIndent()

        return style(content)
    }

    private fun appColors(): WebResourceResponse {
        val cssContent = StringBuilder(":root {\n")

        ColorScheme::class.memberProperties.forEach { property ->
            val colorValue = property.get(colorScheme)
            colorValue?.let {
                if (colorValue is Color) {
                    cssContent.append("    --${property.name}: ${colorValue.toCssValue()};\n")
                }
            }
        }

        cssContent.append("}")
        return style(cssContent.toString())
    }

    private fun style(content: String): WebResourceResponse {
        val inputStream: InputStream =
            ByteArrayInputStream(content.toByteArray(StandardCharsets.UTF_8))

        return WebResourceResponse(
            "text/css",
            "UTF-8",
            inputStream
        )
    }

    private fun Color.toCssValue(): String {
        return "#${red.toHex()}${green.toHex()}${blue.toHex()}"
    }

    private fun Float.toHex(): String {
        return (this * 255).toInt().coerceIn(0, 255).toString(16).padStart(2, '0')
    }
}
