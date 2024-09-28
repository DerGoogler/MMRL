package com.dergoogler.mmrl.ui.activity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import android.content.Context
import android.content.Intent
import android.net.Uri
import dalvik.system.DexClassLoader
import androidx.compose.ui.platform.ComposeView
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ModConfActivity : ComponentActivity() {
    private lateinit var modConfCompose: Composable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val modId = intent.getStringExtra("MOD_ID") ?: return

        val fixedModId = modId.replace(Regex("[^a-zA-Z0-9._]"), "_")

        modConfCompose =
            LoadComposableUtils.loadComposableFromDex(
                this,
                "/data/adb/modules/$modId/system/usr/share/mmrl/modconf/$modId.dex",
                "com.dergoogler.modconf.${fixedModId}",
                "ModConfScreen"
            )

        setContent {
            modConfCompose
        }
    }


    companion object {
        fun start(context: Context, modId: String) {
            val intent = Intent(context, ModConfActivity::class.java)
                .apply {
                    putExtra("MOD_ID", modId)
                }

            context.startActivity(intent)
        }
    }
}

object LoadComposableUtils {
    fun loadComposableFromDex(
        context: Context,
        dexPath: String,
        className: String,
        methodName: String
    ): Composable {
        val optimizedDir = context.getDir("dex", Context.MODE_PRIVATE)
        val classLoader =
            DexClassLoader(dexPath, "/data/adb", null, context.classLoader)

        val clazz = classLoader.loadClass(className)
        val method = clazz.getDeclaredMethod(methodName)

        return method.invoke(null) as Composable
    }
}