package com.dergoogler.mmrl.worker

import android.content.Context
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.entity.Repo.Companion.toRepo
import com.dergoogler.mmrl.model.online.ModulesJson
import com.dergoogler.mmrl.repository.ModulesRepository
import ext.dergoogler.mmrl.worker.MMRLCoroutineWorker
import javax.inject.Inject


class RepoUpdateWorker @Inject constructor(
    context: Context, params: WorkerParameters, private val modulesRepository: ModulesRepository
) : MMRLCoroutineWorker(context, params) {

    override val channelId = "RepoUpdateChannel"
    override val channelName = context.getString(R.string.work_repository_updates)
    override val channelDescription = context.getString(R.string.work_updates_for_repositories)

    override suspend fun doWork(): Result {
        super.doWork()

        return try {
            val result = updateRepositories(onFailure = {
                pushNotification(
                    id = 1,
                    title = applicationContext.getString(R.string.repo_update_service_failed),
                    message = applicationContext.getString(R.string.repo_update_service_failed_desc)
                )
            }, onSuccess = {
                pushNotification(
                    id = 1,
                    title = applicationContext.getString(R.string.repo_update_service),
                    message = applicationContext.getString(R.string.repo_update_service_desc)
                )
            })

            result
        } catch (e: Exception) {
            Result.failure()
        }
    }

    private suspend fun updateRepositories(
        onSuccess: (value: ModulesJson) -> Unit,
        onFailure: (Throwable) -> Unit,
    ): Result {
        val repoDao = database.repoDao()
        val repos = repoDao.getAll()

        return try {
            repos.forEach { repo ->
                modulesRepository.getRepo(repo.url.toRepo()).apply {
                    onFailure(onFailure)
                    onSuccess(onSuccess)
                }
            }

            Result.success()
        } catch (e: Exception) {
            onFailure(e)
            Result.failure()
        }
    }
}