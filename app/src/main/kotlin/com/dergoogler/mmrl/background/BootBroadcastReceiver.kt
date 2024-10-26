package com.dergoogler.mmrl.background

import android.content.Context
import android.content.Intent
import androidx.work.ExistingPeriodicWorkPolicy
import ext.dergoogler.mmrl.worker.MMRLBroadcastReceiver
import kotlinx.coroutines.flow.first
import kotlin.coroutines.CoroutineContext

class BootBroadcastReceiver(
    coroutineContext: CoroutineContext
) : MMRLBroadcastReceiver(coroutineContext) {

    override suspend fun onBooted(context: Context, intent: Intent) {
        val userPreferences = userPreferencesRepository.data.first()

        startWorkTask<RepoUpdateWorker>(
            context = context,
            enabled = userPreferences.autoUpdateRepos,
            repeatInterval = userPreferences.autoUpdateReposInterval,
            workName = REPO_UPDATE_WORK_NAME,
            existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.UPDATE
        )

        startWorkTask<ModuleUpdateWorker>(
            context = context,
            enabled = userPreferences.checkModuleUpdates,
            repeatInterval = userPreferences.checkModuleUpdatesInterval,
            workName = MODULE_UPDATE_WORK_NAME,
            existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.UPDATE
        )
    }
}
