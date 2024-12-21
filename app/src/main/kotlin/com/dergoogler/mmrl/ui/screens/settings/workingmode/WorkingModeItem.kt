package com.dergoogler.mmrl.ui.screens.settings.workingmode

import androidx.annotation.DrawableRes
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.ListButtonItem
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
fun WorkingModeItem(
    title: String,
    desc: String,
    @DrawableRes icon: Int? = null,
    selected: Boolean = false,
    onClick: () -> Unit,
) = ListButtonItem(
    icon = icon,
    title = title,
    desc = desc,
    onClick = onClick,
    labels = selected nullable listOf {
        LabelItem(
            text = stringResource(id = R.string.selected)
        )
    }
)