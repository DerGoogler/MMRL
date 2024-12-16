package com.dergoogler.mmrl.ui.activity.webui.handlers

import android.webkit.WebResourceResponse
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.CardColors
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
    private val filledTonalButtonColors: ButtonColors,
    private val cardColors: CardColors,
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
            append("    /* App Base Colors */\n")
            append("    --primary: ${colorScheme.primary.toCssValue()};\n")
            append("    --onPrimary: ${colorScheme.onPrimary.toCssValue()};\n")
            append("    --primaryContainer: ${colorScheme.primaryContainer.toCssValue()};\n")
            append("    --onPrimaryContainer: ${colorScheme.onPrimaryContainer.toCssValue()};\n")
            append("    --inversePrimary: ${colorScheme.inversePrimary.toCssValue()};\n")
            append("    --secondary: ${colorScheme.secondary.toCssValue()};\n")
            append("    --onSecondary: ${colorScheme.onSecondary.toCssValue()};\n")
            append("    --secondaryContainer: ${colorScheme.secondaryContainer.toCssValue()};\n")
            append("    --onSecondaryContainer: ${colorScheme.onSecondaryContainer.toCssValue()};\n")
            append("    --tertiary: ${colorScheme.tertiary.toCssValue()};\n")
            append("    --onTertiary: ${colorScheme.onTertiary.toCssValue()};\n")
            append("    --tertiaryContainer: ${colorScheme.tertiaryContainer.toCssValue()};\n")
            append("    --onTertiaryContainer: ${colorScheme.onTertiaryContainer.toCssValue()};\n")
            append("    --background: ${colorScheme.background.toCssValue()};\n")
            append("    --onBackground: ${colorScheme.onBackground.toCssValue()};\n")
            append("    --surface: ${colorScheme.surface.toCssValue()};\n")
            append("    --onSurface: ${colorScheme.onSurface.toCssValue()};\n")
            append("    --surfaceVariant: ${colorScheme.surfaceVariant.toCssValue()};\n")
            append("    --onSurfaceVariant: ${colorScheme.onSurfaceVariant.toCssValue()};\n")
            append("    --surfaceTint: ${colorScheme.surfaceTint.toCssValue()};\n")
            append("    --inverseSurface: ${colorScheme.inverseSurface.toCssValue()};\n")
            append("    --inverseOnSurface: ${colorScheme.inverseOnSurface.toCssValue()};\n")
            append("    --error: ${colorScheme.error.toCssValue()};\n")
            append("    --onError: ${colorScheme.onError.toCssValue()};\n")
            append("    --errorContainer: ${colorScheme.errorContainer.toCssValue()};\n")
            append("    --onErrorContainer: ${colorScheme.onErrorContainer.toCssValue()};\n")
            append("    --outline: ${colorScheme.outline.toCssValue()};\n")
            append("    --outlineVariant: ${colorScheme.outlineVariant.toCssValue()};\n")
            append("    --scrim: ${colorScheme.scrim.toCssValue()};\n")
            append("    --surfaceBright: ${colorScheme.surfaceBright.toCssValue()};\n")
            append("    --surfaceDim: ${colorScheme.surfaceDim.toCssValue()};\n")
            append("    --surfaceContainer: ${colorScheme.surfaceContainer.toCssValue()};\n")
            append("    --surfaceContainerHigh: ${colorScheme.surfaceContainerHigh.toCssValue()};\n")
            append("    --surfaceContainerHighest: ${colorScheme.surfaceContainerHighest.toCssValue()};\n")
            append("    --surfaceContainerLow: ${colorScheme.surfaceContainerLow.toCssValue()};\n")
            append("    --surfaceContainerLowest: ${colorScheme.surfaceContainerLowest.toCssValue()};\n")
            append("    /* Filled Tonal Button Colors */\n")
            append("    --filledTonalButtonContentColor: ${filledTonalButtonColors.contentColor.toCssValue()};\n")
            append("    --filledTonalButtonContainerColor: ${filledTonalButtonColors.containerColor.toCssValue()};\n")
            append("    --filledTonalButtonDisabledContentColor: ${filledTonalButtonColors.disabledContentColor.toCssValue()};\n")
            append("    --filledTonalButtonDisabledContainerColor: ${filledTonalButtonColors.disabledContainerColor.toCssValue()};\n")
            append("    /* Filled Card Colors */\n")
            append("    --filledCardContentColor: ${cardColors.contentColor.toCssValue()};\n")
            append("    --filledCardContainerColor: ${cardColors.containerColor.toCssValue()};\n")
            append("    --filledCardDisabledContentColor: ${cardColors.disabledContentColor.toCssValue()};\n")
            append("    --filledCardDisabledContainerColor: ${cardColors.disabledContainerColor.toCssValue()};\n")
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
        return "#${red.toHex()}${green.toHex()}${blue.toHex()}${alpha.toHex()}"
    }

    private fun Float.toHex(): String {
        return (this * 255).toInt().coerceIn(0, 255).toString(16).padStart(2, '0')
    }

    private fun TextUnit.toCssValue(): String {
        return "${this.value}px"
    }
}
