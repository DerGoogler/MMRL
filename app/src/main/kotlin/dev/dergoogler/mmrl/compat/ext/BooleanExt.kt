package dev.dergoogler.mmrl.compat.ext

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