package com.dergoogler.mmrl.utils.extensions
import kotlin.reflect.full.memberProperties

inline fun <reified T : Any> T.isObjectEmpty(): Boolean {
    return this::class.memberProperties.all { prop ->
        when (val value = prop.call(this)) {
            null -> true
            is String -> value.isEmpty()
            is Collection<*> -> value.isEmpty()
            is Map<*, *> -> value.isEmpty()
            else -> false
        }
    }
}