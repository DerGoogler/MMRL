package com.dergoogler.mmrl.ui.theme

import androidx.activity.ComponentActivity
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext

@Composable
fun AppTheme(
    themeColor: Int,
    darkMode: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val color = Colors.getColor(id = themeColor)
    val colorScheme = when {
        darkMode -> color.darkColorScheme
        else -> color.lightColorScheme
    }

    SystemBarStyle(
        darkMode = darkMode
    )

    MaterialTheme(
        colorScheme = colorScheme,
        shapes = Shapes,
        typography = Typography,
        content = content
    )
}

@Composable
private fun SystemBarStyle(
    darkMode: Boolean,
    statusBarScrim: Color = Color.Transparent,
    navigationBarScrim: Color = Color.Transparent
) {
    val context = LocalContext.current
    val activity = context as ComponentActivity

    SideEffect {
        activity.enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.auto(
                statusBarScrim.toArgb(),
                statusBarScrim.toArgb(),
            ) { darkMode },
            navigationBarStyle = when {
                darkMode -> SystemBarStyle.dark(
                    navigationBarScrim.toArgb()
                )
                else -> SystemBarStyle.light(
                    navigationBarScrim.toArgb(),
                    navigationBarScrim.toArgb(),
                )
            }
        )
    }
}