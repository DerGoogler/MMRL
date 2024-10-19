package com.dergoogler.mmrl.worker

import android.content.Context
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.stub.IRepoManager
import ext.dergoogler.mmrl.worker.MMRLCoroutineWorker
import timber.log.Timber

class RepoUpdateWorker(
    context: Context,
    params: WorkerParameters
) : MMRLCoroutineWorker(context, params) {

    override val channelId = "RepoUpdateChannel"
    override val channelName = context.getString(R.string.work_repository_updates)
    override val channelDescription = context.getString(R.string.work_updates_for_repositories)

    override suspend fun doWork(): Result {
        super.doWork()

        return try {
            val updated = updateRepositories()

            if (updated) {
                pushNotification(
                    id = 1,
                    title = applicationContext.getString(R.string.repo_update_service),
                    message = applicationContext.getString(R.string.repo_update_service_desc)
                )
            } else {
                pushNotification(
                    id = 1,
                    title = applicationContext.getString(R.string.repo_update_service_failed),
                    message = applicationContext.getString(R.string.repo_update_service_failed_desc)
                )
            }
            Result.success()
        } catch (e: Exception) {
            Result.failure()
        }
    }

    private suspend fun updateRepositories(): Boolean {
        val repoDao = database.repoDao()
        val repos = repoDao.getAll()

        repos.forEach { repo ->
            val repoManager = IRepoManager.build(repo.url)

            try {
                val response = repoManager.modules.execute()

                if (response.isSuccessful && response.body() != null) {
                    val modulesJson = response.body()!!

                    if (repo.metadata.timestamp != modulesJson.metadata.timestamp) {
                        val updatedRepo = repo.copy(modulesJson = modulesJson)
                        repoDao.insert(updatedRepo)
                    }
                } else {
                    Timber.e("Failed to fetch data for repo: ${repo.url}")
                    return false
                }
            } catch (e: Exception) {
                Timber.e(e, "Error while updating repo: ${repo.url}")
                return false
            }
        }
        return true
    }
}