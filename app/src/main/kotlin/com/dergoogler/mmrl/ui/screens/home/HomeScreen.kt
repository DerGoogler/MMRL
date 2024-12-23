package com.dergoogler.mmrl.ui.screens.home

import android.os.Build
import android.system.Os
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isNonRoot
import com.dergoogler.mmrl.datastore.UserPreferencesCompat.Companion.isRoot
import com.dergoogler.mmrl.model.online.Changelog
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IMMRLApiManager
import com.dergoogler.mmrl.ui.component.ListItem
import com.dergoogler.mmrl.ui.component.ListProgressBarItem
import com.dergoogler.mmrl.ui.component.TopAppBarIcon
import com.dergoogler.mmrl.ui.component.WorkingModeBottomSheet
import com.dergoogler.mmrl.ui.navigation.graphs.HomeScreen
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.home.items.NonRootItem
import com.dergoogler.mmrl.ui.screens.home.items.RebootBottomSheet
import com.dergoogler.mmrl.ui.screens.home.items.RootItem
import com.dergoogler.mmrl.ui.screens.settings.changelogs.items.ChangelogBottomSheet
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.HomeViewModel
import dev.dergoogler.mmrl.compat.ext.managerVersion
import dev.dergoogler.mmrl.compat.ext.seLinuxStatus
import dev.dergoogler.mmrl.compat.ext.takeTrue
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber


val listItemContentPaddingValues: PaddingValues = PaddingValues(vertical = 8.dp, horizontal = 25.dp)

