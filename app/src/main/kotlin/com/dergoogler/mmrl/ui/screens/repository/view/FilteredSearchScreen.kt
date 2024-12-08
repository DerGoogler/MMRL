package com.dergoogler.mmrl.ui.screens.repository.view

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.HtmlText
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.PageIndicator
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.repository.ModulesList
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.RepositoryViewModel
import dev.dergoogler.mmrl.compat.ext.shareText
import dev.dergoogler.mmrl.compat.ext.takeTrue
import java.net.URLDecoder
import java.net.URLEncoder

@Composable
fun FilteredSearchScreen(
    type: String?,
    value: String?,
    navController: NavController,
    viewModel: RepositoryViewModel = hiltViewModel(),
) {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val list by viewModel.online.collectAsStateWithLifecycle()
    val listState = rememberLazyListState()
    val userPrefs = LocalUserPreferences.current
    val context = LocalContext.current

    LaunchedEffect(list, value) {
        if (!value.isNullOrBlank() && !type.isNullOrBlank()) {
            val decoded = URLDecoder.decode(value, "UTF-8")
            viewModel.search("${type}:${decoded}")
        }
    }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopAppBar(
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
                title = { Text(text = value.orEmpty()) },
                actions = {
                    if (!value.isNullOrBlank() && !type.isNullOrBlank()) {
                        val encoded = URLEncoder.encode(value, "UTF-8")
                        IconButton(
                            onClick = {
                                context.shareText("https://mmrl.dergoogler.com/search/${type}/${encoded}?utm_medium=share&utm_source=${context.packageName}")
                            }
                        ) {
                            Icon(
                                painter = painterResource(id = R.drawable.share),
                                contentDescription = null,
                            )
                        }
                    }
                },
                scrollBehavior = scrollBehavior
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Box(
            modifier = Modifier.padding(innerPadding)
        ) {
            if (viewModel.isLoading) {
                Loading()
            }

            if (list.isEmpty() && !viewModel.isLoading && !value.isNullOrBlank()) {
                PageIndicator(
                    icon = R.drawable.cloud,
                    text = if (viewModel.isSearch) R.string.search_empty else R.string.repository_empty,
                )
            }

            ModulesList(
                before = {
                    HtmlText(
                        modifier = Modifier.padding(vertical = 8.dp),
                        text = pluralStringResource(
                            id = R.plurals.search_results,
                            count = list.size,
                            MaterialTheme.colorScheme.surfaceTint.toArgb(),
                            list.size
                        )
                    )

                    userPrefs.developerMode.takeTrue {
                        Text(
                            text = "$type:$value",
                            style = MaterialTheme.typography.bodySmall.copy(color = MaterialTheme.colorScheme.outline),
                        )
                    }
                },
                list = list,
                state = listState,
                navController = navController
            )
        }
    }
}