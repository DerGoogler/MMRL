package com.dergoogler.mmrl.ui.activity

import android.os.Bundle
import ext.dergoogler.mmrl.activity.MMRLComponentActivity
import ext.dergoogler.mmrl.activity.setBaseContent

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
