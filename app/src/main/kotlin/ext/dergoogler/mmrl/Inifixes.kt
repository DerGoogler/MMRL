package ext.dergoogler.mmrl

infix fun <T> Boolean.then(param: T): T? = if (this) param else null