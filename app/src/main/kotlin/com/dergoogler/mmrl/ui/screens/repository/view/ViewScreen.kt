package com.dergoogler.mmrl.ui.screens.repository.view

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.core.net.toUri
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.ui.activity.InstallActivity
import com.dergoogler.mmrl.ui.component.CollapsingTopAppBarDefaults
import com.dergoogler.mmrl.ui.screens.repository.view.pages.AboutPage
import com.dergoogler.mmrl.ui.screens.repository.view.pages.OverviewPage
import com.dergoogler.mmrl.ui.screens.repository.view.pages.ReadmePage
import com.dergoogler.mmrl.ui.screens.repository.view.pages.VersionsPage
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.ModuleViewModel
import ext.dergoogler.mmrl.activity.MMRLComponentActivity

@Composable
fun ViewScreen(
    navController: NavController,
    viewModel: ModuleViewModel = hiltViewModel(),
) {
    val context = LocalContext.current

    val scrollBehavior = CollapsingTopAppBarDefaults.scrollBehavior()

    val hasAbout = !viewModel.isEmptyAbout
    val hasReadme = !viewModel.isEmptyReadme

    val pages = mutableListOf<Int>().apply {
        add(R.string.view_module_page_overview)

        if (hasReadme) {
            add(R.string.view_module_page_readme)
        }

        add(R.string.view_module_page_versions)

        if (hasAbout) {
            add(R.string.view_module_page_about)
        }
    }

    val pagerState = rememberPagerState(initialPage = 0, pageCount = { pages.size })

    val download: (VersionItem, Boolean) -> Unit = { item, install ->
        viewModel.downloader(context, item) {
            if (install) {
                MMRLComponentActivity.startInstallActivity(
                    context = context,
                    uri = it.toUri()
                )
            }
        }
    }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            ViewTopBar(
                online = viewModel.online,
                tracks = viewModel.tracks,
                scrollBehavior = scrollBehavior,
                navController = navController
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier.padding(innerPadding)
        ) {
            ViewTab(
                state = pagerState,
                updatableSize = viewModel.updatableSize,
                pages = pages
            )

            HorizontalPager(
                state = pagerState,
                modifier = Modifier.fillMaxSize()
            ) { index ->
                pages.getOrNull(
                    index % (pages.size)
                )?.let { page ->
                    when (page) {
                        R.string.view_module_page_overview -> OverviewPage(
                            online = viewModel.online,
                            item = viewModel.lastVersionItem,
                            local = viewModel.local,
                            notifyUpdates = viewModel.notifyUpdates,
                            isProviderAlive = viewModel.isProviderAlive,
                            rootVersionName = viewModel.version,
                            setUpdatesTag = viewModel::setUpdatesTag,
                            onInstall = { download(it, true) },
                        )

                        R.string.view_module_page_readme -> ReadmePage(url = viewModel.readme)

                        R.string.view_module_page_versions -> VersionsPage(
                            versions = viewModel.versions,
                            localVersionCode = viewModel.localVersionCode,
                            isProviderAlive = viewModel.isProviderAlive,
                            getProgress = { viewModel.getProgress(it) },
                            onDownload = download
                        )

                        R.string.view_module_page_about -> AboutPage(
                            online = viewModel.online
                        )
                    }
                }
            }
        }
    }
}