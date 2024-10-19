package com.dergoogler.mmrl.worker

import android.content.Context
import android.app.PendingIntent
import android.content.Intent
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.LocalModuleEntity
import com.dergoogler.mmrl.database.entity.OnlineModuleEntity
import com.dergoogler.mmrl.stub.IRepoManager
import com.dergoogler.mmrl.ui.activity.MainActivity
import ext.dergoogler.mmrl.worker.MMRLCoroutineWorker
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import timber.log.Timber

class ModuleUpdateWorker(
    context: Context,
    workerParams: WorkerParameters
) : MMRLCoroutineWorker(context, workerParams) {

    override val channelId = "ModuleUpdateChannel"
    override val channelName = "Module Updates"
    override val channelDescription = "Update Checker for Modules"

    override suspend fun doWork(): Result {
        super.doWork()

        return try {
            checkForUpdatesAndNotify()
            Result.success()
        } catch (e: Exception) {
            e.printStackTrace()
            Result.retry()
        }
    }

    private suspend fun checkForUpdatesAndNotify() {
        val onlineModules =
            fetchOnlineModules()
        val localModules = database.localDao().getAll()

        val onlineModuleMap = onlineModules.associateBy { it.id }

        for (localModule in localModules) {
            val onlineModule = onlineModuleMap[localModule.id]
            if (onlineModule != null && isNewerVersion(onlineModule, localModule)) {
                sendUpdateNotification(localModule, onlineModule)
            }
        }
    }

    private suspend fun fetchOnlineModules(): List<OnlineModuleEntity> {
        return withContext(Dispatchers.IO) {
            val repoDao = database.repoDao()
            val repos = repoDao.getAll()
            val onlineModules = mutableListOf<OnlineModuleEntity>()

            repos.forEach { repo ->
                val repoManager = IRepoManager.build(repo.url)

                try {
                    val response = repoManager.modules.execute()

                    if (response.isSuccessful && response.body() != null) {
                        val modulesJson = response.body()!!
                        onlineModules.addAll(modulesJson.modules.map {
                            OnlineModuleEntity(
                                it,
                                repo.url
                            )
                        })
                    } else {
                        Timber.e("Failed to fetch data for repo: ${repo.url}")
                    }
                } catch (e: Exception) {
                    Timber.e(e, "Error while fetching repo: ${repo.url}")
                }
            }

            onlineModules
        }
    }

    private fun isNewerVersion(
        onlineModule: OnlineModuleEntity,
        localModule: LocalModuleEntity
    ): Boolean {
        return onlineModule.versionCode > localModule.versionCode
    }

    private fun sendUpdateNotification(
        localModule: LocalModuleEntity,
        onlineModule: OnlineModuleEntity
    ) {
        val intent = Intent(applicationContext, MainActivity::class.java)

        val pendingIntent = PendingIntent.getActivity(
            applicationContext,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        pushNotification(
            id = localModule.id.hashCode(),
            icon = R.drawable.file_3d,
            title = "${localModule.name} as a new update!",
            message = "Update available from ${localModule.version} (${localModule.versionCode}) to ${onlineModule.version} (${onlineModule.versionCode}).",
        )
    }
}
