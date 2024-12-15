package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dergoogler.mmrl.R

@Composable
fun AntiFeaturesItem(
    antifeatures: List<String>,
    contentPaddingValues: PaddingValues = PaddingValues(vertical = 16.dp, horizontal = 25.dp),
    itemTextStyle: ListItemTextStyle = ListItemDefaults.itemStyle(),
) = antifeatures.forEach {
    val result = getAntifeatureDetails(it)
    result?.let {
        val (nameResId, descResId) = result
        ListItem(
            itemTextStyle = itemTextStyle,
            contentPaddingValues = contentPaddingValues,
            title = stringResource(id = nameResId),
            desc = stringResource(id = descResId)
        )
    }
}


private fun getAntifeatureDetails(id: String?): Pair<Int, Int>? {
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
        "unaskedremoval" to (R.string.unaskedremoval_name to R.string.unaskedremoval_desc),
        "llm" to (R.string.llm_name to R.string.llm_desc),
    )

    return id?.lowercase()?.let { antifeatureMap[it] }
}