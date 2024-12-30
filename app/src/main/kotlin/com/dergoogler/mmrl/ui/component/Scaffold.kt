package com.dergoogler.mmrl.ui.component

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.utils.none

@Composable
fun SettingsScaffold(
    modifier: ScaffoldModifier = ScaffoldDefaults.settingsScaffoldScrollModifier,
    @StringRes title: Int,
    actions: @Composable (RowScope.() -> Unit) = {},
    floatingActionButton: @Composable () -> Unit = {},
    absolute: @Composable (BoxScope.() -> Unit) = {},
    relative: @Composable (ColumnScope.() -> Unit),
) {
    val navController = LocalNavController.current
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            NavigateUpTopBar(
                title = stringResource(id = title),
                scrollBehavior = scrollBehavior,
                navController = navController,
                actions = actions
            )
        },
        floatingActionButton = floatingActionButton,
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .padding(innerPadding)
                .then(modifier.box)
        ) {
            Column(
                modifier = modifier.column,
            ) {
                relative()
            }

            absolute()
        }
    }
}

@Immutable
class ScaffoldModifier internal constructor(
    val box: Modifier,
    val column: Modifier,
) {
    @Suppress("RedundantIf")
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || other !is ScaffoldModifier) return false

        if (box != other.box) return false
        if (column != other.column) return false

        return true
    }

    fun copy(
        box: Modifier = this.box,
        column: Modifier = this.column,
    ): ScaffoldModifier = ScaffoldModifier(
        box, column
    )

    override fun hashCode(): Int {
        var result = box.hashCode()
        result = 31 * result + column.hashCode()
        return result
    }
}

object ScaffoldDefaults {
    val settingsScaffoldModifier
        get() = ScaffoldModifier(
            box = Modifier.fillMaxSize(),
            column = Modifier.fillMaxSize()
        )

    val settingsScaffoldScrollModifier
        @Composable get() = ScaffoldModifier(
            box = Modifier.fillMaxSize(),
            column = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
        )
}