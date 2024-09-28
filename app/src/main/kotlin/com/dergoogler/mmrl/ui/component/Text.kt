package com.dergoogler.mmrl.ui.component

import android.text.method.LinkMovementMethod
import android.widget.TextView
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.text.HtmlCompat
import io.noties.markwon.Markwon

@Composable
internal fun ProvideContentColorTextStyle(
    contentColor: Color,
    textStyle: TextStyle,
    content: @Composable () -> Unit
) {
    val mergedStyle = LocalTextStyle.current.merge(textStyle)
    CompositionLocalProvider(
        LocalContentColor provides contentColor,
        LocalTextStyle provides mergedStyle,
        content = content
    )
}

@Composable
fun HtmlText(
    text: String,
    modifier: Modifier = Modifier,
    style: TextStyle = LocalTextStyle.current,
    color: Color = LocalContentColor.current,
) {
    val linkTextColor = MaterialTheme.colorScheme.primary.toArgb()
    AndroidView(
        modifier = modifier,
        factory = { TextView(it) },
        update = {
            it.movementMethod = LinkMovementMethod.getInstance()
            it.setLinkTextColor(linkTextColor)
            it.highlightColor = style.background.toArgb()

            it.textSize = style.fontSize.value
            it.setTextColor(color.toArgb())
            it.setBackgroundColor(style.background.toArgb())
            it.text = HtmlCompat.fromHtml(text, HtmlCompat.FROM_HTML_MODE_COMPACT)
        }
    )
}

@Composable
fun MarkdownText(
    text: String,
    modifier: Modifier = Modifier,
    style: TextStyle = LocalTextStyle.current,
    color: Color = LocalContentColor.current,
) {
    val context = LocalContext.current
    val markdown = Markwon.create(context)
    val linkTextColor = MaterialTheme.colorScheme.primary.toArgb()

    AndroidView(
        modifier = modifier,
        factory = { TextView(it) },
        update = {
            it.setLinkTextColor(linkTextColor)
            it.highlightColor = style.background.toArgb()

            it.textSize = style.fontSize.value
            it.setTextColor(color.toArgb())
            it.setBackgroundColor(style.background.toArgb())
            markdown.setMarkdown(it, text)
        }
    )
}