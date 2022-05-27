package android.os

import androidx.annotation.Keep
import com.topjohnwu.superuser.ShellUtils

@Keep
object SystemProperties {
    @Keep
    operator fun get(key: String): String {
        var prop = ShellUtils.fastCmd("getprop $key").trim { it <= ' ' }
        if (prop.endsWith("\n")) prop = prop.substring(0, prop.length - 1).trim { it <= ' ' }
        return prop
    }
}