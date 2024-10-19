package ext.dergoogler.mmrl.worker

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import androidx.annotation.DrawableRes
import androidx.core.app.NotificationCompat
import androidx.room.Room
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.database.AppDatabase
import ext.dergoogler.mmrl.activity.MMRLComponentActivity
import timber.log.Timber

open class MMRLCoroutineWorker(
    context: Context,
    params: WorkerParameters,
) : CoroutineWorker(context, params) {
    private val notificationManager =
        applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    open val channelId = ""
    open val channelName = ""
    open val channelDescription = ""

    override suspend fun doWork(): Result {
        if (channelId.isEmpty() || channelName.isEmpty() || channelDescription.isEmpty()) {
            return Result.failure()
        }

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

    fun pushNotification(
        id: Int,
        title: String,
        message: String,
        pendingIntent: PendingIntent? = null,
        @DrawableRes icon: Int = R.drawable.box
    ) {
        if (!MMRLComponentActivity.isAppInForeground) {
            val notification = NotificationCompat.Builder(applicationContext, channelId).apply {
                setContentTitle(title)
                setContentText(message)
                setSmallIcon(icon)
                setContentIntent(pendingIntent)

                Timber.d("Channel ID: $channelId")
                Timber.d("Channel Name: $channelName")
                Timber.d("Channel Description: $channelDescription")
            }.build()

            notificationManager.notify(id, notification)
        }
    }
}