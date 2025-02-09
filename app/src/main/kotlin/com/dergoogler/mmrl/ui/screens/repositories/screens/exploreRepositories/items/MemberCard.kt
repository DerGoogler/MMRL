package com.dergoogler.mmrl.ui.screens.repositories.screens.exploreRepositories.items

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.ExploreRepositoryMember
import com.dergoogler.mmrl.ui.component.card.Card
import dev.dergoogler.mmrl.compat.core.LocalUriHandler
import dev.dergoogler.mmrl.compat.ext.isNotNullOrEmpty
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.toDecodedUrl

@Composable
fun MemberCard(member: ExploreRepositoryMember) {
    val browser = LocalUriHandler.current
    val interactionSource = remember { MutableInteractionSource() }

    Card(
        modifier = {
            column = Modifier.padding(horizontal = 32.dp, vertical = 48.dp)
        }
    ) {
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            AsyncImage(
                model = member.avatar,
                modifier = Modifier
                    .size(60.dp)
                    .clip(RoundedCornerShape(100)),
                contentDescription = null
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier.padding(top = 24.dp)
            ) {
                Text(
                    text = member.name.toDecodedUrl(),
                    style = MaterialTheme.typography.titleMedium
                )
                member.title.nullable {
                    Text(
                        text = it.toDecodedUrl(),
                        style = MaterialTheme.typography.titleSmall.copy(color = MaterialTheme.colorScheme.outline)
                    )
                }

                if (member.links.isNotNullOrEmpty()) {
                    LazyRow(
                        modifier = Modifier.padding(
                            top = 24.dp,
                            start = 16.dp,
                            end = 16.dp,
                            bottom = 0.dp
                        ),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        items(
                            items = member.links,
                            key = { it.icon }
                        ) {
                            Icon(
                                painter = painterResource(
                                    id = when (it.icon.lowercase()) {
                                        "github" -> R.drawable.brand_github
                                        "gitlab" -> R.drawable.brand_gitlab
                                        else -> R.drawable.transparent
                                    }
                                ),
                                modifier = Modifier
                                    .clip(RoundedCornerShape(100))
                                    .clickable(
                                        enabled = true,
                                        interactionSource = interactionSource,
                                        onClick = {
                                            browser.openUri(it.link)
                                        },
                                        indication = ripple()
                                    ),
                                contentDescription = "GitHub"
                            )
                        }

                    }
                }
            }
        }

    }
}