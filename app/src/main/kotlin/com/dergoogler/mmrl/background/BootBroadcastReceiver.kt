package com.dergoogler.mmrl.background

import android.content.Context
import android.content.Intent
import com.dergoogler.mmrl.datastore.UserPreferencesCompat
import dev.dergoogler.mmrl.compat.worker.MMRLBroadcastReceiver
import kotlinx.coroutines.flow.first
import timber.log.Timber

class BootBroadcastReceiver : MMRLBroadcastReceiver() {
    override suspend fun onBooted(context: Context, intent: Intent) {
        val userPreferences = userPreferencesRepository.data.first()

        Timber.d("BootBroadcastReceiver onBooted")

        startWorkManagers(context, userPreferences)
    }

    companion object {
        fun startWorkManagers(context: Context, userPreferences: UserPreferencesCompat) {
//            startWorkTask(
//                workerClass = RepoUpdateWorker::class.java,
//                context = context,
//                enabled = userPreferences.autoUpdateRepos,
//                repeatInterval = userPreferences.autoUpdateReposInterval,
//                workName = MainActivity.REPO_UPDATE_WORK_NAME,
//                existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.UPDATE
//            )
//
//            startWorkTask(
//                workerClass = ModuleUpdateWorker::class.java,
//                context = context,
//                enabled = userPreferences.checkModuleUpdates,
//                repeatInterval = userPreferences.checkModuleUpdatesInterval,
//                workName = MainActivity.MODULE_UPDATE_WORK_NAME,
//                existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.UPDATE
//            )
        }
    }
}
