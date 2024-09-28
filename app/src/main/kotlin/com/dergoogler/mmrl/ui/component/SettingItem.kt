package com.dergoogler.mmrl.ui.component

import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.calculateStartPadding
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.selection.toggleable
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp

@Composable
fun SettingNormalItem(
    title: String,
    desc: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp,  horizontal = 25.dp),
    itemTextStyle: SettingItemTextStyle = SettingItemDefaults.itemStyle(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true,
) {
    val layoutDirection = LocalLayoutDirection.current
    val start by remember {
        derivedStateOf { contentPaddingValues.calculateStartPadding(layoutDirection) }
    }

    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .clickable(
                enabled = enabled,
                onClick = onClick,
                interactionSource = interactionSource,
                indication = rememberRipple()
            )
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        icon?.let {
            Icon(
                modifier = Modifier.size(SettingItemDefaults.IconSize),
                painter = painterResource(id = icon),
                contentDescription = null,
                tint = LocalContentColor.current
            )

            Spacer(modifier = Modifier.width(start))
        }

        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = title,
                style = itemTextStyle.titleTextStyle,
                color = itemTextStyle.titleTextColor
            )

            Text(
                text = desc,
                style = itemTextStyle.descTextStyle,
                color = itemTextStyle.descTextColor
            )
        }
    }
}

@Composable
fun SettingSwitchItem(
    title: String,
    desc: String,
    checked: Boolean,
    onChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp,  horizontal = 25.dp),
    itemTextStyle: SettingItemTextStyle = SettingItemDefaults.itemStyle(),
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    @DrawableRes icon: Int? = null,
    enabled: Boolean = true
) {
    val layoutDirection = LocalLayoutDirection.current
    val start by remember {
        derivedStateOf { contentPaddingValues.calculateStartPadding(layoutDirection) }
    }

    Row(
        modifier = modifier
            .alpha(alpha = if (enabled) 1f else 0.5f)
            .toggleable(
                value = checked,
                enabled = enabled,
                onValueChange = onChange,
                role = Role.Switch,
                interactionSource = interactionSource,
                indication = rememberRipple()
            )
            .padding(contentPaddingValues)
            .fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        icon?.let {
            Icon(
                modifier = Modifier.size(SettingItemDefaults.IconSize),
                painter = painterResource(id = icon),
                contentDescription = null
            )

            Spacer(modifier = Modifier.width(start))
        }

        Column(
            modifier = Modifier
                .weight(1f)
                .padding(end = SettingItemDefaults.TextSwitchPadding),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = title,
                style = itemTextStyle.titleTextStyle,
                color = itemTextStyle.titleTextColor
            )

            Text(
                text = desc,
                style = itemTextStyle.descTextStyle,
                color = itemTextStyle.descTextColor
            )
        }

        Switch(
            checked = checked,
            onCheckedChange = null
        )
    }
}

@Immutable
class SettingItemTextStyle internal constructor(
    val titleTextColor: Color,
    val descTextColor: Color,
    val titleTextStyle: TextStyle,
    val descTextStyle: TextStyle
) {
    @Suppress("RedundantIf")
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || other !is SettingItemTextStyle) return false

        if (titleTextColor != other.titleTextColor) return false
        if (descTextColor != other.descTextColor) return false
        if (titleTextStyle != other.titleTextStyle) return false
        if (descTextStyle != other.descTextStyle) return false

        return true
    }

    override fun hashCode(): Int {
        var result = titleTextColor.hashCode()
        result = 31 * result + descTextColor.hashCode()
        result = 31 * result + titleTextStyle.hashCode()
        result = 31 * result + descTextStyle.hashCode()
        return result
    }
}

object SettingItemDefaults {
    val IconSize = 24.dp
    val TextSwitchPadding = 16.dp

    @Composable
    fun itemStyle(
        titleTextColor: Color = LocalContentColor.current,
        descTextColor: Color = MaterialTheme.colorScheme.outline,
        titleTextStyle: TextStyle = MaterialTheme.typography.bodyLarge,
        descTextStyle: TextStyle = MaterialTheme.typography.bodyMedium
    ) = SettingItemTextStyle(
        titleTextColor = titleTextColor,
        descTextColor = descTextColor,
        titleTextStyle = titleTextStyle,
        descTextStyle = descTextStyle
    )
}