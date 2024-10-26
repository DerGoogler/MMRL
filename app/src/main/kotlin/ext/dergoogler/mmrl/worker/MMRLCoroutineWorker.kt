package ext.dergoogler.mmrl.worker

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import androidx.annotation.DrawableRes
import androidx.core.app.NotificationCompat
import androidx.room.Room
import androidx.work.CoroutineWorker
import androidx.work.ForegroundInfo
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.AppDatabase
import com.dergoogler.mmrl.repository.ModulesRepository
import timber.log.Timber
import javax.inject.Inject

open class MMRLCoroutineWorker @Inject constructor(
    context: Context,
    params: WorkerParameters,
    val modulesRepository: ModulesRepository
) : CoroutineWorker(context, params) {
    private val notificationManager =
        applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    open val notificationId = 0
    open val channelId = ""
    open val channelName = ""
    open val channelDescription = ""

    override suspend fun doWork(): Result {
        if (channelId.isEmpty() || channelName.isEmpty() || channelDescription.isEmpty()) {
            return Result.failure()
        }

        setForeground(createForegroundInfo())

        createNotificationChannel()

        return Result.success()
    }

    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            channelId,
            channelName,
            NotificationManager.IMPORTANCE_DEFAULT
        )

        channel.description = channelDescription

        notificationManager.createNotificationChannel(channel)

    }

    val database
        get(): AppDatabase {
            val database: AppDatabase = Room.databaseBuilder(
                applicationContext,
                AppDatabase::class.java,
                "mmrl"
            ).build()

            return database
        }

    private fun createForegroundInfo(): ForegroundInfo {
        val notification = NotificationCompat.Builder(applicationContext, channelId).apply {
            setContentTitle(channelName)
            setContentText(channelDescription)
            setSmallIcon(R.drawable.box)
            priority = NotificationCompat.PRIORITY_LOW
        }.build()

        return ForegroundInfo(notificationId, notification)
    }

    fun pushNotification(
        id: Int,
        title: String,
        message: String,
        pendingIntent: PendingIntent? = null,
        @DrawableRes icon: Int = R.drawable.box
    ) {
        val notification = NotificationCompat.Builder(applicationContext, channelId).apply {
            setContentTitle(title)
            setContentText(message)
            setSmallIcon(icon)
            setContentIntent(pendingIntent)
            setAutoCancel(true)
            priority = NotificationCompat.PRIORITY_HIGH
            setDefaults(NotificationCompat.DEFAULT_ALL)

            Timber.d("Channel ID: $channelId")
            Timber.d("Channel Name: $channelName")
            Timber.d("Channel Description: $channelDescription")
        }.build()

        notificationManager.notify(id, notification)
    }
}