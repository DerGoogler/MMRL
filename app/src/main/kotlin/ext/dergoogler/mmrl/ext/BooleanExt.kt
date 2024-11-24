package ext.dergoogler.mmrl.ext

inline fun Boolean?.takeTrue(block: () -> Unit) {
    if (this == true) {
        block()
    }
}

inline fun Boolean?.takeFalse(block: () -> Unit) {
    if (this == false) {
        block()
    }
}