package com.dergoogler.mmrl.ui.screens.settings.repositories

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.compose.animation.Crossfade
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.state.RepoState
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.expandedShape
import ext.dergoogler.mmrl.ext.launchCustomTab
import ext.dergoogler.mmrl.ext.shareText
import ext.dergoogler.mmrl.ext.toFormattedDate
import ext.dergoogler.mmrl.ext.toFormattedDateSafely

@Composable
fun RepositoryItem(
    repo: RepoState,
    toggle: (Boolean) -> Unit,
    update: () -> Unit,
    delete: () -> Unit,
) = Surface(
    shape = RoundedCornerShape(15.dp),
    color = MaterialTheme.colorScheme.surface,
    tonalElevation = 1.dp,
    onClick = { toggle(!repo.enable) },
) {
    val userPreferences = LocalUserPreferences.current
    val context = LocalContext.current
    val (alpha, textDecoration) = when {
        !repo.compatible -> 0.5f to TextDecoration.LineThrough
        !repo.enable -> 0.5f to TextDecoration.None
        else -> 1f to TextDecoration.None
    }

    Column(
        modifier = Modifier
            .padding(all = 15.dp)
            .fillMaxWidth()
    ) {
        Row(
            verticalAlignment = Alignment.Top
        ) {
            Crossfade(
                targetState = repo.enable,
                label = "RepositoryItem"
            ) {
                if (it) {
                    Icon(
                        modifier = Modifier.size(32.dp),
                        painter = painterResource(id = R.drawable.circle_check_filled),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.secondary
                    )
                } else {
                    Icon(
                        modifier = Modifier.size(32.dp),
                        painter = painterResource(id = R.drawable.circle_x_filled),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.secondary
                    )
                }
            }

            Spacer(modifier = Modifier.width(12.dp))
            Column(
                modifier = Modifier
                    .weight(1f)
                    .alpha(alpha),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    text = repo.name,
                    style = MaterialTheme.typography.titleSmall
                        .copy(fontWeight = FontWeight.Bold),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    textDecoration = textDecoration
                )

                Text(
                    text = stringResource(
                        id = R.string.module_update_at,
                        repo.timestamp.toFormattedDateSafely(userPreferences.datePattern)
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline,
                    textDecoration = textDecoration
                )
            }

            if (repo.compatible) {
                LabelItem(
                    text = stringResource(id = R.string.repo_modules, repo.size),
                    upperCase = false
                )
            } else {
                LabelItem(
                    text = stringResource(id = R.string.repo_incompatible),
                    containerColor = MaterialTheme.colorScheme.error,
                    contentColor = MaterialTheme.colorScheme.onError
                )
            }
        }

        Row(
            modifier = Modifier.padding(top = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            var open by remember { mutableStateOf(false) }
            if (open) {
                BottomSheet(
                    repo = repo,
                    onDelete = delete,
                    onClose = { open = false }
                )
            }

            ButtonItem(
                icon = R.drawable.share,
                onClick = { context.shareText(repo.url) }
            )

            Spacer(Modifier.weight(1f))

            ButtonItem(
                icon = R.drawable.at,
                onClick = { open = true }
            )

            ButtonItem(
                icon = R.drawable.cloud_download,
                label = R.string.repo_options_update,
                onClick = update
            )
        }
    }
}

@Composable
private fun BottomSheet(
    repo: RepoState, onDelete: () -> Unit, onClose: () -> Unit
) = ModalBottomSheet(
    onDismissRequest = onClose,
    sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    shape = BottomSheetDefaults.expandedShape(15.dp),
    windowInsets = WindowInsets(0)
) {
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .padding(bottom = 18.dp)
            .padding(horizontal = 18.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        Row(
            verticalAlignment = Alignment.Top
        ) {
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    text = repo.name,
                    style = MaterialTheme.typography.titleSmall
                        .copy(fontWeight = FontWeight.Bold),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )

                Text(
                    text = stringResource(
                        id = R.string.module_update_at, repo.timestamp.toFormattedDate()
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )
            }

            LabelItem(
                text = stringResource(id = R.string.repo_modules, repo.size),
                upperCase = false
            )
        }

        OutlinedTextField(
            modifier = Modifier.fillMaxWidth(),
            textStyle = MaterialTheme.typography.bodyMedium,
            shape = RoundedCornerShape(15.dp),
            value = repo.url,
            onValueChange = {},
            readOnly = true,
            singleLine = true
        )
    }

    Column(
        modifier = Modifier
            .padding(bottom = 18.dp),
    ) {
        repo.support?.let {
            ValueItem(
                icon = R.drawable.brand_git,
                label = R.string.repo_options_support,
                onClick = { context.launchCustomTab(it) })
        }

        repo.donate?.let {
            ValueItem(
                icon = R.drawable.heart_handshake,
                label = R.string.repo_options_donate,
                onClick = { context.launchCustomTab(it) }
            )
        }

        repo.website?.let {
            ValueItem(
                icon = R.drawable.world_www,
                label = R.string.repo_options_website,
                onClick = { context.launchCustomTab(it) }
            )
        }

        repo.submission?.let {
            ValueItem(
                icon = R.drawable.cloud_upload,
                label = R.string.repo_options_submission,
                onClick = { context.launchCustomTab(it) }
            )
        }

        ValueItem(
            icon = R.drawable.trash,
            label = R.string.repo_options_delete,
            onClick = onDelete
        )
    }

    NavigationBarsSpacer()
}

@Composable
private fun ValueItem(
    modifier: Modifier = Modifier,
    @DrawableRes icon: Int? = null,
    @StringRes label: Int,
    onClick: () -> Unit
) = Row(
    modifier = modifier
        .clickable(
            interactionSource = remember { MutableInteractionSource() },
            indication = rememberRipple(bounded = true),
            onClick = onClick
        )
        .height(56.dp)
        .fillMaxWidth()
        .padding(horizontal = 16.dp),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(4.dp)
) {
    val titleStyle = MaterialTheme.typography.titleMedium
    val iconSize =
        with(LocalDensity.current) { titleStyle.fontSize.toDp() * 1.0f }

    icon?.let {
        Icon(
            modifier = Modifier.size(iconSize * 1.5f),
            painter = painterResource(id = icon),
            contentDescription = null
        )

        Spacer(modifier = Modifier.width(6.dp))
    }
    Text(
        text = stringResource(id = label),
        style = titleStyle,
        color = MaterialTheme.colorScheme.onSurfaceVariant
    )
}


@Composable
private fun ButtonItem(
    @DrawableRes icon: Int,
    @StringRes label: Int? = null,
    onClick: () -> Unit
) = FilledTonalButton(
    onClick = onClick,
    contentPadding = PaddingValues(horizontal = 12.dp)
) {
    Icon(
        modifier = Modifier.size(20.dp),
        painter = painterResource(id = icon),
        contentDescription = null
    )

    label?.let {
        Spacer(modifier = Modifier.width(6.dp))
        Text(
            text = stringResource(id = label)
        )
    }
}