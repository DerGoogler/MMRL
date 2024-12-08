package com.dergoogler.mmrl.background

import android.content.Context
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.Repo.Companion.toRepo
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.ui.activity.MainActivity
import dev.dergoogler.mmrl.compat.worker.MMRLCoroutineWorker

class RepoUpdateWorker(
    context: Context,
    params: WorkerParameters,
    modulesRepository: ModulesRepository
) : MMRLCoroutineWorker(context, params, modulesRepository) {

    override val notificationId = MainActivity.REPO_WORKER_ID
    override val channelName = MainActivity.REPO_WORKER_CHANNEL_NAME
    override val channelTitle = context.getString(MainActivity.REPO_WORKER_CHANNEL_TITLE)
    override val channelDescription = context.getString(MainActivity.REPO_WORKER_CHANNEL_DESC)

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
            title = applicationContext.getString(R.string.repo_update_service),
            message = applicationContext.getString(R.string.repo_update_service_desc)
        )
    }

    private fun sendFailureNotification() {
        pushNotification(
            title = applicationContext.getString(R.string.repo_update_service_failed),
            message = applicationContext.getString(R.string.repo_update_service_failed_desc)
        )
    }
}