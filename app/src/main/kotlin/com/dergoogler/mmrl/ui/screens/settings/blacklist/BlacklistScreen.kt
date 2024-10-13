package com.dergoogler.mmrl.ui.screens.settings.blacklist

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Event.Companion.isLoading
import com.dergoogler.mmrl.app.Event.Companion.isSucceeded
import com.dergoogler.mmrl.database.entity.Repo
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.network.compose.requestString
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IBlacklistManager
import com.dergoogler.mmrl.stub.IRepoManager
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.MarkdownText
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.screens.repository.ModuleItemDetailed
import com.dergoogler.mmrl.ui.screens.settings.blacklist.items.ModuleItem
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.ModuleViewModel
import com.dergoogler.mmrl.viewmodel.RepositoriesViewModel
import com.squareup.moshi.JsonClass
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber


@Composable
fun BlacklistScreen(
    navController: NavController, viewModel: RepositoriesViewModel = hiltViewModel()
) {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    var blacklist by remember { mutableStateOf<List<Blacklist>?>(null) }


    LaunchedEffect(Unit) {
        runRequest {
            withContext(Dispatchers.IO) {
                val api = IBlacklistManager.build()
                return@withContext api.blacklist.execute()
            }
        }.onSuccess { list ->
            blacklist = list
        }.onFailure {
            Timber.e(it, "unable to get blacklist")
        }

    }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection), topBar = {
            TopBar(
                scrollBehavior = scrollBehavior, navController = navController
            )
        }, contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            AnimatedVisibility(
                visible = blacklist == null, enter = fadeIn(), exit = fadeOut()
            ) {
                Loading(minHeight = 200.dp)
            }

            AnimatedVisibility(
                visible = blacklist != null, enter = fadeIn(), exit = fadeOut()
            ) {
                blacklist?.let { bl ->
                    LazyColumn {
                        items(items = bl, key = { it.id }) { module ->
                            ModuleItem(module = module)
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
    title = stringResource(id = R.string.settings_blacklist),
    scrollBehavior = scrollBehavior,
    navController = navController
)