package com.dergoogler.mmrl.ui.screens.settings.about

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Const
import com.dergoogler.mmrl.ui.component.HtmlText
import com.dergoogler.mmrl.ui.component.Logo
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.utils.extensions.openUrl

@Composable
fun AboutScreen(
    navController: NavController
) {
    val context = LocalContext.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

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
                .fillMaxWidth()
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(20.dp))
            Logo(
                icon = R.drawable.launcher_outline,
                modifier = Modifier.size(65.dp),
                contentColor = MaterialTheme.colorScheme.onPrimary,
                containerColor = MaterialTheme.colorScheme.primary,
                fraction = 0.7f
            )

            Spacer(modifier = Modifier.height(20.dp))
            Text(
                text = stringResource(id = R.string.app_name),
                style = MaterialTheme.typography.titleLarge
            )
            Text(
                text = stringResource(id = R.string.about_app_version,
                    BuildConfig.VERSION_NAME, BuildConfig.VERSION_CODE),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 5.dp)
            )

            Spacer(modifier = Modifier.height(20.dp))
            FilledTonalButton(
                onClick = { context.openUrl(Const.GITHUB_URL) }
            ) {
                Icon(
                    painter = painterResource(id = R.drawable.github),
                    contentDescription = null
                )
                Spacer(modifier = Modifier.width(ButtonDefaults.IconSpacing))
                Text(text = stringResource(id = R.string.about_github))
            }

            Row(
                modifier = Modifier.padding(top = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
//                FilledTonalButton(
//                    onClick = { context.openUrl(Const.TRANSLATE_URL) }
//                ) {
//                    Icon(
//                        painter = painterResource(id = R.drawable.weblate),
//                        contentDescription = null,
//                        modifier = Modifier.size(ButtonDefaults.IconSize)
//                    )
//                    Spacer(modifier = Modifier.width(ButtonDefaults.IconSpacing))
//                    Text(text = stringResource(id = R.string.about_weblate))
//                }

                FilledTonalButton(
                    onClick = { context.openUrl(Const.TELEGRAM_URL) }
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.telegram),
                        contentDescription = null
                    )
                    Spacer(modifier = Modifier.width(ButtonDefaults.IconSpacing))
                    Text(text = stringResource(id = R.string.about_telegram))
                }
            }

            OutlinedCard(
                modifier = Modifier.padding(vertical = 30.dp, horizontal = 20.dp),
                shape = RoundedCornerShape(15.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(all = 15.dp)
                ) {
                    Text(
                        text = stringResource(id = R.string.about_desc1),
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(15.dp))
                    HtmlText(
                        text = stringResource(id = R.string.about_desc2,
                            "<a href=\"${Const.SANMER_GITHUB_URL}\">Sanmer</a> & <a href=\"${Const.GOOGLER_GITHUB_URL}\">DerGoogler</a>"),
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
private fun TopBar(
    scrollBehavior: TopAppBarScrollBehavior,
    navController: NavController
) = NavigateUpTopBar(
    title = stringResource(id = R.string.settings_about),
    scrollBehavior = scrollBehavior,
    navController = navController
)