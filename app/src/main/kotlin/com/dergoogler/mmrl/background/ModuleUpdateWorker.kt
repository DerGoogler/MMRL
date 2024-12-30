package com.dergoogler.mmrl.background

import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.local.LocalModuleEntity
import com.dergoogler.mmrl.database.entity.online.OnlineModuleEntity
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.stub.IRepoManager
import com.dergoogler.mmrl.ui.activity.MainActivity
import dev.dergoogler.mmrl.compat.worker.MMRLCoroutineWorker
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

class ModuleUpdateWorker(
    context: Context,
    workerParams: WorkerParameters,
    modulesRepository: ModulesRepository
) : MMRLCoroutineWorker(context, workerParams, modulesRepository) {

    override val notificationId = MainActivity.MODULE_WORKER_ID
    override val channelName = MainActivity.MODULE_WORKER_CHANNEL_NAME
    override val channelTitle = context.getString(MainActivity.MODULE_WORKER_CHANNEL_TITLE)
    override val channelDescription = context.getString(MainActivity.MODULE_WORKER_CHANNEL_DESC)

    override suspend fun doWork(): Result {
        super.doWork()
        return try {
            checkForUpdatesAndNotify()
            Result.success()
        } catch (e: Exception) {
            Timber.e(e, "Update check failed")
            Result.retry()
        }
    }

    /**
     * Checks online modules against local modules for any available updates
     * and sends notifications if updates are available.
     */
    private suspend fun checkForUpdatesAndNotify() {
        val onlineModules = fetchOnlineModules()
        val localModules = database.localDao().getAll()
        val onlineModuleMap = onlineModules.associateBy { it.id }

        localModules.forEach { localModule ->
            onlineModuleMap[localModule.id]?.let { onlineModule ->
                if (isNewerVersion(onlineModule, localModule)) {
                    sendUpdateNotification(localModule, onlineModule)
                }
            }
        }
    }

    /**
     * Fetches all online modules from configured repositories.
     * @return List of online modules.
     */
    private suspend fun fetchOnlineModules(): List<OnlineModuleEntity> =
        withContext(Dispatchers.IO) {
            val onlineModules = mutableListOf<OnlineModuleEntity>()
            database.repoDao().getAll().forEach { repo ->
                val repoManager = IRepoManager.build(repo.url)
                try {
                    val response = repoManager.modules.execute()
                    response.body()?.modules?.let { modulesJson ->
                        onlineModules.addAll(modulesJson.map { module ->
                            OnlineModuleEntity(module, repo.url, Blacklist.EMPTY)
                        })
                    } ?: Timber.e("No data found for repo: ${repo.url}")
                } catch (e: Exception) {
                    Timber.e(e, "Error while fetching repo: ${repo.url}")
                }
            }
            onlineModules
        }

    /**
     * Compares versions of local and online modules.
     * @return true if the online module has a newer version.
     */
    private fun isNewerVersion(
        onlineModule: OnlineModuleEntity,
        localModule: LocalModuleEntity
    ): Boolean = onlineModule.versionCode > localModule.versionCode

    /**
     * Sends a notification if a module update is available.
     */
    private fun sendUpdateNotification(
        localModule: LocalModuleEntity,
        onlineModule: OnlineModuleEntity
    ) {
        val intent = Intent(applicationContext, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            applicationContext, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        pushNotification(
            id = localModule.id.hashCode(),
            icon = R.drawable.file_3d,
            title = applicationContext.getString(R.string.has_a_new_update, localModule.name),
            message = applicationContext.getString(
                R.string.update_available_from_to,
                localModule.version, localModule.versionCode,
                onlineModule.version, onlineModule.versionCode
            ),
            pendingIntent = pendingIntent
        )
    }
}
