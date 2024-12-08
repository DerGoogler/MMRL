package dev.dergoogler.mmrl.compat.ext

import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

inline fun <reified T> List<List<T>>.merge(): List<T> {
    val values = mutableListOf<T>()
    forEach { values.addAll(it) }
    return values
}

@OptIn(ExperimentalContracts::class)
inline fun <T, R> List<T>?.ifNotEmpty(block: (List<T>) -> R): R? {
    contract {
        returns(true) implies (this@ifNotEmpty != null)
    }

    return this?.takeIf { it.isNotEmpty() }?.let(block)
}

@OptIn(ExperimentalContracts::class)
fun <T> List<T>?.isNotNullOrEmpty(): Boolean {
    contract {
        returns(true) implies (this@isNotNullOrEmpty != null)
    }

    return !this.isNullOrEmpty()
}

