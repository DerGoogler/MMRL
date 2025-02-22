package com.dergoogler.mmrl.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.dergoogler.mmrl.utils.log.Logcat
import dev.dergoogler.mmrl.compat.ext.deleteLog
import timber.log.Timber

class LogcatReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intent.ACTION_BOOT_COMPLETED -> {
                context.deleteLog(Logcat.FILE_NAME)
                Timber.i("boot-complete triggered")
            }
        }
    }
}