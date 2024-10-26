package com.dergoogler.mmrl.background

import android.content.Context
import android.content.Intent
import androidx.work.ExistingPeriodicWorkPolicy
import ext.dergoogler.mmrl.worker.MMRLBroadcastReceiver
import kotlinx.coroutines.flow.first
import timber.log.Timber

class BootBroadcastReceiver : MMRLBroadcastReceiver() {

    override suspend fun onBooted(context: Context, intent: Intent) {
        val userPreferences = userPreferencesRepository.data.first()

        Timber.d("BootBroadcastReceiver onBooted")

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
