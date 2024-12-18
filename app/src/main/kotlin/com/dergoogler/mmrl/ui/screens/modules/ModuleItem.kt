package com.dergoogler.mmrl.ui.screens.modules

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.local.State
import com.dergoogler.mmrl.model.local.versionDisplay
import com.dergoogler.mmrl.ui.component.TextWithIcon
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.ext.takeTrue
import dev.dergoogler.mmrl.compat.ext.toFormattedDateSafely

@Composable
fun ModuleItem(
    module: LocalModule,
    progress: Float,
    indeterminate: Boolean = false,
    alpha: Float = 1f,
    decoration: TextDecoration = TextDecoration.None,
    switch: @Composable (() -> Unit?)? = null,
    indicator: @Composable (BoxScope.() -> Unit?)? = null,
    startTrailingButton: (@Composable RowScope.() -> Unit)? = null,
    trailingButton: @Composable RowScope.() -> Unit,
) = Surface(
    color = MaterialTheme.colorScheme.surface,
    tonalElevation = 1.dp,
    shape = RoundedCornerShape(20.dp)
) {
    val userPreferences = LocalUserPreferences.current
    val menu = userPreferences.modulesMenu
    val context = LocalContext.current
    val openWebUi = Modifier.clickable(
        onClick = {
            MMRLComponentActivity.startWebUIActivity(
                context = context,
                modId = module.id
            )
        }
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .then(if (module.runners.webui && module.state != State.REMOVE) openWebUi else Modifier),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(all = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(
                    modifier = Modifier
                        .alpha(alpha = alpha)
                        .weight(1f),
                    verticalArrangement = Arrangement.spacedBy(2.dp)
                ) {

                    val icon =
                        if (module.state != State.REMOVE) R.drawable.world_code else R.drawable.world_off

                    TextWithIcon(
                        text = module.name,
                        icon = if (module.runners.webui) icon else null,
                        style = MaterialTheme.typography.titleSmall
                    )

                    Text(
                        text = stringResource(
                            id = R.string.module_version_author,
                            module.versionDisplay, module.author
                        ),
                        style = MaterialTheme.typography.bodySmall,
                        textDecoration = decoration,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    if (module.lastUpdated != 0L && menu.showUpdatedTime) {
                        Text(
                            text = stringResource(
                                id = R.string.module_update_at,
                                module.lastUpdated.toFormattedDateSafely
                            ),
                            style = MaterialTheme.typography.bodySmall,
                            textDecoration = decoration,
                            color = MaterialTheme.colorScheme.outline
                        )
                    }

                    userPreferences.developerMode.takeTrue {
                        Text(
                            text = stringResource(R.string.module_id, module.id),
                            style = MaterialTheme.typography.bodySmall,
                            textDecoration = decoration,
                            color = MaterialTheme.colorScheme.outline
                        )
                    }
                }

                switch?.invoke()
            }

            Text(
                modifier = Modifier
                    .alpha(alpha = alpha)
                    .padding(horizontal = 16.dp),
                text = module.description,
                style = MaterialTheme.typography.bodySmall,
                textDecoration = decoration,
                color = MaterialTheme.colorScheme.outline
            )

            when {
                indeterminate -> LinearProgressIndicator(
                    strokeCap = StrokeCap.Round,
                    modifier = Modifier
                        .padding(top = 8.dp)
                        .height(2.dp)
                        .fillMaxWidth()
                )

                progress != 0f -> LinearProgressIndicator(
                    progress = { progress },
                    strokeCap = StrokeCap.Round,
                    modifier = Modifier
                        .padding(top = 8.dp)
                        .height(1.5.dp)
                        .fillMaxWidth()
                )

                else -> HorizontalDivider(
                    thickness = 1.5.dp,
                    color = MaterialTheme.colorScheme.surface,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }

            Row(
                modifier = Modifier
                    .padding(horizontal = 16.dp, vertical = 8.dp)
                    .fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                startTrailingButton?.invoke(this)
                Spacer(modifier = Modifier.weight(1f))
                trailingButton.invoke(this)
            }
        }

        indicator?.invoke(this)
    }
}

@Composable
fun StateIndicator(
    @DrawableRes icon: Int,
    color: Color = MaterialTheme.colorScheme.outline,
) = Image(
    modifier = Modifier.requiredSize(150.dp),
    painter = painterResource(id = icon),
    contentDescription = null,
    alpha = 0.1f,
    colorFilter = ColorFilter.tint(color)
)
