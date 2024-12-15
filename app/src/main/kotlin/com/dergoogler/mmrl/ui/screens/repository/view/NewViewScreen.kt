package com.dergoogler.mmrl.ui.screens.repository.view

import android.os.Build
import androidx.annotation.StringRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.core.net.toUri
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import coil.compose.AsyncImage
import coil.compose.AsyncImagePainter
import coil.compose.rememberAsyncImagePainter
import coil.request.CachePolicy
import coil.request.ImageRequest
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.BulkModule
import com.dergoogler.mmrl.model.local.State
import com.dergoogler.mmrl.model.online.VersionItem
import com.dergoogler.mmrl.ui.component.Alert
import com.dergoogler.mmrl.ui.component.AntiFeaturesItem
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.component.ListCollapseItem
import com.dergoogler.mmrl.ui.component.ListItem
import com.dergoogler.mmrl.ui.component.ListItemTextStyle
import com.dergoogler.mmrl.ui.component.Logo
import com.dergoogler.mmrl.ui.component.MarkdownText
import com.dergoogler.mmrl.ui.navigation.graphs.RepositoryScreen
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.screens.repository.view.items.InstallConfirmDialog
import com.dergoogler.mmrl.ui.screens.repository.view.items.LicenseItem
import com.dergoogler.mmrl.ui.screens.repository.view.items.VersionsItem
import com.dergoogler.mmrl.ui.screens.repository.view.items.ViewTrackBottomSheet
import com.dergoogler.mmrl.ui.utils.navigateSingleTopTo
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.BulkInstallViewModel
import com.dergoogler.mmrl.viewmodel.ModuleViewModel
import com.dergoogler.mmrl.viewmodel.ModulesViewModel
import com.dergoogler.mmrl.viewmodel.RepositoryViewModel
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.ext.ifNotEmpty
import dev.dergoogler.mmrl.compat.ext.ifNotNullOrBlank
import dev.dergoogler.mmrl.compat.ext.isNotNullOrBlank
import dev.dergoogler.mmrl.compat.ext.shareText
import dev.dergoogler.mmrl.compat.ext.takeTrue
import dev.dergoogler.mmrl.compat.ext.toFormatedFileSize
import dev.dergoogler.mmrl.compat.ext.toFormattedDateSafely
import kotlinx.coroutines.launch
import timber.log.Timber


