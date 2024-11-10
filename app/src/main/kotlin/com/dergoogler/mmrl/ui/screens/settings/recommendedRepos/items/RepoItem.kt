package com.dergoogler.mmrl.ui.screens.settings.recommendedRepos.items

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.RecommendedRepo
import com.dergoogler.mmrl.ui.component.BulletList
import com.dergoogler.mmrl.ui.component.HtmlText
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.component.MarkdownText
import com.dergoogler.mmrl.ui.screens.settings.repositories.FailureDialog
import com.dergoogler.mmrl.ui.utils.expandedShape
import com.dergoogler.mmrl.viewmodel.RepositoriesViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch


@Composable
fun RepoItem(
    repo: RecommendedRepo,
    viewModel: RepositoriesViewModel,
    snackbarHostState: SnackbarHostState,
    scope: CoroutineScope,
) {
    val context = LocalContext.current

    var failure by remember { mutableStateOf(false) }
    var message: String by remember { mutableStateOf("") }
    var open by remember { mutableStateOf(false) }

    if (failure) FailureDialog(name = repo.url, message = message, onClose = {
        failure = false
        message = ""
    })

    val onAdd: () -> Unit = {
        viewModel.insert(url = repo.url, onSuccess = {
            scope.launch {
                snackbarHostState.showSnackbar(
                    message = context.getString(R.string.repo_added),
                    duration = SnackbarDuration.Short
                )
            }
        }, onFailure = { e ->
            failure = true
            message = e.stackTraceToString()
        })
    }

    if (open) {
        BottomSheet(repo = repo, onAdd = onAdd, onClose = { open = false })
    }

    ListButtonItem(
        title = repo.name, desc = repo.url, onClick = { open = true }, onLongClick = onAdd
    )
}

@Composable
private fun BottomSheet(
    repo: RecommendedRepo,
    onAdd: () -> Unit,
    onClose: () -> Unit,
) = ModalBottomSheet(
    onDismissRequest = onClose,
    sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    shape = BottomSheetDefaults.expandedShape(15.dp),
    windowInsets = WindowInsets(0),
) {
    Column(
        modifier = Modifier.padding(bottom = 18.dp),
    ) {

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {

            Column(
                modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = repo.name,
                    style = MaterialTheme.typography.titleLarge,
                )

                Text(
                    text = repo.url,
                    style = MaterialTheme.typography.titleSmall,
                    color = MaterialTheme.colorScheme.surfaceTint
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            repo.notes?.let {
                if (it.isNotEmpty()) {
                    Surface(
                        color = MaterialTheme.colorScheme.surface,
                        tonalElevation = 1.dp,
                        shape = RoundedCornerShape(20.dp)
                    ) {
                        HtmlText(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            text = it,
                            style = MaterialTheme.typography.bodyMedium,
                        )
                    }

                    Spacer(modifier = Modifier.height(4.dp))
                }
            }
        }


        repo.maintainers?.let {
            if (it.isNotEmpty()) {
                Column(
                    modifier = Modifier
                        .padding(horizontal = 16.dp)
                        .fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Text(
                        text = stringResource(id = R.string.maintained_by),
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    BulletList(
                        style = MaterialTheme.typography.titleMedium.copy(color = MaterialTheme.colorScheme.outline),
                        items = it
                    )
                }


            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(modifier = Modifier
            .padding(horizontal = 16.dp)
            .fillMaxWidth(), onClick = {
            onClose()
            onAdd()
        }) {
            Text(stringResource(R.string.repo_add_dialog_add))
        }

        NavigationBarsSpacer()
    }
}