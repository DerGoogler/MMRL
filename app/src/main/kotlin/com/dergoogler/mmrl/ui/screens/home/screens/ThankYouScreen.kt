package com.dergoogler.mmrl.ui.screens.home.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.ui.component.HorizontalDividerWithText
import com.dergoogler.mmrl.ui.component.NavigateUpTopBar
import com.dergoogler.mmrl.ui.component.NonLazyGrid
import com.dergoogler.mmrl.ui.providable.LocalNavController
import com.dergoogler.mmrl.ui.screens.repositories.screens.exploreRepositories.items.MemberCard
import com.dergoogler.mmrl.ui.utils.none
import com.dergoogler.mmrl.viewmodel.ThankYouViewModel
import dev.dergoogler.mmrl.compat.ext.isNotNullOrEmpty
import dev.dergoogler.mmrl.compat.ext.toDollars

@Composable
fun ThankYouScreen(
    vm: ThankYouViewModel = hiltViewModel(),
) {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()
    val navController = LocalNavController.current

    val sponsors by vm.sponsors.collectAsStateWithLifecycle()
    val contributors by vm.contributors.collectAsStateWithLifecycle()

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            NavigateUpTopBar(
                title = stringResource(id = R.string.thank_you),
                scrollBehavior = scrollBehavior,
                navController = navController
            )
        },
        contentWindowInsets = WindowInsets.none
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {

            if (sponsors.isNotNullOrEmpty()) {
                HorizontalDividerWithText(
                    text = stringResource(
                        R.string.sponsors
                    ),
                    thickness = 0.9.dp
                )

                Text(
                    text = stringResource(
                        R.string.have_been_total_sponsored,
                        vm.totalSponsorAmount.toDollars()
                    ),
                    style = MaterialTheme.typography.titleSmall.copy(
                        color = MaterialTheme.colorScheme.outline
                    )
                )

                NonLazyGrid(
                    columns = 2,
                    itemCount = sponsors.size,
                    itemPaddingValues = PaddingValues(16.dp)
                ) {
                    MemberCard(member = sponsors[it])
                }
            }

            if (contributors.isNotNullOrEmpty()) {
                HorizontalDividerWithText(
                    text = stringResource(
                        R.string.contributors
                    ),
                    thickness = 0.9.dp
                )

                Text(
                    text = stringResource(
                        R.string.total_community_contributions,
                        vm.totalContributionsCount
                    ),
                    style = MaterialTheme.typography.titleSmall.copy(
                        color = MaterialTheme.colorScheme.outline
                    )
                )

                NonLazyGrid(
                    columns = 2,
                    itemCount = contributors.size,
                    itemPaddingValues = PaddingValues(16.dp)
                ) {
                    MemberCard(member = contributors[it])
                }
            }

        }


    }


}