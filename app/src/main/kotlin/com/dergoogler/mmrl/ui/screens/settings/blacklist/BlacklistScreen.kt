package com.dergoogler.mmrl.ui.screens.settings.blacklist

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.network.runRequest
import com.dergoogler.mmrl.stub.IMMRLApiManager
import com.dergoogler.mmrl.ui.component.Loading
import com.dergoogler.mmrl.ui.component.SettingsScaffold
import com.dergoogler.mmrl.ui.screens.settings.blacklist.items.ModuleItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber


@Composable
fun BlacklistScreen() {
    var blacklist by remember { mutableStateOf<List<Blacklist>?>(null) }

    LaunchedEffect(Unit) {
        runRequest {
            withContext(Dispatchers.IO) {
                val api = IMMRLApiManager.build()
                return@withContext api.blacklist.execute()
            }
        }.onSuccess { list ->
            blacklist = list
        }.onFailure {
            Timber.e(it, "unable to get blacklist")
        }

    }

    SettingsScaffold(
        title = R.string.settings_blacklist
    ) {
        AnimatedVisibility(
            visible = blacklist == null, enter = fadeIn(), exit = fadeOut()
        ) {
            Loading()
        }

        AnimatedVisibility(
            visible = blacklist != null, enter = fadeIn(), exit = fadeOut()
        ) {
            blacklist?.let { bl ->
                LazyColumn {
                    items(items = bl, key = { it.id }) { module ->
                        ModuleItem(module = module)
                    }
                }
            }
        }
    }
}