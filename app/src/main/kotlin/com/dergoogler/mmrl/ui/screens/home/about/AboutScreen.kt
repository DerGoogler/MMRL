package com.dergoogler.mmrl.ui.screens.home.about

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.model.online.Sponsor
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IMMRLApiManager
import com.dergoogler.mmrl.ui.component.Logo
import com.dergoogler.mmrl.ui.component.MarkdownText
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.component.card.OutlinedCard
import com.dergoogler.mmrl.ui.component.listItem.ListButtonItem
import com.dergoogler.mmrl.ui.component.listItem.ListCollapseItem
import com.dergoogler.mmrl.ui.component.listItem.ListItemDefaults
import com.dergoogler.mmrl.ui.providable.LocalNavController
import dev.dergoogler.mmrl.compat.core.LocalUriHandler
import dev.dergoogler.mmrl.compat.ext.nullable
import dev.dergoogler.mmrl.compat.ext.toDollars
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

val listItemContentPaddingValues = PaddingValues(vertical = 16.dp, horizontal = 16.dp)

@Composable
fun AboutScreen() {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val browser = LocalUriHandler.current

    val navController = LocalNavController.current

    var sponsors by remember { mutableStateOf<List<Sponsor>?>(null) }

    LaunchedEffect(Unit) {
        runRequest {
            withContext(Dispatchers.IO) {
                return@withContext IMMRLApiManager.build().sponsors.execute()
            }
        }.onSuccess { list ->
            sponsors = list
        }.onFailure {
            Timber.e(it, "unable to get sponsors")
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
        contentWindowInsets = WindowInsets(0.dp)
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(all = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Logo(
                icon = R.drawable.launcher_outline,
                modifier = Modifier.size(65.dp),
                contentColor = MaterialTheme.colorScheme.primary,
                containerColor = MaterialTheme.colorScheme.surfaceVariant,
                fraction = 0.7f
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = stringResource(id = R.string.app_name),
                    style = MaterialTheme.typography.titleLarge
                )

                Text(
                    text = stringResource(
                        id = R.string.about_app_version,
                        BuildConfig.VERSION_NAME, BuildConfig.VERSION_CODE
                    ),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 5.dp)
                )
            }

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                FilledTonalButton(
                    onClick = { browser.openUri(Const.GITHUB_URL) }
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.github),
                        contentDescription = null
                    )
                    Spacer(modifier = Modifier.width(ButtonDefaults.IconSpacing))
                    Text(text = stringResource(id = R.string.about_github))
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {

                    FilledTonalButton(
                        onClick = { browser.openUri(Const.TRANSLATE_URL) }
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.weblate),
                            contentDescription = null,
                            modifier = Modifier.size(ButtonDefaults.IconSize)
                        )
                        Spacer(modifier = Modifier.width(ButtonDefaults.IconSpacing))
                        Text(text = stringResource(id = R.string.about_weblate))
                    }

                    FilledTonalButton(
                        onClick = { browser.openUri(Const.TELEGRAM_URL) }
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.telegram),
                            contentDescription = null
                        )
                        Spacer(modifier = Modifier.width(ButtonDefaults.IconSpacing))
                        Text(text = stringResource(id = R.string.about_telegram))
                    }
                }
            }

            val style = MaterialTheme.typography.bodyMedium.copy(
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            val itemTextStyle = ListItemDefaults.itemStyle.copy(
                titleTextStyle = style,
                descTextStyle = style
            )

            OutlinedCard {

                Text(
                    text = stringResource(id = R.string.about_desc1),
                    style = style
                )

                Spacer(modifier = Modifier.height(15.dp))

                MarkdownText(
                    text = stringResource(
                        id = R.string.about_desc2,
                        "@sanmer(Sanmer) & @googler(Der_Googler)"
                    ),
                    style = style,
                    onTagClick = {
                        when (it) {
                            "sanmer" -> browser.openUri(Const.SANMER_GITHUB_URL)
                            "googler" -> browser.openUri(Const.GOOGLER_GITHUB_URL)
                        }
                    }
                )
            }

            sponsors.nullable { sponsors ->
                OutlinedCard(
                    modifier = {
                        column = Modifier
                    }
                ) {
                    ListCollapseItem(
                        itemTextStyle = itemTextStyle,
                        contentPaddingValues = listItemContentPaddingValues,
                        title = stringResource(R.string.sponsors),
                        desc = stringResource(R.string.all_the_sponsors_of_the_project_click_on_learn_more_to_get_included),
                        base = {
                            learnMore = {
                                browser.openUri(Const.SPONSORS_URL)
                            }
                        },
                        iconToRight = true
                    ) {
                        sponsors.forEach {
                            ListButtonItem(
                                itemTextStyle = itemTextStyle,
                                contentPaddingValues = listItemContentPaddingValues,
                                title = it.login,
                                desc = it.amount.toDollars(),
                                onClick = {
                                    browser.openUri(it.url)
                                }
                            )
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
    title = stringResource(id = R.string.settings_about),
    scrollBehavior = scrollBehavior,
    navController = navController
)