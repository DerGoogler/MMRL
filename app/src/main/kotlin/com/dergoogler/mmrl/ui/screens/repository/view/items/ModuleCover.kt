package com.dergoogler.mmrl.ui.screens.repository.view.items

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImagePainter
import coil.compose.rememberAsyncImagePainter
import coil.request.CachePolicy
import coil.request.ImageRequest
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.model.online.OnlineModule
import com.dergoogler.mmrl.ui.component.Logo
import com.dergoogler.mmrl.ui.providable.LocalUserPreferences
import dev.dergoogler.mmrl.compat.ext.nullable

@Composable
fun ModuleCover(
    modifier: Modifier = Modifier,
    module: OnlineModule,
    shape: RoundedCornerShape = RoundedCornerShape(0.dp),
    aspectRatio: Float = 2.048f,
) {
    val context = LocalContext.current
    val userPreferences = LocalUserPreferences.current
    val menu = userPreferences.repositoryMenu

    module.cover.nullable(menu.showCover) {
        if (it.isNotEmpty()) {
            val painter = rememberAsyncImagePainter(
                model = ImageRequest.Builder(context).data(it).memoryCacheKey(it)
                    .diskCacheKey(it).diskCachePolicy(CachePolicy.ENABLED)
                    .memoryCachePolicy(CachePolicy.ENABLED).build(),
            )

            if (painter.state !is AsyncImagePainter.State.Error) {
                Image(
                    painter = painter,
                    contentDescription = null,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(shape)
                        .aspectRatio(aspectRatio)
                        .then(modifier)
                )
            } else {
                Logo(
                    icon = R.drawable.alert_triangle,
                    shape = shape,
                    modifier = Modifier
                        .fillMaxWidth()
                        .aspectRatio(2.048f)
                        .then(modifier)
                )
            }
        }
    }
}

