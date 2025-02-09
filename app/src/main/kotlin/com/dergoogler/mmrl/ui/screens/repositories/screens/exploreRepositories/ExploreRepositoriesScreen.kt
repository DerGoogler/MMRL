package com.dergoogler.mmrl.ui.screens.repositories.screens.exploreRepositories

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.ExploreRepository
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IMMRLApiManager
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.ScaffoldDefaults
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.screens.repositories.screens.exploreRepositories.items.RepoCard
import dev.dergoogler.mmrl.compat.ext.nullable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

@Composable
fun ExploreRepositoriesScreen() {
    var exploreRepositories by remember { mutableStateOf<List<ExploreRepository>?>(null) }

    LaunchedEffect(Unit) {
        runRequest {
            withContext(Dispatchers.IO) {
                val api = IMMRLApiManager.build()
                return@withContext api.repositories.execute()
            }
        }.onSuccess { list ->
            exploreRepositories = list
        }.onFailure {
            Timber.e(it, "unable to get recommended repos")
        }

    }

    SettingsScaffold(
        modifier = ScaffoldDefaults.settingsScaffoldModifier,
        title = R.string.explore_repositories
    ) {
        AnimatedVisibility(
            visible = exploreRepositories == null, enter = fadeIn(), exit = fadeOut()
        ) {
            Loading()
        }

        AnimatedVisibility(
            visible = exploreRepositories != null, enter = fadeIn(), exit = fadeOut()
        ) {
            exploreRepositories.nullable { er ->
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                    contentPadding = PaddingValues(16.dp)
                ) {
                    items(
                        items = er,
                        key = { it.url }
                    ) { repo ->
                        RepoCard(
                            repo = repo
                        )
                    }
                }
            }
        }
    }
}