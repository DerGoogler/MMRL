package com.dergoogler.mmrl.ui.activity

import android.os.Bundle
import dev.dergoogler.mmrl.compat.activity.MMRLComponentActivity
import dev.dergoogler.mmrl.compat.activity.setBaseContent

class CrashHandlerActivity : MMRLComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val message = intent.getStringExtra("message") ?: "Unknown Message"
        val stacktrace = intent.getStringExtra("stacktrace") ?: "Unknown Stacktrace"

        setBaseContent {
            CrashHandlerScreen(
                message = message,
                stacktrace = stacktrace
            )
        }
    }
}
