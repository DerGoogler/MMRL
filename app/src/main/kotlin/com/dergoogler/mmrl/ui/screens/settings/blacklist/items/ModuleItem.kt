package com.dergoogler.mmrl.ui.screens.settings.blacklist.items

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.ui.component.AntiFeaturesItem
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.component.ListButtonItem
import com.dergoogler.mmrl.ui.utils.expandedShape
import ext.dergoogler.mmrl.ext.launchCustomTab


@Composable
fun ModuleItem(
    module: Blacklist,
) {
    var open by remember { mutableStateOf(false) }
    if (open) {
        BottomSheet(
            module = module,
            onClose = { open = false })
    }

    ListButtonItem(title = module.id, desc = module.source, onClick = { open = true })
}


@Composable
private fun BottomSheet(
    module: Blacklist, onClose: () -> Unit,
) = ModalBottomSheet(
    onDismissRequest = onClose,
    sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    shape = BottomSheetDefaults.expandedShape(15.dp),
    windowInsets = WindowInsets(0),
) {
    val context = LocalContext.current


    Column(
        modifier = Modifier.padding(bottom = 18.dp),
    ) {

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                style = MaterialTheme.typography.titleLarge, text = module.id
            )

            Spacer(modifier = Modifier.height(16.dp))

            module.notes?.let {
                if (it.isNotEmpty()) {
                    Surface(
                        color = MaterialTheme.colorScheme.surface,
                        tonalElevation = 1.dp,
                        shape = RoundedCornerShape(20.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp)
                        ) {
                            Text(
                                text = stringResource(R.string.additional_notes),
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(bottom = 4.dp)
                            )
                            Text(
                                text = it,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.outline,
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(4.dp))
                }
            }
        }


        module.antifeatures?.let {
            if (it.isNotEmpty()) {
                AntiFeaturesItem(antifeatures = it)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Button(modifier = Modifier
            .padding(horizontal = 16.dp)
            .fillMaxWidth(), onClick = {
            context.launchCustomTab(module.source)

        }) {
            Text(stringResource(R.string.open_source))
        }

        NavigationBarsSpacer()
    }
}