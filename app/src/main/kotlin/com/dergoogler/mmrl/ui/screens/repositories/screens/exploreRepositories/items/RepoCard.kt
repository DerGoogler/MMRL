package com.dergoogler.mmrl.ui.screens.repositories.screens.exploreRepositories.items

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.absolutePadding
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.ExploreRepository
import com.dergoogler.mmrl.ui.component.Cover
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.card.Card
import com.dergoogler.mmrl.ui.navigation.graphs.RepositoriesScreen
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import dev.dergoogler.mmrl.compat.ext.fadingEdge
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.toFormattedDateSafely


@Composable
fun RepoCard(
    repo: ExploreRepository,
) {
    val navController = LocalNavController.current

    val userPreferences = LocalUserPreferences.current
    val menu = userPreferences.repositoriesMenu
    val repoCover = repo.cover.nullable(menu.showCover) { it }

    Card(
        modifier = {
            column = Modifier.padding(0.dp)
        },
        onClick = {
            navController.navigateSingleTopTo(
                route = RepositoriesScreen.ExploreRepository.route,
                args = mapOf("repo" to repo.toJSON(true))
            )
        }
    ) {
        repoCover.nullable(menu.showCover) {
            if (it.isNotEmpty()) {
                Box(
                    contentAlignment = Alignment.Center
                ) {
                    Cover(
                        modifier = Modifier.fadingEdge(
                            brush = Brush.verticalGradient(
                                colors = listOf(
                                    Color.Transparent,
                                    Color.Black,
                                ),
                                startY = Float.POSITIVE_INFINITY,
                                endY = 0f
                            ),
                        ),
                        url = it,
                    )

                    repo.modulesCount.nullable(menu.showModulesCount) {
                        Box(
                            modifier = Modifier
                                .absolutePadding(
                                    top = 16.dp,
                                    right = 16.dp
                                )
                                .align(Alignment.TopEnd),
                        ) {
                            ModuleCountLabelItem(it)
                        }
                    }
                }
            }
        }

        Row(
            modifier = Modifier.padding(top = 16.dp, start = 16.dp, end = 16.dp),
            verticalAlignment = Alignment.Top
        ) {
            Column(
                modifier = Modifier
                    .weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    text = repo.name,
                    style = MaterialTheme.typography.titleSmall
                        .copy(fontWeight = FontWeight.Bold),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )

                repo.timestamp.nullable(menu.showUpdatedTime) {
                    Text(
                        text = stringResource(
                            id = R.string.module_update_at,
                            it.toFormattedDateSafely(userPreferences.datePattern)
                        ),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.outline,
                    )
                }
            }

            if (repoCover == null && repo.modulesCount !== null && menu.showModulesCount) {
                ModuleCountLabelItem(repo.modulesCount)
            }
        }

        repo.description.nullable {
            Text(
                modifier = Modifier
                    .padding(top = 16.dp)
                    .padding(horizontal = 16.dp),
                text = it,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.outline
            )
        }

        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Composable
private fun ModuleCountLabelItem(count: Int) {
    LabelItem(
        text = stringResource(id = R.string.repo_modules, count),
        upperCase = false
    )
}