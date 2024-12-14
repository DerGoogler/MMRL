package com.dergoogler.mmrl.ui.screens.modules.items

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.ui.component.Alert
import com.dergoogler.mmrl.ui.component.BottomSheet
import com.dergoogler.mmrl.ui.component.ListButtonItem
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.ext.takeTrue

@Composable
fun RunnerBottomSheet(
    onClose: () -> Unit,
    module: LocalModule,
) = BottomSheet(onDismissRequest = onClose) {
    val context = LocalContext.current

    Text(
        modifier = Modifier.padding(16.dp),
        style = MaterialTheme.typography.headlineMedium,
        text = "Runners"
    )

    module.runners.webui.takeTrue {
        ListButtonItem(
            icon = R.drawable.world_code,
            title = stringResource(id = R.string.view_module_features_webui),
            desc = stringResource(id = R.string.view_module_features_webui_sub),
            onClick = {
                onClose()
                MMRLComponentActivity.startWebUIActivity(
                    context = context,
                    modId = module.id
                )
            }
        )
    }
    module.runners.action.takeTrue {
        ListButtonItem(
            icon = R.drawable.device_mobile_code,
            title = stringResource(id = R.string.view_module_features_action),
            desc = stringResource(id = R.string.view_module_features_action_sub),
            onClick = {
                onClose()
                MMRLComponentActivity.startActionActivity(
                    context = context,
                    modId = module.id
                )
            },
            labels = listOf("Beta")
        )
    }

    Alert(
        icon = R.drawable.alert_triangle,
        title = stringResource(id = R.string.generic_disclaimer_title),
        backgroundColor = MaterialTheme.colorScheme.tertiaryContainer,
        textColor = MaterialTheme.colorScheme.onTertiaryContainer,
        message = stringResource(id = R.string.generic_disclaimer_desc),
        modifier = Modifier.padding(16.dp)
    )

    Spacer(modifier = Modifier.height(16.dp))
}