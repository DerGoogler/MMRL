package com.dergoogler.mmrl.ui.component.listItem

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.thenComposeInvoke

@Composable
internal fun BaseListContent(
    modifier: Modifier = Modifier,
    title: String,
    desc: (@Composable ColumnScope.() -> Unit)? = null,
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle,
    labels: List<@Composable RowScope.() -> Unit>? = null,
) {
    Column(
        modifier = modifier.fillMaxWidth(), verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = title, style = itemTextStyle.titleTextStyle, color = itemTextStyle.titleTextColor
        )
        desc?.let {
            it()
        }
        labels?.let {
            Row(
                modifier = Modifier.padding(top = 5.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                it.forEach { label ->
                    label()
                }
            }
        }
    }
}

@Composable
internal fun BaseListContent(
    modifier: Modifier = Modifier,
    title: String,
    desc: String? = null,
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle,
    learnMore: (() -> Unit)? = null,
    labels: List<@Composable RowScope.() -> Unit>? = null,
) = BaseListContent(
    modifier = modifier,
    title = title,
    desc = desc.thenComposeInvoke<String, ColumnScope> { s ->
        Text(
            text = s,
            style = itemTextStyle.descTextStyle,
            color = itemTextStyle.descTextColor
        )
        learnMore.nullable {
            Text(
                modifier = Modifier.clickable(
                    onClick = it
                ),
                text = stringResource(R.string.learn_more),
                style = itemTextStyle.descTextStyle,
                color = MaterialTheme.colorScheme.primary
            )
        }
    },
    itemTextStyle = itemTextStyle,
    labels = labels
)