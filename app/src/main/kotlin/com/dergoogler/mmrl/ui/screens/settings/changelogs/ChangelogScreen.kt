package com.dergoogler.mmrl.ui.screens.settings.changelogs

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.Changelog
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IMMRLApiManager
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.settings.changelogs.items.ChangelogItem
import com.dergoogler.mmrl.ui.utils.none
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

@Composable
fun ChangelogScreen() {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val userPreferences = LocalUserPreferences.current
    var changelog by remember { mutableStateOf<List<Changelog>?>(null) }

    val navController = LocalNavController.current

    LaunchedEffect(Unit) {
        runRequest {
            withContext(Dispatchers.IO) {
                val api = IMMRLApiManager.build()
                return@withContext api.changelog.execute()
            }
        }.onSuccess { list ->
            changelog = list
        }.onFailure {
            Timber.e(it, "unable to get changelog")
        }

    }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                scrollBehavior = scrollBehavior,
                navController = navController
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            AnimatedVisibility(
                visible = changelog == null, enter = fadeIn(), exit = fadeOut()
            ) {
                Loading()
            }

            AnimatedVisibility(
                visible = changelog != null, enter = fadeIn(), exit = fadeOut()
            ) {
                changelog?.let { bl ->
                    LazyColumn {
                        items(items = bl, key = { it.versionCode }) { entry ->
                            if (!userPreferences.checkAppUpdatesPreReleases && entry.preRelease) return@items

                            ChangelogItem(changelog = entry)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController,
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_changelog),
    scrollBehavior = scrollBehavior,
    navController = navController
)