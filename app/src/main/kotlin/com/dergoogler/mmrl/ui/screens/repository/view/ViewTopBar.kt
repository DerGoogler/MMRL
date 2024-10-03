package com.dergoogler.mmrl.ui.screens.repository.view

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.Repo
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.model.online.TrackJson
import com.dergoogler.mmrl.ui.component.CollapsingTopAppBar
import com.dergoogler.mmrl.ui.component.CollapsingTopAppBarDefaults
import com.dergoogler.mmrl.ui.component.Logo
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.repository.view.items.LicenseItem
import com.dergoogler.mmrl.ui.screens.repository.view.items.TagItem
import com.dergoogler.mmrl.ui.screens.repository.view.items.TrackItem
import com.dergoogler.mmrl.utils.extensions.launchCustomTab

@Composable
fun ViewTopBar(
    online: OnlineModule,
    tracks: List<Pair<Repo, TrackJson>>,
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController
) = CollapsingTopAppBar(
    title = {
        Text(
            text = online.name,
            style = MaterialTheme.typography.titleLarge,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis
        )
    },
    content = topBarContent(
        module = online,
        tracks = tracks
    ),
    navigationIcon = {
        IconButton(
            onClick = { navController.popBackStack() }
        ) {
            Icon(
                painter = painterResource(id = R.drawable.arrow_left),
                contentDescription = null
            )
        }
    },
    scrollBehavior = scrollBehavior,
    colors = CollapsingTopAppBarDefaults.topAppBarColors(
        scrolledContainerColor = MaterialTheme.colorScheme.surface
    )
)

@Composable
private fun topBarContent(
    module: OnlineModule,
    tracks: List<Pair<Repo, TrackJson>>,
): @Composable ColumnScope.() -> Unit = {
    val userPreferences = LocalUserPreferences.current
    val repositoryMenu = userPreferences.repositoryMenu

    val context = LocalContext.current
    val hasLicense = module.hasLicense
    val hasDonate = module.donate.orEmpty().isNotBlank()

    Row(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalAlignment = Alignment.Top
    ) {
        if (repositoryMenu.showIcon) {
            if (module.icon.orEmpty().isNotEmpty()) {
                AsyncImage(
                    model = module.icon,
                    modifier = Modifier
                        .size(55.dp)
                        .clip(CircleShape),
                    contentDescription = null
                )
            } else {
                Logo(
                    icon = R.drawable.box,
                    modifier = Modifier.size(55.dp),
                    contentColor = MaterialTheme.colorScheme.onSecondaryContainer,
                    containerColor = MaterialTheme.colorScheme.secondaryContainer
                )
            }

            Spacer(modifier = Modifier.width(16.dp))
        }

        Column(
            modifier = Modifier.weight(1f)
        ) {


            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = module.name,
                    style = MaterialTheme.typography.titleMedium,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                if (module.isVerified) {
                    Spacer(modifier = Modifier.width(4.dp))

                    val iconSize =
                        with(LocalDensity.current) { MaterialTheme.typography.titleMedium.fontSize.toDp() * 1.0f }

                    Icon(
                        modifier = Modifier.size(iconSize),
                        painter = painterResource(id = R.drawable.rosette_discount_check),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }


            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = module.author,
                style = MaterialTheme.typography.bodyMedium,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )

            Text(
                text = buildAnnotatedString {
                    append("ID = ${module.id}")
                    if (hasLicense) {
                        append(", ")
                        append("License = ${module.license}")
                    }
                },
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.outline
            )
        }
    }

    Row(
        modifier = Modifier
            .padding(top = 10.dp)
            .padding(horizontal = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        TrackItem(
            tracks = tracks
        )


        module.license?.let {
            LicenseItem(
                licenseId = it
            )
        }


        module.donate?.let {
            TagItem(
                icon = R.drawable.currency_dollar,
                onClick = { context.launchCustomTab(it) }
            )
        }
    }
}