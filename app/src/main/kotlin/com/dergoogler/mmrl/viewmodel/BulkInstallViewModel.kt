package com.dergoogler.mmrl.viewmodel

import android.app.Application
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.local.BulkModule
import com.dergoogler.mmrl.repository.LocalRepository
import com.dergoogler.mmrl.repository.ModulesRepository
import com.dergoogler.mmrl.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import ext.dergoogler.mmrl.viewmodel.MMRLViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class BulkInstallViewModel @Inject constructor(
    application: Application,
    localRepository: LocalRepository,
    modulesRepository: ModulesRepository,
    userPreferencesRepository: UserPreferencesRepository,
) : MMRLViewModel(application, localRepository, modulesRepository, userPreferencesRepository) {
    private val bulkModulesFlow = MutableStateFlow(listOf<BulkModule>())
    val bulkModules get() = bulkModulesFlow.asStateFlow()

    fun addBulkModule(
        module: BulkModule,
        onSuccess: () -> Unit,
        onFailure: (error: String) -> Unit,
    ) {
        val currentModules = bulkModulesFlow.value
        if (currentModules.contains(module)) {
            onFailure(context.getString(R.string.bulk_install_module_already_added))
        } else {
            bulkModulesFlow.value = currentModules + module
            onSuccess()
        }
    }

    fun removeBulkModule(module: BulkModule) {
        bulkModulesFlow.value -= module
    }
}