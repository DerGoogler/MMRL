package com.dergoogler.mmrl.ui.activity

import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.scaleIn
import androidx.compose.animation.scaleOut
import androidx.compose.foundation.focusable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.TopAppBarScrollBehavior
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onKeyEvent
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Event
import com.dergoogler.mmrl.app.Event.Companion.isFinished
import com.dergoogler.mmrl.app.Event.Companion.isLoading
import com.dergoogler.mmrl.app.Event.Companion.isSucceeded
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import com.dergoogler.mmrl.ui.utils.isScrollingUp
import com.dergoogler.mmrl.viewmodel.InstallViewModel
import kotlinx.coroutines.launch


@Composable
fun InstallScreen(
    viewModel: InstallViewModel = hiltViewModel()
) {
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    val userPreferences = LocalUserPreferences.current

    val focusRequester = remember { FocusRequester() }
    val listState = rememberLazyListState()
    val isScrollingUp by listState.isScrollingUp()
    val showFab by remember {
        derivedStateOf {
            isScrollingUp && viewModel.event.isSucceeded
        }
    }

    LaunchedEffect(focusRequester) {
        focusRequester.requestFocus()
    }

    BackHandler(
        enabled = viewModel.event.isLoading,
        onBack = {}
    )

    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.CreateDocument("*/*")
    ) { uri ->
        if (uri == null) return@rememberLauncherForActivityResult

        scope.launch {
            viewModel.writeLogsTo(context, uri)
                .onSuccess {
                    val message = context.getString(R.string.install_logs_saved)
                    snackbarHostState.showSnackbar(
                        message = message,
                        duration = SnackbarDuration.Short
                    )
                }.onFailure {
                    val message = context.getString(
                        R.string.install_logs_save_failed,
                        it.message ?: context.getString(R.string.unknown_error)
                    )
                    snackbarHostState.showSnackbar(
                        message = message,
                        duration = SnackbarDuration.Short
                    )
                }
        }
    }

    var confirmReboot by remember { mutableStateOf(false) }
    if (confirmReboot) ConfirmRebootDialog(
        onClose = { confirmReboot = false },
        onConfirm = {
            confirmReboot = false
            viewModel.reboot()
        }
    )

    Scaffold(
        modifier = Modifier
            .onKeyEvent {
                when (it.key) {
                    Key.VolumeUp, Key.VolumeDown -> viewModel.event.isLoading

                    else -> false
                }
            }
            .focusRequester(focusRequester)
            .focusable()
            .nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            TopBar(
                exportLog = { launcher.launch(viewModel.logfile) },
                event = viewModel.event,
                scrollBehavior = scrollBehavior
            )
        },
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
                    reboot = {
                        if (userPreferences.confirmReboot) {
                            confirmReboot = true
                        } else {
                            viewModel.reboot()
                        }
                    }
                )
            }
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) {
        Console(
            list = viewModel.console,
            state = listState,
            modifier = Modifier
                .padding(it)
                .fillMaxWidth()
                .then(
                    if (userPreferences.terminalTextWrap) Modifier else Modifier.horizontalScroll(
                        rememberScrollState()
                    )
                )
        )
    }
}

@Composable
private fun Console(
    list: List<String>,
    state: LazyListState,
    modifier: Modifier = Modifier,
) {
    LaunchedEffect(list.size) {
        state.animateScrollToItem(list.size)
    }

    LazyColumn(
        state = state,
        modifier = modifier
    ) {
        items(list) {
            Text(
                text = it,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(horizontal = 8.dp),
                style = MaterialTheme.typography.bodySmall.copy(
                    fontFamily = FontFamily.Monospace
                )
            )
        }
    }
}

@Composable
private fun TopBar(
    exportLog: () -> Unit,
    event: Event,
    scrollBehavior: TopAppBarScrollBehavior
) = NavigateUpTopBar(
    title = stringResource(id = R.string.install_screen_title),
    subtitle = stringResource(
        id = when (event) {
            Event.LOADING -> R.string.install_flashing
            Event.FAILED -> R.string.install_failure
            else -> R.string.install_done
        }
    ),
    scrollBehavior = scrollBehavior,
    enable = event.isFinished,
    actions = {
        if (event.isFinished) {
            IconButton(
                onClick = exportLog
            ) {
                Icon(
                    painter = painterResource(id = R.drawable.device_floppy),
                    contentDescription = null
                )
            }
        }
    }
)


@Composable
private fun ConfirmRebootDialog(
    onClose: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        title = {
            Text(text = stringResource(id = R.string.install_screen_reboot_title))
        },
        text = {
            Text(text = stringResource(id = R.string.install_screen_reboot_text))
        },
        onDismissRequest = {
            onClose()
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onConfirm()
                }
            ) {
                Text(text = stringResource(id = R.string.install_screen_reboot_confirm))
            }
        },
        dismissButton = {
            TextButton(
                onClick = {
                    onClose()
                }
            ) {
                Text(text = stringResource(id = R.string.install_screen_reboot_dismiss))
            }
        }
    )
}

@Composable
private fun FloatingButton(
    reboot: () -> Unit,
) = FloatingActionButton(
    onClick = reboot
) {
    Icon(
        painter = painterResource(id = R.drawable.reload),
        contentDescription = null
    )
}
