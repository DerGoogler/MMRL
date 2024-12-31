package com.dergoogler.mmrl.ui.screens.repositories.screens.repository

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImagePainter
import coil.compose.rememberAsyncImagePainter
import coil.request.CachePolicy
import coil.request.ImageRequest
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.state.OnlineState
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.Logo
import com.dergoogler.mmrl.ui.component.TextWithIcon
import com.dergoogler.mmrl.ui.component.card.Card
import com.dergoogler.mmrl.ui.component.card.CardDefaults
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import dev.dergoogler.mmrl.compat.ext.isNotNullOrEmpty
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.toFormattedDateSafely

@Composable
fun ModuleItemDetailed(
    module: OnlineModule,
    state: OnlineState,
    alpha: Float = 1f,
    onClick: () -> Unit = {},
    decoration: TextDecoration = TextDecoration.None,
    enabled: Boolean = true,
) {
    val context = LocalContext.current
    val userPreferences = LocalUserPreferences.current
    val menu = userPreferences.repositoryMenu
    val hasLabel =
        (state.hasLicense && menu.showLicense) || state.installed || (module.track.hasAntifeatures && menu.showAntiFeatures)
    val isVerified = module.isVerified && menu.showVerified


    Card(
        enabled = enabled,
        modifier = {
            column = Modifier.padding(0.dp)
        },
        style = CardDefaults.cardStyle.copy(
            boxContentAlignment = Alignment.Center,
        ),
        onClick = onClick
    ) {
        if (menu.showCover) {
            module.cover?.let {
                if (it.isNotEmpty()) {
                    val painter = rememberAsyncImagePainter(
                        model = ImageRequest.Builder(context).data(it).memoryCacheKey(it)
                            .diskCacheKey(it).diskCachePolicy(CachePolicy.ENABLED)
                            .memoryCachePolicy(CachePolicy.ENABLED).build(),
                    )

                    if (painter.state !is AsyncImagePainter.State.Error) {
                        Image(
                            painter = painter,
                            contentDescription = null,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier
                                .fillMaxWidth()
                                .aspectRatio(2.048f)
                        )
                    } else {
                        Logo(
                            icon = R.drawable.alert_triangle,
                            shape = RoundedCornerShape(0.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .aspectRatio(2.048f)

                        )
                    }
                }
            }
        }

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
                TextWithIcon(
                    style = MaterialTheme.typography.titleSmall.copy(
                        textDecoration = decoration
                    ),
                    text = module.name,
                    icon = isVerified nullable R.drawable.rosette_discount_check,
                    tint = MaterialTheme.colorScheme.surfaceTint,
                    rightIcon = true,
                    iconScalingFactor = 1.0f,
                    spacing = 8f,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )

                Text(
                    text = stringResource(
                        id = R.string.module_version_author,
                        module.versionDisplay,
                        module.author
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    textDecoration = decoration,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                if (menu.showUpdatedTime) {
                    Text(
                        text = stringResource(
                            id = R.string.module_update_at,
                            state.lastUpdated.toFormattedDateSafely
                        ),
                        style = MaterialTheme.typography.bodySmall,
                        textDecoration = decoration,
                        color = MaterialTheme.colorScheme.outline
                    )
                }
            }
        }

        Text(
            modifier = Modifier
                .alpha(alpha = alpha)
                .padding(end = 16.dp, bottom = 16.dp, start = 16.dp),
            text = module.description,
            maxLines = 5,
            overflow = TextOverflow.Ellipsis,
            style = MaterialTheme.typography.bodySmall,
            textDecoration = decoration,
            color = MaterialTheme.colorScheme.outline
        )

        Spacer(modifier = Modifier.weight(1f))

        if (hasLabel) {
            Row(
                modifier = Modifier
                    .padding(end = 16.dp, bottom = 16.dp, start = 16.dp)
                    .fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                module.categories.nullable {
                    if (it.isNotNullOrEmpty()) {
                        LabelItem(
                            icon = R.drawable.category,
                            text = it.first(),
                            containerColor = MaterialTheme.colorScheme.secondaryContainer,
                            contentColor = MaterialTheme.colorScheme.onSecondaryContainer
                        )
                    }
                }

                module.license.nullable(menu.showLicense) {
                    LabelItem(
                        icon = R.drawable.tag,
                        text = it
                    )
                }

                module.track.antifeatures.nullable(menu.showAntiFeatures) {
                    if (it.isNotEmpty()) {
                        LabelItem(
                            icon = R.drawable.alert_triangle,
                            containerColor = MaterialTheme.colorScheme.onTertiary,
                            contentColor = MaterialTheme.colorScheme.onTertiaryContainer,
                            text = stringResource(id = R.string.view_module_antifeatures)
                        )
                    }
                }

                when {
                    state.updatable ->
                        LabelItem(
                            text = stringResource(id = R.string.module_new),
                            containerColor = MaterialTheme.colorScheme.error,
                            contentColor = MaterialTheme.colorScheme.onError
                        )

                    state.installed ->
                        LabelItem(text = stringResource(id = R.string.module_installed))
                }
            }
            Spacer(modifier = Modifier.weight(1f))
        }
    }
}
