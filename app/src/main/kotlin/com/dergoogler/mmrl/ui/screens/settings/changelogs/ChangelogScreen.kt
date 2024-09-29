package com.dergoogler.mmrl.ui.screens.settings.changelogs

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialogDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Event.Companion.isLoading
import com.dergoogler.mmrl.app.Event.Companion.isSucceeded
import com.dergoogler.mmrl.network.compose.requestString
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.MarkdownText
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.SettingsViewModel

@Composable
fun ChangelogScreen(
    navController: NavController,
    viewModel: SettingsViewModel = hiltViewModel()
) {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    var changelog by remember { mutableStateOf("") }
    val event = requestString(
        url = "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md",
        onSuccess = { changelog = it }
    )

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
                visible = event.isLoading,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                Loading(minHeight = 200.dp)
            }

            AnimatedVisibility(
                visible = event.isSucceeded,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                MarkdownText(
                    text = changelog,
                    color = AlertDialogDefaults.textContentColor,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier
                        .verticalScroll(rememberScrollState())
                        .padding(horizontal = 18.dp)
                        .padding(top = 8.dp)
                        .padding(bottom = 18.dp)
                )
            }
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_changelog),
    scrollBehavior = scrollBehavior,
    navController = navController
)