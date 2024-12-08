package dev.dergoogler.mmrl.compat

infix fun <T> Boolean.then(param: T): T? = if (this) param else null