package com.dergoogler.mmrl.ui.screens.repository.items

import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.BulkModule
import com.dergoogler.mmrl.ui.component.BottomSheet
import com.dergoogler.mmrl.ui.component.LabelItem
import com.dergoogler.mmrl.ui.component.PageIndicator
import ext.dergoogler.mmrl.ext.fadingEdge
import ext.dergoogler.mmrl.ext.toFormatedFileSize
import kotlinx.coroutines.launch

@Composable
fun BulkBottomSheet(
    onClose: () -> Unit,
    modules: List<BulkModule>,
    removeBulkModule: (BulkModule) -> Unit,
    onDownload: (List<BulkModule>, Boolean) -> Unit,
) = BottomSheet(onDismissRequest = onClose) {
    val scope = rememberCoroutineScope()

    Text(
        modifier = Modifier.padding(16.dp),
        style = MaterialTheme.typography.titleLarge,
        text = stringResource(R.string.bulk_module_install)
    )

    val topBottomFade = Brush.verticalGradient(
        0f to Color.Transparent,
        0.03f to Color.Red,
        0.97f to Color.Red,
        1f to Color.Transparent
    )



    if (modules.isEmpty()) {
        PageIndicator(
            modifier = Modifier.weight(1f),
            icon = R.drawable.cloud,
            text = R.string.search_empty,
        )
    } else {
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .animateContentSize()
                .fadingEdge(topBottomFade),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(
                items = modules,
                key = { it.id }
            ) { module ->

                val itemVisibility = remember {
                    Animatable(1f)
                }

                Surface(
                    modifier = Modifier
                        .alpha(itemVisibility.value),
                    color = MaterialTheme.colorScheme.surface,
                    tonalElevation = 1.dp,
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .padding(all = 16.dp)
                            .fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(
                            modifier = Modifier.weight(1f),
                            verticalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = module.name,
                                    style = MaterialTheme.typography.bodyMedium
                                )

                                module.versionItem.size?.let {
                                    LabelItem(
                                        text = it.toFormatedFileSize(),
                                        containerColor = MaterialTheme.colorScheme.error,
                                        contentColor = MaterialTheme.colorScheme.onError
                                    )
                                }
                            }

                            Text(
                                text = module.versionItem.versionDisplay,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }

                        FilledTonalButton(
                            onClick = {
                                scope.launch {
                                    itemVisibility.animateTo(
                                        targetValue = 0f,
                                        animationSpec = tween(20)
                                    )
                                    removeBulkModule(module)
                                }
                            },
                            contentPadding = PaddingValues(horizontal = 12.dp)
                        ) {
                            Icon(
                                modifier = Modifier.size(20.dp),
                                painter = painterResource(id = R.drawable.trash),
                                contentDescription = null
                            )
                        }
                    }
                }
            }
        }
    }

    Button(
        enabled = modules.isNotEmpty(),
        modifier = Modifier
            .padding(16.dp)
            .fillMaxWidth(),
        onClick = {
            onDownload(modules, true)
            onClose()
        }
    ) {
        Text(stringResource(id = R.string.module_install))
    }
}
