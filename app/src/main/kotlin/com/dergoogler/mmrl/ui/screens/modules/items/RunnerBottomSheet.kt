package com.dergoogler.mmrl.ui.screens.modules.items

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.LocalModule
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
            title = "WebUI",
            onClick = {
                MMRLComponentActivity.startModConfActivity(
                    context = context,
                    modId = module.id
                )
            }
        )
    }
    module.runners.action.takeTrue {
        ListButtonItem(
            icon = R.drawable.device_mobile_code,
            enabled = false,
            title = "Action",
            onClick = {},
            labels = listOf("TODO")
        )
    }

    Spacer(modifier = Modifier.height(16.dp))
}