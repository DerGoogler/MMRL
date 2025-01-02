package com.dergoogler.mmrl.ui.screens.repositories.screens.main

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.scaleIn
import androidx.compose.animation.scaleOut
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.BulkModule
import com.dergoogler.mmrl.ui.animate.slideInTopToBottom
import com.dergoogler.mmrl.ui.animate.slideOutBottomToTop
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.PageIndicator
import com.dergoogler.mmrl.ui.component.TextFieldDialog
import com.dergoogler.mmrl.ui.component.TopAppBar
import com.dergoogler.mmrl.ui.component.TopAppBarIcon
import com.dergoogler.mmrl.ui.screens.repositories.items.BulkBottomSheet
import com.dergoogler.mmrl.ui.utils.isScrollingUp
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.BulkInstallViewModel
import com.dergoogler.mmrl.viewmodel.RepositoriesViewModel
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import timber.log.Timber

@Composable
fun RepositoriesScreen(
    viewModel: RepositoriesViewModel,
    bulkInstallViewModel: BulkInstallViewModel,
) {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val list by viewModel.repos.collectAsStateWithLifecycle()
    val bulkModules by bulkInstallViewModel.bulkModules.collectAsStateWithLifecycle()

    val listSate = rememberLazyListState()
    val showFab by listSate.isScrollingUp()

    var repoUrl by remember { mutableStateOf("") }
    var message: String by remember { mutableStateOf("") }

    var failure by remember { mutableStateOf(false) }
    if (failure) FailureDialog(
        name = repoUrl,
        message = message,
        onClose = {
            failure = false
            message = ""
        }
    )

    var add by remember { mutableStateOf(false) }
    if (add) AddDialog(
        onClose = { add = false },
        onAdd = {
            repoUrl = it
            viewModel.insert(it) { e ->
                failure = true
                message = e.stackTraceToString()
            }
        }
    )

    val context = LocalContext.current
    var bulkInstallBottomSheet by remember { mutableStateOf(false) }

    val bulkDownload: (List<BulkModule>, Boolean) -> Unit = { item, install ->
        bulkInstallViewModel.downloadMultiple(
            items = item,
            onAllSuccess = {
                bulkInstallViewModel.clearBulkModules()
                bulkInstallBottomSheet = false
                if (install) {
                    MMRLComponentActivity.startInstallActivity(
                        context = context,
                        uri = it
                    )
                }
            },
            onFailure = {
                Timber.e(it)
            }
        )
    }

    if (bulkInstallBottomSheet) BulkBottomSheet(
        onClose = {
            bulkInstallBottomSheet = false
        },
        modules = bulkModules,
        onDownload = bulkDownload,
        bulkInstallViewModel = bulkInstallViewModel,
    )

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                onUpdate = viewModel::getRepoAll,
                scrollBehavior = scrollBehavior,
                onAdd = { add = true }
            )
        },
        contentWindowInsets = WindowInsets.none,
        floatingActionButton = {
            AnimatedVisibility(
                visible = showFab,
                enter = scaleIn(
                    animationSpec = tween(100),
                    initialScale = 0.8f
                ),
                exit = scaleOut(
                    animationSpec = tween(100),
                    targetScale = 0.8f
                )
            ) {
                FloatingButton(
                    onClick = {
                        bulkInstallBottomSheet = true
                    }
                )
            }
        },
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .padding(innerPadding)
        ) {
            if (viewModel.isLoading) {
                Loading()
            }

            if (list.isEmpty() && !viewModel.isLoading) {
                PageIndicator(
                    icon = R.drawable.git_pull_request,
                    text = R.string.repo_empty
                )
            }

            RepositoriesList(
                list = list,
                state = listSate,
                delete = viewModel::delete,
                getUpdate = viewModel::getUpdate
            )

            AnimatedVisibility(
                visible = viewModel.progress,
                enter = slideInTopToBottom(),
                exit = slideOutBottomToTop()
            ) {
                LinearProgressIndicator(
                    modifier = Modifier.fillMaxWidth(),
                    strokeCap = StrokeCap.Round
                )
            }
        }
    }
}

@Composable
private fun AddDialog(
    onClose: () -> Unit,
    onAdd: (String) -> Unit,
) {
    var domain by remember { mutableStateOf("") }

    val onDone: () -> Unit = {
        onAdd("https://${domain}/")
        onClose()
    }

    TextFieldDialog(
        shape = RoundedCornerShape(20.dp),
        onDismissRequest = onClose,
        title = { Text(text = stringResource(id = R.string.repo_add_dialog_title)) },
        confirmButton = {
            TextButton(
                onClick = onDone,
                enabled = domain.isNotBlank()
            ) {
                Text(text = stringResource(id = R.string.repo_add_dialog_add))
            }
        },
        dismissButton = {
            TextButton(
                onClick = onClose
            ) {
                Text(text = stringResource(id = R.string.dialog_cancel))
            }
        }
    ) { focusRequester ->
        OutlinedTextField(
            modifier = Modifier.focusRequester(focusRequester),
            textStyle = MaterialTheme.typography.bodyLarge,
            value = domain,
            onValueChange = { domain = it },
            prefix = { Text(text = "https://") },
            singleLine = false,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Text,
                imeAction = ImeAction.Done
            ),
            keyboardActions = KeyboardActions {
                if (domain.isNotBlank()) onDone()
            },
            shape = RoundedCornerShape(15.dp)
        )
    }
}


@Composable
private fun TopBar(
    onUpdate: () -> Unit,
    onAdd: () -> Unit,
    scrollBehavior: TopAppBarScrollBehavior,
) = TopAppBar(
    title = {
        TopAppBarIcon()
    },
    scrollBehavior = scrollBehavior,
    actions = {
        IconButton(
            onClick = onUpdate
        ) {
            Icon(
                painter = painterResource(id = R.drawable.refresh),
                contentDescription = null
            )
        }
        IconButton(
            onClick = onAdd
        ) {
            Icon(
                painter = painterResource(id = R.drawable.pencil_plus),
                contentDescription = null
            )
        }

    }
)


@Composable
private fun FloatingButton(
    onClick: () -> Unit,
) = FloatingActionButton(
    onClick = onClick,
    contentColor = MaterialTheme.colorScheme.onPrimary,
    containerColor = MaterialTheme.colorScheme.primary
) {
    Icon(
        painter = painterResource(id = R.drawable.package_import),
        contentDescription = null
    )
}