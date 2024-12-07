package ext.dergoogler.mmrl

import android.content.Context
import android.widget.Toast
import androidx.compose.ui.platform.UriHandler
import ext.dergoogler.mmrl.ext.launchCustomTab
import timber.log.Timber

class MMRLUriHandler(private val context: Context) : UriHandler {
    override fun openUri(uri: String) {
        context.launchCustomTab(
            url = uri,
            onError = {
                Timber.e(it, "Unable to open $uri")
                Toast.makeText(context, "Unable to open $uri", Toast.LENGTH_SHORT).show()
            }
        )
    }
}
