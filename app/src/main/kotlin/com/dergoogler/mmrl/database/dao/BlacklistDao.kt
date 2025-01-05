package com.dergoogler.mmrl.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.dergoogler.mmrl.database.entity.online.BlacklistEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface BlacklistDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(entry: BlacklistEntity)

    @Query("SELECT * FROM blacklist WHERE blId = :id")
    suspend fun getBlacklistEntry(id: String): BlacklistEntity?

    @Query("SELECT * FROM blacklist WHERE blId = :id")
    fun getBlacklistEntryAsFlow(id: String): Flow<BlacklistEntity?>

    @Query("SELECT * FROM blacklist")
    suspend fun getAllBlacklistEntries(): List<BlacklistEntity>

    @Query("SELECT * FROM blacklist")
    fun getAllBlacklistEntriesAsFlow(): Flow<List<BlacklistEntity>>

    @Query("DELETE FROM blacklist WHERE blId = :id")
    suspend fun deleteById(id: String)

    @Update
    suspend fun updateBlacklistEntry(entry: BlacklistEntity)
}
