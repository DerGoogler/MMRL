package ext.dergoogler.mmrl.ext

inline fun <reified T> List<List<T>>.merge(): List<T> {
    val values = mutableListOf<T>()
    forEach { values.addAll(it) }
    return values
}

inline fun <T, R> List<T>.ifNotEmpty(block: (List<T>) -> R): R? {
    return if (this.isNotEmpty()) block(this) else null
}