@Composable
fun HomeScreen(
    viewModel: HomeViewModel = hiltViewModel(),
    navController: NavController,
) {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val context = LocalContext.current
    val userPreferences = LocalUserPreferences.current

    val browser = LocalUriHandler.current

    var openRebootSheet by remember { mutableStateOf(false) }
    if (openRebootSheet) {
        RebootBottomSheet(
            onClose = { openRebootSheet = false })
    }

    var workingModeBottomSheet by remember { mutableStateOf(false) }
    if (workingModeBottomSheet) WorkingModeBottomSheet(
        onClose = {
            workingModeBottomSheet = false
        }
    )

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection), topBar = {
            TopBar(
                isProviderAlive = viewModel.isProviderAlive,
                onInfoClick = {
                    navController.navigateSingleTopTo(HomeScreen.About.route)
                }, onRebootClick = {
                    openRebootSheet = true
                }, scrollBehavior = scrollBehavior
            )
        }, contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {

            when {
                userPreferences.workingMode.isRoot -> RootItem(
                    developerMode = userPreferences.developerMode,
                    isAlive = viewModel.isProviderAlive,
                    platform = viewModel.platform,
                    versionCode = viewModel.versionCode,
                    onClick = {
                        workingModeBottomSheet = true
                    }
                )

                userPreferences.workingMode.isNonRoot -> NonRootItem(
                    developerMode = userPreferences.developerMode,
                    onClick = {
                        workingModeBottomSheet = true
                    }
                )
            }

            Spacer(Modifier.height(16.dp))

            if (userPreferences.checkAppUpdates) {
                var changelog by remember { mutableStateOf<List<Changelog>?>(null) }
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

                changelog?.let {
                    val latest = it.first()

                    var changelogSheet by remember { mutableStateOf(false) }
                    if (changelogSheet) {
                        ChangelogBottomSheet(
                            changelog = latest,
                            onClose = { changelogSheet = false })
                    }

                    AnimatedVisibility(
                        visible = if (latest.preRelease) {
                            userPreferences.checkAppUpdatesPreReleases && latest.versionCode > context.managerVersion.second
                        } else {
                            latest.versionCode > context.managerVersion.second
                        },
                        enter = fadeIn() + expandVertically(),
                        exit = shrinkVertically() + fadeOut()
                    ) {
                        Surface(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 16.dp),
                            color = MaterialTheme.colorScheme.outlineVariant,
                            shape = RoundedCornerShape(15.dp),
                        ) {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        changelogSheet = true
                                    }
                            ) {
                                ListItem(
                                    title = stringResource(
                                        R.string.new_version_available, latest.versionName
                                    )
                                )
                            }
                        }
                    }
                }
            }

            Surface(
                color = MaterialTheme.colorScheme.surface,
                tonalElevation = 1.dp,
                shape = RoundedCornerShape(20.dp)
            ) {
                val uname = Os.uname()

                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 16.dp)
                ) {

                    ListItem(
                        contentPaddingValues = listItemContentPaddingValues,
                        icon = R.drawable.cookie_man,
                        title = stringResource(R.string.kernel),
                        desc = uname.release
                    )

                    ListItem(
                        contentPaddingValues = listItemContentPaddingValues,
                        icon = R.drawable.launcher_outline,
                        title = stringResource(R.string.manager_version),
                        desc = "${context.managerVersion.first} (${context.managerVersion.second})"
                    )

                    ListItem(
                        contentPaddingValues = listItemContentPaddingValues,
                        icon = R.drawable.fingerprint,
                        title = stringResource(R.string.fingerprint),
                        desc = if (userPreferences.hideFingerprintInHome) {
                            stringResource(id = R.string.hidden)
                        } else {
                            Build.FINGERPRINT
                        }
                    )

                    ListItem(
                        contentPaddingValues = listItemContentPaddingValues,
                        icon = R.drawable.shield_bolt,
                        title = stringResource(id = R.string.selinux_status),
                        desc = context.seLinuxStatus
                    )
                }
            }

            Spacer(Modifier.height(16.dp))

            viewModel.isProviderAlive.takeTrue {
                userPreferences.developerMode.takeTrue {
                    Surface(
                        color = MaterialTheme.colorScheme.surface,
                        tonalElevation = 1.dp,
                        shape = RoundedCornerShape(20.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 16.dp)
                        ) {
                            ListItem(
                                contentPaddingValues = listItemContentPaddingValues,
                                title = stringResource(R.string.home_root_provider_version_name),
                                desc = viewModel.versionName
                            )

                            ListItem(
                                contentPaddingValues = listItemContentPaddingValues,
                                title = stringResource(R.string.home_root_provider_se_linux_context),
                                desc = viewModel.seLinuxContext
                            )
                        }
                    }

                    Spacer(Modifier.height(16.dp))
                }

                Surface(
                    color = MaterialTheme.colorScheme.surface,
                    tonalElevation = 1.dp,
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 16.dp)
                    ) {
                        val stats = viewModel.stats

                        ListItem(
                            contentPaddingValues = listItemContentPaddingValues,
                            title = stringResource(R.string.home_installed_modules),
                            desc = stats.totalModules.toString()
                        )

                        ListItem(
                            contentPaddingValues = listItemContentPaddingValues,
                            title = stringResource(R.string.home_enabled_modules),
                            desc = stats.enabledModules.toString()
                        )

                        ListItem(
                            contentPaddingValues = listItemContentPaddingValues,
                            title = stringResource(R.string.home_installed_modules_with_service_files),
                            desc = stats.modulesWithServiceFiles.toString()
                        )

                        ListItem(
                            contentPaddingValues = listItemContentPaddingValues,
                            title = stringResource(R.string.home_disabled_modules),
                            desc = stats.disabledModules.toString()
                        )

                        val ratio =
                            (stats.enabledModules.toFloat() / stats.disabledModules.toFloat()) / 10

                        ListProgressBarItem(
                            contentPaddingValues = listItemContentPaddingValues,
                            progressBarModifier = Modifier
                                .graphicsLayer(rotationZ = 180f)
                                .weight(1f),
                            startDesc = stats.enabledModules.toString(),
                            endDesc = stats.disabledModules.toString(),
                            title = stringResource(R.string.home_enabled_disabled_modules_ratio),
                            progress = ratio,
                        )

                        ListItem(
                            contentPaddingValues = listItemContentPaddingValues,
                            title = stringResource(R.string.home_updated_modules),
                            desc = stats.updatableModules.toString()
                        )
                    }
                }

                Spacer(Modifier.height(16.dp))
            }


            Surface(
                color = MaterialTheme.colorScheme.surface,
                tonalElevation = 1.dp,
                shape = RoundedCornerShape(20.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            browser.openUri("https://github.com/sponsors/DerGoogler")
                        }
                        .padding(24.dp),
                ) {
                    Text(
                        text = stringResource(R.string.home_support_title),
                        style = MaterialTheme.typography.bodyLarge
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        text = stringResource(R.string.home_support_content),
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }
}

@Composable
private fun TopBar(
    isProviderAlive: Boolean,
    onRebootClick: () -> Unit = {},
    onInfoClick: () -> Unit = {},
    scrollBehavior: TopAppBarScrollBehavior,
) = TopAppBar(title = {
    TopAppBarIcon()
}, scrollBehavior = scrollBehavior, actions = {
    if (isProviderAlive) {
        IconButton(onClick = onRebootClick) {
            Icon(
                painter = painterResource(id = R.drawable.refresh), contentDescription = null
            )
        }
    }

    IconButton(onClick = onInfoClick) {
        Icon(
            painter = painterResource(id = R.drawable.info_circle), contentDescription = null
        )
    }
})