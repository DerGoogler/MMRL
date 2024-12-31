package com.dergoogler.mmrl.ui.component

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

@Composable
fun Cover(
    modifier: Modifier = Modifier,
    url: String,
    shape: RoundedCornerShape = RoundedCornerShape(0.dp),
    aspectRatio: Float = 2.048f,
) {
    val context = LocalContext.current

    val painter = rememberAsyncImagePainter(
        model = ImageRequest.Builder(context).data(url).memoryCacheKey(url).diskCacheKey(url)
            .diskCachePolicy(CachePolicy.ENABLED).memoryCachePolicy(CachePolicy.ENABLED).build(),
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