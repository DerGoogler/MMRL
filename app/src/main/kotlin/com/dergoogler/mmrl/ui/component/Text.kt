package com.dergoogler.mmrl.ui.component

import android.annotation.SuppressLint
import android.text.SpannableStringBuilder
import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
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
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.core.text.HtmlCompat
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
    text: @Composable (TextStyle) -> Unit,
    icon: (@Composable (Dp) -> Unit)? = null,
    style: TextStyle = LocalTextStyle.current,
    iconScalingFactor: Float = 1.4285715f,
    spacingDp: Float = 11.428572f,
) {

    val iconSize = with(LocalDensity.current) { style.fontSize.toDp() * iconScalingFactor }
    val spacer = with(LocalDensity.current) { spacingDp.toDp() }

    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (icon != null) {
            icon(iconSize)
            Spacer(modifier = Modifier.width(spacer))
        }
        text(style)
    }
}

@Composable
fun TextWithIcon(
    text: String,
    @SuppressLint("ModifierParameter") iconModifier: Modifier = Modifier,
    textModifier: Modifier = Modifier,
    @DrawableRes icon: Int? = null,
    style: TextStyle = LocalTextStyle.current,
    contentDescription: String? = null,
    tint: Color = LocalContentColor.current,
    iconScalingFactor: Float = 1.4285715f,
    spacingDp: Float = 11.428572f,
) = TextWithIcon(
    style = style,
    iconScalingFactor = iconScalingFactor,
    spacingDp = spacingDp,
    text = { stl ->
        Text(
            text = text,
            style = stl,
            modifier = textModifier
        )
    },
    icon = if (icon != null) { size ->
        Icon(
            painter = painterResource(id = icon),
            contentDescription = contentDescription,
            tint = tint,
            modifier = Modifier
                .size(size)
                .then(iconModifier)
        )
    } else null
)