@Composable
fun NewViewScreen(
    navController: NavController,
    viewModel: ModuleViewModel = hiltViewModel(),
    repositoryViewModel: RepositoryViewModel = hiltViewModel(),
    modulesViewModel: ModulesViewModel = hiltViewModel(),
    bulkInstallViewModel: BulkInstallViewModel,
) {
    val userPreferences = LocalUserPreferences.current
    val repositoryMenu = userPreferences.repositoryMenu
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val module = viewModel.online
    val local = viewModel.local

    val repositoryList by repositoryViewModel.online.collectAsStateWithLifecycle()

    val lastVersionItem = viewModel.lastVersionItem
    val context = LocalContext.current
    val density = LocalDensity.current
    val browser = LocalUriHandler.current

    val listItemContentPaddingValues = PaddingValues(vertical = 16.dp, horizontal = 16.dp)

    val screenshotsLazyListState = rememberLazyListState()
    val categoriesLazyListState = rememberLazyListState()

    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    var installConfirm by remember { mutableStateOf(false) }

    val download: (VersionItem, Boolean) -> Unit = { item, install ->
        viewModel.downloader(context, item) {
            if (install) {
                installConfirm = false
                MMRLComponentActivity.startInstallActivity(
                    context = context,
                    uri = it.toUri()
                )
            }
        }
    }

    val subListItemStyle = ListItemTextStyle(
        titleTextColor = LocalContentColor.current,
        descTextColor = MaterialTheme.colorScheme.outline,
        titleTextStyle = MaterialTheme.typography.bodyMedium,
        descTextStyle = MaterialTheme.typography.bodyMedium,
        iconSize = 20.dp
    )

    var menuExpanded by remember { mutableStateOf(false) }

    val manager = module.manager(viewModel.rootManager)
    val requires = manager.require?.let {
        repositoryList.filter { onlineModules ->
            onlineModules.second.id in it
        }.map { it.second }
    } ?: emptyList()

    if (installConfirm) InstallConfirmDialog(
        name = module.name,
        requires = requires,
        onClose = {
            installConfirm = false
        },
        onConfirm = {
            lastVersionItem?.let { download(it, true) }
        },
        onConfirmDeps = {
            lastVersionItem?.let { item ->
                val bulkModules = mutableListOf<BulkModule>()
                bulkModules.add(
                    BulkModule(
                        id = module.id,
                        name = module.name,
                        versionItem = item
                    )
                )
                bulkModules.addAll(requires.map { r ->
                    BulkModule(
                        id = r.id,
                        name = r.name,
                        versionItem = r.versions.first()
                    )
                })

                bulkModules.ifNotEmpty {
                    bulkInstallViewModel.downloadMultiple(
                        items = bulkModules,
                        onAllSuccess = { uris ->
                            installConfirm = false
                            MMRLComponentActivity.startInstallActivity(
                                context = context,
                                uri = uris
                            )
                        },
                        onFailure = { err ->
                            installConfirm = false
                            Timber.e(err)
                        }
                    )
                }
            }
        }
    )

    var versionSelectBottomSheet by remember { mutableStateOf(false) }
    if (versionSelectBottomSheet) VersionSelectBottomSheet(
        onClose = { versionSelectBottomSheet = false },
        versions = viewModel.versions,
        localVersionCode = viewModel.localVersionCode,
        isProviderAlive = viewModel.isProviderAlive,
        getProgress = { viewModel.getProgress(it) },
        onDownload = download
    )

    var viewTrackBottomSheet by remember { mutableStateOf(false) }
    if (viewTrackBottomSheet) ViewTrackBottomSheet(
        onClose = { viewTrackBottomSheet = false },
        tracks = viewModel.tracks
    )

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                actions = {
                    VersionsItem(
                        count = viewModel.versions.size,
                        onClick = {
                            versionSelectBottomSheet = true
                        }
                    )

                    Spacer(modifier = Modifier.width(4.dp))

                    IconButton(onClick = { menuExpanded = true }) {
                        Icon(
                            painter = painterResource(id = R.drawable.dots_vertical),
                            contentDescription = null,
                        )
                    }
                    DropdownMenu(
                        expanded = menuExpanded,
                        onDismissRequest = { menuExpanded = false }
                    ) {
                        DropdownMenuItem(
                            leadingIcon = {
                                Icon(
                                    painter = painterResource(id = R.drawable.share),
                                    contentDescription = null,
                                )
                            },
                            text = {
                                Text(
                                    text = stringResource(id = R.string.view_module_share)
                                )
                            },
                            onClick = {
                                menuExpanded = false
                                context.shareText("https://mmrl.dergoogler.com/module/${module.id}")
                            }
                        )

                        lastVersionItem?.let {
                            DropdownMenuItem(
                                leadingIcon = {
                                    Icon(
                                        painter = painterResource(id = R.drawable.package_import),
                                        contentDescription = null,
                                    )
                                },
                                text = {
                                    Text(
                                        text = stringResource(id = R.string.bulk_add_as_bulk)
                                    )
                                },
                                onClick = {
                                    menuExpanded = false
                                    bulkInstallViewModel.addBulkModule(
                                        module = BulkModule(
                                            id = module.id,
                                            name = module.name,
                                            versionItem = it
                                        ),
                                        onSuccess = {
                                            scope.launch {
                                                snackbarHostState.showSnackbar(
                                                    message = context.getString(R.string.bulk_install_module_added),
                                                    duration = SnackbarDuration.Short
                                                )
                                            }
                                        },
                                        onFailure = { error ->
                                            scope.launch {
                                                snackbarHostState.showSnackbar(
                                                    message = error,
                                                    duration = SnackbarDuration.Short
                                                )
                                            }
                                        }
                                    )
                                }
                            )
                        }

                        lastVersionItem?.let {
                            DropdownMenuItem(
                                leadingIcon = {
                                    Icon(
                                        painter = painterResource(id = R.drawable.http_trace),
                                        contentDescription = null,
                                    )
                                },
                                text = {
                                    Text(
                                        text = "track.json"
                                    )
                                },
                                onClick = {
                                    menuExpanded = false
                                    browser.openUri("${it.repoUrl}modules/${module.id}/track.json")
                                }
                            )
                        }

                        local?.let {
                            DropdownMenuItem(
                                leadingIcon = {
                                    Icon(
                                        painter = painterResource(
                                            id = if (viewModel.notifyUpdates) {
                                                R.drawable.target_off
                                            } else {
                                                R.drawable.target
                                            }
                                        ),
                                        contentDescription = null,
                                    )
                                },
                                text = {
                                    Text(
                                        text = stringResource(
                                            id = if (viewModel.notifyUpdates) {
                                                R.string.view_module_update_ignore
                                            } else {
                                                R.string.view_module_update_notify
                                            }
                                        )
                                    )
                                },
                                onClick = {
                                    menuExpanded = false
                                    viewModel.setUpdatesTag(!viewModel.notifyUpdates)
                                }
                            )
                        }
                    }
                },
                navController = navController,
                scrollBehavior = scrollBehavior
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .verticalScroll(rememberScrollState())
        ) {
            Spacer(modifier = Modifier.height(16.dp))

            Row(
                modifier = Modifier.padding(horizontal = 16.dp),
                verticalAlignment = Alignment.Top
            ) {
                if (repositoryMenu.showIcon) {
                    if (module.icon.isNotNullOrBlank()) {
                        AsyncImage(
                            model = module.icon,
                            modifier = Modifier
                                .size(60.dp)
                                .clip(RoundedCornerShape(20)),
                            contentDescription = null
                        )
                    } else {
                        Logo(
                            icon = R.drawable.box,
                            modifier = Modifier.size(60.dp),
                            contentColor = MaterialTheme.colorScheme.onSecondaryContainer,
                            containerColor = MaterialTheme.colorScheme.secondaryContainer,
                            shape = RoundedCornerShape(20)
                        )
                    }

                    Spacer(modifier = Modifier.width(16.dp))
                }

                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = module.name,
                            style = MaterialTheme.typography.titleLarge,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis
                        )
                        if (module.isVerified) {
                            Spacer(modifier = Modifier.width(4.dp))

                            val iconSize =
                                with(density) { MaterialTheme.typography.titleMedium.fontSize.toDp() * 1.0f }

                            Icon(
                                modifier = Modifier.size(iconSize),
                                painter = painterResource(id = R.drawable.rosette_discount_check),
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.onPrimaryContainer
                            )
                        }
                    }


                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        modifier = Modifier.clickable(
                            onClick = {
                                navController.navigateSingleTopTo(
                                    RepositoryViewModel.putSearch("author", module.author)
                                )
                            }
                        ),
                        text = module.author,
                        style = MaterialTheme.typography.bodyMedium.copy(color = MaterialTheme.colorScheme.surfaceTint),
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            Row(
                modifier = Modifier.padding(horizontal = 16.dp),
                verticalAlignment = Alignment.Top,
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                local?.let {
                    val ops by remember(
                        userPreferences.useShellForModuleStateChange,
                        it,
                        it.state
                    ) {
                        derivedStateOf {
                            viewModel.createModuleOps(
                                userPreferences.useShellForModuleStateChange,
                                it
                            )
                        }
                    }

                    OutlinedButton(
                        enabled = viewModel.isProviderAlive && (!userPreferences.useShellForModuleStateChange || it.state != State.REMOVE),
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f),
                        onClick = ops.change
                    ) {
                        val style = LocalTextStyle.current
                        val progressSize =
                            with(density) { style.fontSize.toDp() * 1.0f }

                        if (ops.isOpsRunning) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(progressSize),
                                color = MaterialTheme.colorScheme.onPrimary,
                                strokeWidth = 2.dp
                            )
                        } else {
                            Text(
                                text = stringResource(
                                    id = if (it.state == State.REMOVE) {
                                        R.string.module_restore
                                    } else {
                                        R.string.module_remove
                                    }
                                ),
                                maxLines = 1
                            )
                        }
                    }
                }

                val buttonTextResId = when {
                    local == null -> R.string.module_install
                    lastVersionItem != null && module.versionCode > local.versionCode -> R.string.module_update
                    else -> R.string.module_reinstall
                }

                Button(
                    enabled = viewModel.isProviderAlive && lastVersionItem != null,
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    onClick = {
                        installConfirm = true
                    },
                ) {
                    Text(
                        text = stringResource(id = buttonTextResId),
                        maxLines = 1
                    )
                }
            }

            val progress = lastVersionItem?.let {
                viewModel.getProgress(it)
            } ?: 0f

            if (progress != 0f) {
                LinearProgressIndicator(
                    progress = { progress },
                    strokeCap = StrokeCap.Round,
                    modifier = Modifier
                        .padding(vertical = 16.dp)
                        .height(0.9.dp)
                        .fillMaxWidth()
                )
            } else {
                HorizontalDivider(
                    modifier = Modifier.padding(vertical = 16.dp),
                    thickness = 0.9.dp
                )
            }

            manager.isNotSupportedRootVersion(viewModel.versionCode) { min ->
                if (min == -1) {
                    Alert(
                        title = stringResource(id = R.string.view_module_unsupported),
                        backgroundColor = MaterialTheme.colorScheme.errorContainer,
                        textColor = MaterialTheme.colorScheme.onErrorContainer,
                        message = stringResource(id = R.string.view_module_unsupported_desc),
                        modifier = Modifier.padding(horizontal = 16.dp)
                    )
                } else {
                    Alert(
                        title = stringResource(id = R.string.view_module_low_root_version),
                        backgroundColor = MaterialTheme.colorScheme.tertiaryContainer,
                        textColor = MaterialTheme.colorScheme.onTertiaryContainer,
                        message = stringResource(id = R.string.view_module_low_root_version_desc),
                        modifier = Modifier.padding(horizontal = 16.dp)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))
            }

            manager.isNotSupportedDevice {
                Alert(
                    title = stringResource(id = R.string.view_module_unsupported_device),
                    backgroundColor = MaterialTheme.colorScheme.errorContainer,
                    textColor = MaterialTheme.colorScheme.onErrorContainer,
                    message = stringResource(id = R.string.view_module_unsupported_device_desc),
                    modifier = Modifier.padding(horizontal = 16.dp)
                )

                Spacer(modifier = Modifier.height(16.dp))
            }

            manager.isNotSupportedArch {
                Alert(
                    title = stringResource(id = R.string.view_module_unsupported_arch),
                    backgroundColor = MaterialTheme.colorScheme.errorContainer,
                    textColor = MaterialTheme.colorScheme.onErrorContainer,
                    message = stringResource(id = R.string.view_module_unsupported_arch_desc),
                    modifier = Modifier.padding(horizontal = 16.dp)
                )

                Spacer(modifier = Modifier.height(16.dp))
            }

            if (module.note?.message != null) {
                if (module.note.title != null && module.note.title.lowercase() == "deprecated") {
                    Alert(
                        backgroundColor = MaterialTheme.colorScheme.errorContainer,
                        textColor = MaterialTheme.colorScheme.onErrorContainer,
                        title = module.note.title,
                        message = module.note.message,
                        modifier = Modifier.padding(horizontal = 16.dp)
                    )
                } else {
                    Alert(
                        title = module.note.title,
                        message = module.note.message,
                        modifier = Modifier.padding(horizontal = 16.dp)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))
            }

            if (!module.readme.isNullOrBlank()) {
                ListButtonItem(
                    contentPaddingValues = listItemContentPaddingValues,
                    iconToRight = true,
                    icon = R.drawable.arrow_right,
                    title = stringResource(R.string.view_module_about_this_module),
                    onClick = {
                        navController.navigateSingleTopTo(
                            ModuleViewModel.putModuleId(
                                module,
                                RepositoryScreen.Description.route
                            )
                        )
                    }
                )
            } else {
                ListItem(
                    contentPaddingValues = listItemContentPaddingValues,
                    title = stringResource(R.string.view_module_about_this_module),
                )
            }


            Text(
                modifier = Modifier.padding(horizontal = 16.dp),
                text = module.description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.outline
            )

            module.categories?.ifNotEmpty {
                Spacer(modifier = Modifier.height(8.dp))

                LazyRow(
                    state = categoriesLazyListState,
                    modifier = Modifier
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp)
                ) {
                    items(it.size) { category ->
                        AssistChip(
                            onClick = {
                                navController.navigateSingleTopTo(
                                    RepositoryViewModel.putSearch("category", it[category])
                                )
                            },
                            label = { Text(it[category]) }
                        )
                    }
                }
            }

            module.hasCoverOrScreenshots { cover, screenshots ->
                val coverAspectRatio = 2.048f
                val screenshotAspectRatio = 9f / 16f
                val commonHeight = 160.dp

                Spacer(modifier = Modifier.height(16.dp))

                LazyRow(
                    state = screenshotsLazyListState,
                    modifier = Modifier
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp)

                ) {
                    cover.ifNotNullOrBlank {
                        if (repositoryMenu.showCover)
                            item {
                                val painter = rememberAsyncImagePainter(
                                    model = ImageRequest.Builder(context).data(it)
                                        .memoryCacheKey(it)
                                        .diskCacheKey(it).diskCachePolicy(CachePolicy.ENABLED)
                                        .memoryCachePolicy(CachePolicy.ENABLED).build(),
                                )

                                if (painter.state !is AsyncImagePainter.State.Error) {
                                    Image(
                                        painter = painter,
                                        contentDescription = null,
                                        contentScale = ContentScale.Crop,
                                        modifier = Modifier
                                            .height(commonHeight)
                                            .aspectRatio(coverAspectRatio)
                                            .clip(RoundedCornerShape(10.dp)),
                                    )
                                } else {
                                    Logo(
                                        icon = R.drawable.alert_triangle,
                                        shape = RoundedCornerShape(0.dp),
                                        modifier = Modifier
                                            .height(commonHeight)
                                            .aspectRatio(coverAspectRatio)
                                            .clip(RoundedCornerShape(10.dp)),

                                        )
                                }
                            }
                    }

                    screenshots.ifNotEmpty {
                        items(it.size) { index ->
                            AsyncImage(
                                model = it[index],
                                contentDescription = null,
                                modifier = Modifier
                                    .height(commonHeight)
                                    .aspectRatio(screenshotAspectRatio)
                                    .clip(RoundedCornerShape(10.dp)),
                                contentScale = ContentScale.Crop
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            ListCollapseItem(
                contentPaddingValues = listItemContentPaddingValues,
                iconToRight = true,
                title = stringResource(R.string.view_module_module_support)
            ) {
                module.donate?.ifNotNullOrBlank {
                    ListButtonItem(
                        icon = R.drawable.currency_dollar,
                        contentPaddingValues = PaddingValues(
                            vertical = 8.dp,
                            horizontal = 16.dp
                        ),
                        itemTextStyle = subListItemStyle,
                        title = stringResource(id = R.string.view_module_donate),
                        desc = stringResource(id = R.string.view_module_donate_desc),
                        onClick = {
                            browser.openUri(it)
                        }
                    )
                }

                ListButtonItem(
                    icon = R.drawable.brand_git,
                    contentPaddingValues = PaddingValues(vertical = 8.dp, horizontal = 16.dp),
                    itemTextStyle = subListItemStyle,
                    title = stringResource(id = R.string.view_module_source),
                    onClick = {
                        browser.openUri(module.track.source)
                    }
                )

                module.homepage?.ifNotNullOrBlank {
                    ListButtonItem(
                        icon = R.drawable.world_www,
                        contentPaddingValues = PaddingValues(
                            vertical = 8.dp,
                            horizontal = 16.dp
                        ),
                        itemTextStyle = subListItemStyle,
                        title = stringResource(id = R.string.view_module_homepage),
                        onClick = {
                            browser.openUri(it)
                        }
                    )
                }

                module.support?.ifNotNullOrBlank {
                    ListButtonItem(
                        icon = R.drawable.heart_handshake,
                        contentPaddingValues = PaddingValues(
                            vertical = 8.dp,
                            horizontal = 16.dp
                        ),
                        itemTextStyle = subListItemStyle,
                        title = stringResource(id = R.string.view_module_support),
                        onClick = {
                            browser.openUri(it)
                        }
                    )
                }
            }

            module.features?.let {
                if (it.isNotEmpty()) {
                    ListCollapseItem(
                        contentPaddingValues = listItemContentPaddingValues,
                        iconToRight = true,
                        title = stringResource(R.string.view_module_features),
                        labels = listOf(
                            stringResource(
                                R.string.view_module_section_count,
                                it.size
                            )
                        )
                    ) {
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.service,
                            key = R.string.view_module_features_service,
                            value = R.string.view_module_features_service_sub
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.postFsData,
                            key = R.string.view_module_features_post_fs_data,
                            value = R.string.view_module_features_post_fs_data_sub
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.resetprop,
                            key = R.string.view_module_features_system_properties,
                            value = R.string.view_module_features_resetprop_sub
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.sepolicy,
                            key = R.string.view_module_features_selinux_policy,
                            value = R.string.view_module_features_sepolicy_sub
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.zygisk,
                            key = R.string.view_module_features_zygisk,
                            value = R.string.view_module_features_zygisk_sub
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.apks,
                            key = R.string.view_module_features_apks,
                            value = R.string.view_module_features_apks_sub
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.webroot,
                            key = R.string.view_module_features_webui,
                            value = R.string.view_module_features_webui_sub,
                            rootSolutions = listOf("KernelSU", "APatch", "MMRL")
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.action,
                            key = R.string.view_module_features_action,
                            value = R.string.view_module_features_action_sub,
                            rootSolutions = listOf("KernelSU", "APatch", "MMRL")
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.postMount,
                            key = R.string.view_module_features_post_mount,
                            value = R.string.view_module_features_postmount_sub,
                            rootSolutions = listOf("KernelSU", "APatch")
                        )
                        FeatureListItem(
                            itemTextStyle = subListItemStyle,
                            feature = it.bootCompleted,
                            key = R.string.view_module_features_boot_completed,
                            value = R.string.view_module_features_bootcompleted_sub,
                            rootSolutions = listOf("KernelSU", "APatch")
                        )
                    }
                }
            }

            module.track.antifeatures?.ifNotEmpty {
                ListCollapseItem(
                    contentPaddingValues = listItemContentPaddingValues,
                    iconToRight = true,
                    title = stringResource(R.string.view_module_antifeatures),
                    labels = listOf(stringResource(R.string.view_module_section_count, it.size))
                ) {
                    AntiFeaturesItem(
                        itemTextStyle = subListItemStyle,
                        contentPaddingValues = PaddingValues(
                            vertical = 8.dp,
                            horizontal = 16.dp
                        ),
                        antifeatures = it
                    )
                }
            }

            requires.ifNotEmpty { requiredIds ->
                ListCollapseItem(
                    contentPaddingValues = listItemContentPaddingValues,
                    iconToRight = true,
                    title = stringResource(R.string.view_module_dependencies),
                    labels = listOf(
                        stringResource(
                            R.string.view_module_section_count,
                            requiredIds.size
                        )
                    )
                ) {
                    requiredIds.forEach { onlineModule ->
                        // val parts = requiredId.split("@")

                        // val id = parts[0]
                        // val version = (parts.getOrElse(1) { "-1" }).toInt()

                        ListButtonItem(
                            contentPaddingValues = PaddingValues(
                                vertical = 8.dp,
                                horizontal = 16.dp
                            ),
                            itemTextStyle = subListItemStyle,
                            title = onlineModule.name,
                            desc = onlineModule.versionCode.toString(),
                            onClick = {
                                navController.navigateSingleTopTo(
                                    ModuleViewModel.putModuleId(onlineModule),
                                    launchSingleTop = false
                                )
                            }
                        )
                    }
                }
            }

            HorizontalDivider(
                modifier = Modifier.padding(vertical = 16.dp),
                thickness = 0.9.dp
            )

            userPreferences.developerMode.takeTrue {
                ModuleInfoListItem(
                    title = R.string.view_module_module_id,
                    desc = module.id
                )
            }

            module.license.ifNotNullOrBlank {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 14.dp),
                ) {
                    Text(
                        style = MaterialTheme.typography.bodyMedium.copy(color = MaterialTheme.colorScheme.outline),
                        modifier = Modifier.weight(1f),
                        text = stringResource(id = R.string.view_module_license)
                    )
                    LicenseItem(licenseId = it)
                }
            }
            ModuleInfoListItem(
                infoCanDiffer = true,
                title = R.string.view_module_version,
                desc = "${module.version} (${module.versionCode})"
            )
            lastVersionItem?.let {
                ModuleInfoListItem(
                    infoCanDiffer = true,
                    title = R.string.view_module_last_updated,
                    desc = it.timestamp.toFormattedDateSafely(userPreferences.datePattern)
                )
            }
            module.size?.let {
                ModuleInfoListItem(
                    infoCanDiffer = true,
                    title = R.string.view_module_file_size,
                    desc = it.toFormatedFileSize()
                )
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 14.dp),
            ) {
                Text(
                    style = MaterialTheme.typography.bodyMedium.copy(color = MaterialTheme.colorScheme.outline),
                    modifier = Modifier.weight(1f),
                    text = stringResource(id = R.string.view_module_provided_by)
                )

                Text(
                    style = MaterialTheme.typography.bodyMedium.copy(color = MaterialTheme.colorScheme.surfaceTint),
                    modifier = Modifier.clickable(
                        onClick = { viewTrackBottomSheet = true }
                    ),
                    text = stringResource(id = R.string.view_module_view_track),
                )
            }

            manager.min?.let {
                ModuleInfoListItem(
                    infoCanDiffer = true,
                    title = R.string.view_module_required_root_version,
                    desc = it.toString()
                )
            }

            module.minApi?.let {
                ModuleInfoListItem(
                    title = R.string.view_module_required_os,
                    desc = stringResource(
                        R.string.view_module_required_os_value, when (it) {
                            Build.VERSION_CODES.JELLY_BEAN -> "4.1"
                            Build.VERSION_CODES.JELLY_BEAN_MR1 -> "4.2"
                            Build.VERSION_CODES.JELLY_BEAN_MR2 -> "4.3"
                            Build.VERSION_CODES.KITKAT -> "4.4"
                            Build.VERSION_CODES.KITKAT_WATCH -> "4.4"
                            Build.VERSION_CODES.LOLLIPOP -> "5.0"
                            Build.VERSION_CODES.LOLLIPOP_MR1 -> "5.1"
                            Build.VERSION_CODES.M -> "6.0"
                            Build.VERSION_CODES.N -> "7.0"
                            Build.VERSION_CODES.N_MR1 -> "7.1"
                            Build.VERSION_CODES.O -> "8.0"
                            Build.VERSION_CODES.O_MR1 -> "8.1"
                            Build.VERSION_CODES.P -> "9.0"
                            Build.VERSION_CODES.Q -> "10"
                            Build.VERSION_CODES.R -> "11"
                            Build.VERSION_CODES.S -> "12"
                            Build.VERSION_CODES.S_V2 -> "12"
                            Build.VERSION_CODES.TIRAMISU -> "13"
                            Build.VERSION_CODES.UPSIDE_DOWN_CAKE -> "14"
                            else -> "[Sdk: $it]"
                        }
                    )
                )
            }

            module.track.added?.let {
                ModuleInfoListItem(
                    infoCanDiffer = true,
                    title = R.string.view_module_added_on,
                    desc = it.toFormattedDateSafely()
                )
            }

            local?.let {
                ListCollapseItem(
                    contentPaddingValues = PaddingValues(vertical = 8.dp, horizontal = 16.dp),
                    iconToRight = true,
                    itemTextStyle = subListItemStyle.copy(titleTextColor = MaterialTheme.colorScheme.surfaceTint),
                    title = stringResource(R.string.module_installed)
                ) {
                    userPreferences.developerMode.takeTrue {
                        ModuleInfoListItem(
                            title = R.string.view_module_module_id,
                            desc = it.id
                        )
                    }

                    ModuleInfoListItem(
                        title = R.string.view_module_version,
                        desc = "${it.version} (${it.versionCode})"
                    )
                    ModuleInfoListItem(
                        title = R.string.view_module_last_updated,
                        desc = it.lastUpdated.toFormattedDateSafely
                    )
                }
            }

            MarkdownText(
                modifier = Modifier.padding(16.dp),
                style = MaterialTheme.typography.bodySmall,
                text = stringResource(
                    R.string.view_module_mod_infos_disclaimer,
                    MaterialTheme.colorScheme.surfaceTint.toArgb()
                ),
                onTagClick = { id ->
                    when (id) {
                        "track" -> {
                            viewTrackBottomSheet = true
                        }
                    }
                }
            )
        }
    }
}

