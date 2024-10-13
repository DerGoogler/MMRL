package com.dergoogler.mmrl.worker

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.room.Room
import androidx.work.CoroutineWorker
import androidx.work.ForegroundInfo
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.AppDatabase
import com.dergoogler.mmrl.stub.IRepoManager
import timber.log.Timber

class RepoUpdateWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            val updated = updateRepositories()

            if (updated) {
                createNotification(
                    title = applicationContext.getString(R.string.repo_update_service),
                    message = applicationContext.getString(R.string.repo_update_service_desc)
                )
            } else {
                createNotification(
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
        val database: AppDatabase = Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java,
            "mmrl"
        ).build()

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

    private fun createNotification(title: String, message: String) {
        val notificationManager =
            applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        val channel = NotificationChannel(
            "RepoUpdateChannel",
            "Repo Updates",
            NotificationManager.IMPORTANCE_DEFAULT
        )
        notificationManager.createNotificationChannel(channel)

        val notification = NotificationCompat.Builder(applicationContext, "RepoUpdateChannel")
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(R.drawable.box)
            .build()

        notificationManager.notify(1, notification)
    }
}