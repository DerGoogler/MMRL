package com.dergoogler.mmrl.ui.screens.home.items

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.Platform
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.card.Card
import com.dergoogler.mmrl.ui.component.card.CardDefaults
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.takeTrue

@Composable
internal fun RootItem(
    isAlive: Boolean,
    platform: Platform,
    versionCode: Int,
    developerMode: Boolean = false,
    onClick: () -> Unit = {},
) = Card(
    modifier = {
        column = Modifier.padding(20.dp)
    },
    style = CardDefaults.cardStyle.copy(
        containerColor = MaterialTheme.colorScheme.secondaryContainer
    ),
    onClick = developerMode nullable onClick,
    absolute = {
        developerMode.takeTrue {
            Surface(
                shape = RoundedCornerShape(
                    topEnd = 20.dp,
                    bottomStart = 15.dp,
                    bottomEnd = 0.dp
                ),
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier
                    .align(Alignment.TopEnd)
            ) {
                Text(
                    text = "USER!DEV",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onPrimary,
                    modifier = Modifier
                        .padding(horizontal = 16.dp, vertical = 8.dp)
                )
            }
        }
    }
) {
    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            modifier = Modifier.size(45.dp),
            painter = painterResource(
                id = if (isAlive) {
                    when {
                        platform.isMagisk -> R.drawable.magisk_logo
                        platform.isKernelSU -> R.drawable.kernelsu_logo
                        platform.isKernelSuNext -> R.drawable.kernelsu_next_logo
                        platform.isAPatch -> R.drawable.brand_android
                        else -> R.drawable.circle_check_filled
                    }
                } else {
                    R.drawable.alert_circle_filled
                }
            ),
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.width(16.dp))
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = if (isAlive) {
                    stringResource(
                        id = R.string.settings_root_access,
                        stringResource(id = R.string.settings_root_granted)
                    )
                } else {
                    stringResource(
                        id = R.string.settings_root_access,
                        stringResource(id = R.string.settings_root_none)
                    )
                },
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )

            Text(
                text = if (isAlive) {
                    stringResource(
                        id = R.string.settings_root_provider,
                        stringResource(
                            id = when {
                                platform.isMagisk -> R.string.working_mode_magisk_title
                                platform.isKernelSU -> R.string.working_mode_kernelsu_title
                                platform.isKernelSuNext -> R.string.working_mode_kernelsu_next_title
                                platform.isAPatch -> R.string.working_mode_apatch_title
                                else -> R.string.settings_root_none
                            }
                        )
                    )
                } else {
                    stringResource(
                        id = R.string.settings_root_provider,
                        stringResource(id = R.string.settings_root_not_available)
                    )
                },
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )

            Text(
                text = if (isAlive) {
                    stringResource(
                        id = R.string.settings_root_version,
                        versionCode
                    )
                } else {
                    stringResource(
                        id = R.string.settings_root_version,
                        stringResource(id = R.string.settings_root_none)
                    )
                },
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )
        }
    }
}