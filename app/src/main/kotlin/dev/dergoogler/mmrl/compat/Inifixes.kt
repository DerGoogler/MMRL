package dev.dergoogler.mmrl.compat


infix fun <T> Boolean?.then(param: T): T? = if (this != null && this == true) param else null

