package com.dergoogler.mmrl

import android.app.Application
import com.dergoogler.mmrl.app.utils.NotificationUtils
import com.dergoogler.mmrl.network.NetworkUtils
import com.dergoogler.mmrl.utils.timber.DebugTree
import com.dergoogler.mmrl.utils.timber.ReleaseTree
import dagger.hilt.android.HiltAndroidApp
import dev.dergoogler.mmrl.compat.ServiceManagerCompat
import timber.log.Timber

@HiltAndroidApp
class App : Application() {
    init {
        if (BuildConfig.IS_DEV_VERSION) {
            Timber.plant(DebugTree())
        } else {
            Timber.plant(ReleaseTree())
        }
    }

    override fun onCreate() {
        super.onCreate()

        ServiceManagerCompat.setHiddenApiExemptions()
        NotificationUtils.init(this)
        NetworkUtils.setCacheDir(cacheDir)
    }
}