@Composable
private fun ModuleInfoListItem(
    @StringRes title: Int,
    desc: String,
    style: TextStyle = MaterialTheme.typography.bodyMedium,
    infoCanDiffer: Boolean = false,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 14.dp),
    ) {
        Text(
            style = style.copy(color = MaterialTheme.colorScheme.outline),
            modifier = Modifier.weight(1f),
            text = stringResource(id = title) + if (infoCanDiffer) " *" else ""
        )
        Text(
            style = style,
            text = desc
        )
    }
}

@Composable
private fun FeatureListItem(
    feature: Boolean?,
    @StringRes key: Int,
    @StringRes value: Int,
    rootSolutions: List<String>? = null,
    itemTextStyle: ListItemTextStyle,
) {
    if (feature == null) return

    ListItem(
        contentPaddingValues = PaddingValues(vertical = 8.dp, horizontal = 16.dp),
        itemTextStyle = itemTextStyle,
        title = stringResource(id = key),
        desc = stringResource(id = value),
        labels = rootSolutions
    )
}


@Composable
private fun TopBar(
    modifier: Modifier = Modifier,
    navController: NavController,
    scrollBehavior: TopAppBarScrollBehavior,
    actions: @Composable RowScope.() -> Unit = {},
) = TopAppBar(
    modifier = modifier,
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(
                painter = painterResource(id = R.drawable.arrow_left), contentDescription = null
            )
        }
    },
    actions = actions,
    title = {},
    scrollBehavior = scrollBehavior
)