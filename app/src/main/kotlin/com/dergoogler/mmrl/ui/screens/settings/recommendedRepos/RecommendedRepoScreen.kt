package com.dergoogler.mmrl.ui.screens.settings.recommendedRepos

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.RecommendedRepo
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IMMRLApiManager
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.ScaffoldDefaults
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.screens.settings.recommendedRepos.items.RepoItem
import com.dergoogler.mmrl.viewmodel.RepositoriesViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber


@Composable
fun RecommendedRepoScreen(
    viewModel: RepositoriesViewModel = hiltViewModel(),
) {
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }
    var recommendedRepos by remember { mutableStateOf<List<RecommendedRepo>?>(null) }

    LaunchedEffect(Unit) {
        runRequest {
            withContext(Dispatchers.IO) {
                val api = IMMRLApiManager.build()
                return@withContext api.repositories.execute()
            }
        }.onSuccess { list ->
            recommendedRepos = list
        }.onFailure {
            Timber.e(it, "unable to get recommended repos")
        }

    }

    SettingsScaffold(
        modifier = ScaffoldDefaults.settingsScaffoldModifier,
        title = R.string.settings_recommended_repos
    ) {
        AnimatedVisibility(
            visible = recommendedRepos == null, enter = fadeIn(), exit = fadeOut()
        ) {
            Loading()
        }

        AnimatedVisibility(
            visible = recommendedRepos != null, enter = fadeIn(), exit = fadeOut()
        ) {
            recommendedRepos?.let { bl ->
                LazyColumn {
                    items(items = bl, key = { it.url }) { repo ->


                        RepoItem(
                            repo = repo,
                            scope = scope,
                            snackbarHostState = snackbarHostState,
                            viewModel = viewModel
                        )
                    }
                }
            }
        }
    }
}