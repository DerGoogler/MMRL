package com.dergoogler.mmrl.ui.screens.repository.view.items

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.LicenseContent
import com.dergoogler.mmrl.ui.component.NavigationBarsSpacer
import com.dergoogler.mmrl.ui.utils.expandedShape

@Composable
fun LicenseItem(
    licenseId: String
) = Box {
    var open by rememberSaveable { mutableStateOf(false) }

    TagItem(
        icon = R.drawable.file_certificate,
        onClick = { open = true }
    )

    if (open) {
        ModalBottomSheet(
            onDismissRequest = { open = false },
            shape = BottomSheetDefaults.expandedShape(15.dp),
            windowInsets = WindowInsets(0)
        ) {
            Text(
                text = stringResource(id = R.string.license_title),
                style = MaterialTheme.typography.headlineSmall,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )

            LicenseContent(
                licenseId = licenseId,
                modifier = Modifier
                    .padding(top = 16.dp)
                    .padding(horizontal = 16.dp)
            )

            NavigationBarsSpacer()
        }
    }
}