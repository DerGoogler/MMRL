package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R

@Composable
fun TopAppBarTitle(
    text: String,
    modifier: Modifier = Modifier
) = Row(
    modifier = modifier,
    horizontalArrangement = Arrangement.Start,
    verticalAlignment = Alignment.CenterVertically
) {
    Text(
        text = text,
        style = MaterialTheme.typography.titleLarge,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
        color = LocalContentColor.current
    )

    if (BuildConfig.IS_DEV_VERSION) {
        Spacer(modifier = Modifier.width(10.dp))
        Icon(
            painter = painterResource(id = R.drawable.ci_label),
            contentDescription = null,
            tint = LocalContentColor.current
        )
    }
}
