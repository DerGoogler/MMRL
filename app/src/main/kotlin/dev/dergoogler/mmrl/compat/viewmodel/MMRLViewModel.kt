package dev.dergoogler.mmrl.compat.viewmodel

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
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
}