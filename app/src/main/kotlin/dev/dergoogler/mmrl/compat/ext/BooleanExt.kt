package dev.dergoogler.mmrl.compat.ext

import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

inline fun Boolean?.takeTrue(block: (Boolean) -> Unit) {
    if (this == true) {
        block(this)
    }
}

inline fun Boolean?.takeFalse(block: (Boolean) -> Unit) {
    if (this == false) {
        block(this)
    }
}

@OptIn(ExperimentalContracts::class)
fun Boolean?.isNullOrFalse(): Boolean {
    contract {
        returns(true) implies (this@isNullOrFalse == null)
    }

    return this == null || this == false

}

fun Boolean?.isNotNullOrFalse() = !isNullOrFalse()