package com.dergoogler.mmrl.ui.component

import android.annotation.SuppressLint
import android.text.SpannableStringBuilder
import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.core.text.HtmlCompat
import dev.dergoogler.mmrl.compat.ext.thenComposeInvoke
import dev.dergoogler.mmrl.compat.ext.toAnnotatedString

@Composable
internal fun ProvideContentColorTextStyle(
    contentColor: Color,
    textStyle: TextStyle,
    content: @Composable () -> Unit,
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
    onClick: (() -> Unit)? = null,
) {
    val spannableString = SpannableStringBuilder(text).toString()
    val spanned = HtmlCompat.fromHtml(spannableString, HtmlCompat.FROM_HTML_MODE_COMPACT)

    Text(
        modifier = if (onClick != null) {
            modifier.clickable(
                onClick = onClick
            )
        } else {
            modifier
        },
        style = style,
        color = color,
        text = spanned.toAnnotatedString()
    )
}

@Composable
fun BulletList(
    modifier: Modifier = Modifier,
    style: TextStyle = LocalTextStyle.current,
    indent: Dp = 20.dp,
    lineSpacing: Dp = 0.dp,
    items: List<String>,
    onItemClick: () -> Unit = {},
) = Column(modifier = modifier) {
    items.forEach {
        Row {
            Text(
                text = "\u2022",
                style = style.copy(textAlign = TextAlign.Center),
                modifier = Modifier.width(indent),
            )
            HtmlText(
                text = it,
                style = style,
                modifier = Modifier.weight(1f, fill = true),
                onClick = onItemClick
            )
        }
        if (lineSpacing > 0.dp && it != items.last()) {
            Spacer(modifier = Modifier.height(lineSpacing))
        }
    }
}

@Composable
fun TextWithIcon(
    text: (@Composable RowScope.(TextStyle) -> Unit)? = null,
    icon: (@Composable RowScope.(Dp) -> Unit)? = null,
    style: TextStyle = LocalTextStyle.current,
    @SuppressLint("ModifierParameter") rowModifier: Modifier = Modifier,
    iconScalingFactor: Float = 1.4285715f,
    spacing: Float = 11.428572f,
    /**
     * Moved the icon to the right of the text.
     */
    rightIcon: Boolean = false,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Center,
    verticalAlignment: Alignment.Vertical = Alignment.CenterVertically,
) {
    if (text == null && icon == null) return

    val iconSize = with(LocalDensity.current) { style.fontSize.toDp() * iconScalingFactor }
    val spacer = with(LocalDensity.current) { spacing.toDp() }

    Row(
        modifier = rowModifier,
        verticalAlignment = verticalAlignment,
        horizontalArrangement = horizontalArrangement
    ) {
        if (icon != null && !rightIcon) {
            icon(iconSize)
            Spacer(modifier = Modifier.width(spacer))
        }
        if (text != null) {
            text(style)
        }
        if (icon != null && rightIcon) {
            Spacer(modifier = Modifier.width(spacer))
            icon(iconSize)
        }
    }
}

@Composable
fun TextWithIcon(
    text: String,
    @SuppressLint("ModifierParameter") iconModifier: Modifier = Modifier,
    @SuppressLint("ModifierParameter") rowModifier: Modifier = Modifier,
    textModifier: Modifier = Modifier,
    @DrawableRes icon: Int? = null,
    style: TextStyle = LocalTextStyle.current,
    contentDescription: String? = null,
    tint: Color = LocalContentColor.current,
    iconScalingFactor: Float = 1.4285715f,
    spacing: Float = 11.428572f,
    maxLines: Int = Int.MAX_VALUE,
    overflow: TextOverflow = TextOverflow.Clip,
    showText: Boolean = true,
    /**
     * Moved the icon to the right of the text.
     */
    rightIcon: Boolean = false,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    verticalAlignment: Alignment.Vertical = Alignment.CenterVertically,
) = TextWithIcon(
    rowModifier = rowModifier,
    style = style,
    iconScalingFactor = iconScalingFactor,
    spacing = spacing,
    rightIcon = rightIcon,
    text = text.thenComposeInvoke<String, RowScope, TextStyle>(showText) { it, stl ->
        Text(
            text = it,
            style = stl,
            modifier = textModifier,
            maxLines = maxLines,
            overflow = overflow,
        )
    },
    icon = icon.thenComposeInvoke<Int, RowScope, Dp> { it, size ->
        Icon(
            painter = painterResource(id = it),
            contentDescription = contentDescription,
            tint = tint,
            modifier = Modifier
                .size(size)
                .then(iconModifier)
        )
    },
    verticalAlignment = verticalAlignment,
    horizontalArrangement = horizontalArrangement
)
