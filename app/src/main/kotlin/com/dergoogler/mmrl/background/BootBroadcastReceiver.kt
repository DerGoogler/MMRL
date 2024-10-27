package com.dergoogler.mmrl.background

import android.content.Context
import android.content.Intent
import androidx.work.ExistingPeriodicWorkPolicy
import com.dergoogler.mmrl.ui.activity.MainActivity
import ext.dergoogler.mmrl.worker.MMRLBroadcastReceiver
import kotlinx.coroutines.flow.first
import timber.log.Timber

class BootBroadcastReceiver : MMRLBroadcastReceiver() {

    override suspend fun onBooted(context: Context, intent: Intent) {
        val userPreferences = userPreferencesRepository.data.first()

        Timber.d("BootBroadcastReceiver onBooted")

        synchronized(lock) {
            Thread {
                startWorkTask<RepoUpdateWorker>(
                    context = context,
                    enabled = userPreferences.autoUpdateRepos,
                    repeatInterval = userPreferences.autoUpdateReposInterval,
                    workName = MainActivity.REPO_UPDATE_WORK_NAME,
                    existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.UPDATE
                )

                startWorkTask<ModuleUpdateWorker>(
                    context = context,
                    enabled = userPreferences.checkModuleUpdates,
                    repeatInterval = userPreferences.checkModuleUpdatesInterval,
                    workName = MainActivity.MODULE_UPDATE_WORK_NAME,
                    existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.UPDATE
                )
            }.start()
        }
    }
}
