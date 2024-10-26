package com.dergoogler.mmrl.background

import android.content.Context
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.Repo.Companion.toRepo
import com.dergoogler.mmrl.repository.ModulesRepository
import ext.dergoogler.mmrl.worker.MMRLCoroutineWorker

class RepoUpdateWorker(
    context: Context,
    params: WorkerParameters,
    modulesRepository: ModulesRepository
) : MMRLCoroutineWorker(context, params, modulesRepository) {

    override val notificationId = 1
    override val channelId = "RepoUpdateChannel"
    override val channelName = context.getString(R.string.work_repository_updates)
    override val channelDescription = context.getString(R.string.work_updates_for_repositories)

    override suspend fun doWork(): Result {
        super.doWork()
        return try {
            updateRepositories()
            sendSuccessNotification()
            Result.success()
        } catch (e: Exception) {
            sendFailureNotification()
            Result.failure()
        }
    }

    private suspend fun updateRepositories() {
        val repoDao = database.repoDao()
        val repos = repoDao.getAll()

        repos.forEach { repo ->
            try {
                modulesRepository.getRepo(repo.url.toRepo())
            } catch (e: Exception) {
                throw e
            }
        }
    }

    private fun sendSuccessNotification() {
        pushNotification(
            id = notificationId,
            title = applicationContext.getString(R.string.repo_update_service),
            message = applicationContext.getString(R.string.repo_update_service_desc)
        )
    }

    private fun sendFailureNotification() {
        pushNotification(
            id = notificationId,
            title = applicationContext.getString(R.string.repo_update_service_failed),
            message = applicationContext.getString(R.string.repo_update_service_failed_desc)
        )
    }
}