package com.dergoogler.mmrl.ui.screens.repository.view

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.painterResource
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.PageIndicator
import com.dergoogler.mmrl.ui.screens.repository.ModulesList
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.RepositoryViewModel

@Composable
fun FilteredSearchScreen(
    type: String,
    navController: NavController,
    viewModel: RepositoryViewModel = hiltViewModel(),
) {
    val value = when (type) {
        "category" -> viewModel.category
        "author" -> viewModel.author
        else -> null
    }
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val list by viewModel.online.collectAsStateWithLifecycle()
    val listState = rememberLazyListState()

    LaunchedEffect(list) {
        if (!value.isNullOrBlank()) {
            viewModel.search("${type}:${value}")
        }
    }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopAppBar(
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            painter = painterResource(id = R.drawable.arrow_left),
                            contentDescription = null
                        )
                    }
                },
                title = { Text(text = value.orEmpty()) },
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
                list = list,
                state = listState,
                navController = navController
            )
        }
    }
}