package dev.dergoogler.mmrl.compat.ext

import android.annotation.SuppressLint
import androidx.compose.runtime.Composable

infix fun <T> Any?.nullable(param: T): T? = if (this != null) param else null

@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T, reified S> Any?.thenComposeInvoke(crossinline block: @Composable S.(T) -> Unit): (@Composable S.() -> Unit)? {
    return if (this != null) {
        { block(this, this@thenComposeInvoke as T) }
    } else {
        null
    }
}

@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T, reified S, reified A> Any?.thenComposeInvoke(
    crossinline block: @Composable S.(T, A) -> Unit,
): (@Composable S.(A) -> Unit)? {
    return if (this != null) {
        { arg: A -> block(this, this@thenComposeInvoke as T, arg) }
    } else {
        null
    }
}

@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T, reified S, reified A> Any?.thenComposeInvoke(
    statement: Boolean,
    crossinline block: @Composable S.(T, A) -> Unit,
): (@Composable S.(A) -> Unit)? {
    return if (statement && this != null) {
        { arg: A -> block(this, this@thenComposeInvoke as T, arg) }
    } else {
        null
    }
}

@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T> Any?.thenComposeInvoke(crossinline block: @Composable (T) -> Unit): (@Composable () -> Unit)? {
    return if (this != null) {
        { block(this@thenComposeInvoke as T) }
    } else {
        null
    }
}

@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T> Any?.thenComposeInvoke(
    statement: Boolean,
    crossinline block: @Composable (T) -> Unit,
): (@Composable () -> Unit)? {
    return if (statement && this != null) {
        { block(this@thenComposeInvoke as T) }
    } else {
        null
    }
}

@SuppressLint("ComposableNaming")
@Composable
inline fun <reified T> Any?.thenCompose(crossinline block: @Composable (T) -> Unit): Unit? =
    this.thenComposeInvoke<T>(block)?.invoke()
//
//@SuppressLint("ComposableNaming")
//@Composable
//inline fun <reified T, reified A> Any?.thenCompose(crossinline block: @Composable (T, A) -> Unit): Unit? = this.thenComposeInvoke<T, A>(block)?.invoke(this@thenCompose as A)

// @SuppressLint("ComposableNaming")
// @Composable
// inline fun <reified T, reified S> Any?.compose(crossinline block: @Composable S.(T) -> Unit): Unit? = this.composeInvoke<T, S>(block)?.invoke(this@compose as S)
