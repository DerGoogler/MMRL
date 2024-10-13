package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R

@Composable
fun AntiFeaturesItem(
    antifeatures: List<String>,
) = Column(
    modifier = Modifier
        .padding(all = 16.dp)
        .fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Text(
        text = stringResource(id = R.string.view_module_antifeatures),
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary
    )

    antifeatures.forEach { antifeature ->
        val result = getAntifeatureDetails(antifeature)
        result?.let {
            val (nameResId, descResId) = result
            ValueItem(key = stringResource(id = nameResId), value = stringResource(id = descResId))
        }
    }
}

@Composable
private fun ValueItem(
    key: String,
    value: String?,
    modifier: Modifier = Modifier
) {
    if (value.isNullOrBlank()) return

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Text(
            text = key,
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.outline
        )
    }
}

private fun getAntifeatureDetails(id: String?): Pair<Int, Int>? {
    // A map to store the resource IDs for names and descriptions
    val antifeatureMap = mapOf(
        "ads" to (R.string.ads_name to R.string.ads_desc),
        "knownvuln" to (R.string.knownvuln_name to R.string.knownvuln_desc),
        "nsfw" to (R.string.nsfw_name to R.string.nsfw_desc),
        "nosourcesince" to (R.string.nosourcesince_name to R.string.nosourcesince_desc),
        "nonfreeadd" to (R.string.nonfreeadd_name to R.string.nonfreeadd_desc),
        "nonfreeassets" to (R.string.nonfreeassets_name to R.string.nonfreeassets_desc),
        "nonfreedep" to (R.string.nonfreedep_name to R.string.nonfreedep_desc),
        "nonfreenet" to (R.string.nonfreenet_name to R.string.nonfreenet_desc),
        "tracking" to (R.string.tracking_name to R.string.tracking_desc),
        "upstreamnonfree" to (R.string.upstreamnonfree_name to R.string.upstreamnonfree_desc),
        "obfuscation" to (R.string.obfuscation_name to R.string.obfuscation_desc),
        "unaskedremoval" to (R.string.unaskedremoval_name to R.string.unaskedremoval_desc)
    )

    // Check if ID is not null and if it exists in the map
    return id?.lowercase()?.let { antifeatureMap[it] }
}