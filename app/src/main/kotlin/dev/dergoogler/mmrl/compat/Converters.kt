package dev.dergoogler.mmrl.compat

import androidx.room.TypeConverter
import com.dergoogler.mmrl.model.online.Manager
import com.dergoogler.mmrl.model.online.RootManager
import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types

class Converters {

    private val moshi: Moshi = Moshi.Builder()
        .build()

    private val managerEntityAdapter: JsonAdapter<Manager> = moshi.adapter(Manager::class.java)
    private val rootManagerEntityAdapter: JsonAdapter<RootManager> = moshi.adapter(RootManager::class.java)

    private val stringListAdapter: JsonAdapter<List<String>> = moshi.adapter(
        Types.newParameterizedType(List::class.java, String::class.java)
    )

    @TypeConverter
    fun fromManager(entity: Manager?): String? {
        return entity?.let { managerEntityAdapter.toJson(it) }
    }

    @TypeConverter
    fun toManager(data: String?): Manager? {
        return data?.let { managerEntityAdapter.fromJson(it) }
    }

    @TypeConverter
    fun fromRootManager(entity: RootManager?): String? {
        return entity?.let { rootManagerEntityAdapter.toJson(it) }
    }

    @TypeConverter
    fun toRootManager(data: String?): RootManager? {
        return data?.let { rootManagerEntityAdapter.fromJson(it) }
    }

    @TypeConverter
    fun fromStringList(list: List<String>?): String? {
        return list?.let { stringListAdapter.toJson(it) }
    }

    @TypeConverter
    fun toStringList(data: String?): List<String>? {
        return data?.let { stringListAdapter.fromJson(it) }
    }
}
