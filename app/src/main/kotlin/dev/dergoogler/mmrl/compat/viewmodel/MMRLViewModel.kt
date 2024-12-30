package dev.dergoogler.mmrl.compat.viewmodel

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import com.dergoogler.mmrl.model.local.LocalModule
import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import javax.inject.Inject


open class MMRLViewModel @Inject constructor(
    application: Application,
    val localRepository: LocalRepository,
    val modulesRepository: ModulesRepository,
    val userPreferencesRepository: UserPreferencesRepository
) : AndroidViewModel(application) {
    val context
        get(): Context {
            return getApplication<Application>().applicationContext
        }

    override fun onCleared() {
        super.onCleared()
    }

    internal suspend fun getBlacklistById(id: String?): Blacklist? {
        if (id == null) {
            return null
        }

        return localRepository.getBlacklistByIdOrNullAsFlow(id).map { it }.first()
    }

    internal suspend fun localModule(id: String?): LocalModule? {
        if (id == null) {
            return null
        }

        return localRepository.getLocalByIdOrNullAsFlow(id).map { it }.first()
    }
}