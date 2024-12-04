package com.dergoogler.mmrl.ui.activity.webui

import android.webkit.WebResourceResponse
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.Typography
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.TextUnit
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
    private val typography: Typography,
) : PathHandler {
    override fun handle(path: String): WebResourceResponse? {
        Timber.d("Handling path: $path")

        return when (path) {
            "insets.css" -> windowInsetsStyle()
            "colors.css" -> appColors()
            "typography.css" -> appTypography()
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
        val cssContent = buildString {
            append(":root {\n")

            ColorScheme::class.memberProperties.forEach { property ->
                val colorValue = property.get(colorScheme)
                colorValue?.let {
                    if (colorValue is Color) {
                        append("    --${property.name}: ${colorValue.toCssValue()};\n")
                    }
                }
            }

            append("}")
        }

        return style(cssContent)
    }

    private fun appTypography(): WebResourceResponse {
        val cssContent = buildString {
            append(":root {\n")

            Typography::class.memberProperties.forEach { property ->
                val textStyle = property.get(typography)
                if (textStyle != null && textStyle is TextStyle) {
                    append("    /* ${property.name} */\n")
                    append("    --${property.name}-color: ${textStyle.color.toCssValue()};\n")
                    append("    --${property.name}-font-size: ${textStyle.fontSize.toCssValue()};\n")
                }
            }
            append("}")
        }

        return style(cssContent)
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

    private fun TextUnit.toCssValue(): String {
        return "${this.value}px"
    }
}
