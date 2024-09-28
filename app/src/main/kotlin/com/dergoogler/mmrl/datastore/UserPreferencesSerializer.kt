package com.dergoogler.mmrl.datastore

import androidx.datastore.core.CorruptionException
import androidx.datastore.core.Serializer
import com.google.protobuf.InvalidProtocolBufferException
import java.io.InputStream
import java.io.OutputStream
import javax.inject.Inject

class UserPreferencesSerializer @Inject constructor() : Serializer<UserPreferencesCompat> {
    override val defaultValue = UserPreferencesCompat.default()

    override suspend fun readFrom(input: InputStream) =
        try {
            UserPreferences.parseFrom(input).let(::UserPreferencesCompat)
        } catch (e: InvalidProtocolBufferException) {
            throw CorruptionException("cannot read proto", e)
        }

    override suspend fun writeTo(t: UserPreferencesCompat, output: OutputStream) {
        t.toProto().writeTo(output)
    }
}