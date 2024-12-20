package dev.dergoogler.mmrl.compat.ext

import android.annotation.SuppressLint
import androidx.compose.runtime.Composable
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.InvocationKind
import kotlin.contracts.contract

/**
 * An infix function that returns the provided parameter if the current object is non-null; otherwise, returns null.
 *
 * @param param The value to return if the receiver is non-null.
 * @return The parameter value if the receiver is non-null, or null otherwise.
 */
infix fun <T> Any?.nullable(param: T): T? = if (this != null) param else null

/**
 * Executes a block of code if the receiver is non-null and returns its result; otherwise, returns null.
 *
 * @param block The lambda function to execute if the receiver is non-null.
 * @return The result of the block if the receiver is non-null, or null otherwise.
 */
@OptIn(ExperimentalContracts::class)
inline fun <T, R> T?.nullable(block: (T) -> R): R? {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }

    return if (this != null) {
        block(this)
    } else {
        null
    }
}

/**
 * Executes a block of code if the receiver is non-null and returns its result;
 * otherwise, returns the provided default value.
 *
 * @param default The value to return if the receiver is null.
 * @param block The lambda function to execute if the receiver is non-null.
 * @return The result of the block if the receiver is non-null, or the default value otherwise.
 */
@OptIn(ExperimentalContracts::class)
inline fun <T, R> T?.nullable(default: R, block: (T) -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }

    return if (this != null) {
        block(this)
    } else {
        default
    }
}


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
