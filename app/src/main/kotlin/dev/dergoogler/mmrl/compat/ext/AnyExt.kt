package dev.dergoogler.mmrl.compat.ext

import android.annotation.SuppressLint
import androidx.compose.runtime.Composable

infix fun <T> Any?.nullable(param: T): T? = if (this != null) param else null

/**
 * Returns a composable that can be invoked
 */
@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T, reified S> Any?.thenComposeInvoke(crossinline block: @Composable S.(T) -> Unit): (@Composable S.() -> Unit)? {
    return if (this != null) {
        { block(this, this@thenComposeInvoke as T) }
    } else {
        null
    }
}

/**
 * Returns a composable that can be invoked
 */
@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T> Any?.thenComposeInvoke(crossinline block: @Composable (T) -> Unit): (@Composable () -> Unit)? {
    return if (this != null) {
        { block(this@thenComposeInvoke as T) }
    } else {
        null
    }
}

/**
 * Returns a already invoked composable
 */
@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T> Any?.thenCompose(crossinline block: @Composable (T) -> Unit): Unit? = this.thenComposeInvoke<T>(block)?.invoke()

// @SuppressLint("ComposableNaming")
// @Composable
// inline fun <reified T, reified S> Any?.compose(crossinline block: @Composable S.(T) -> Unit): Unit? = this.composeInvoke<T, S>(block)?.invoke(this@compose as S)
