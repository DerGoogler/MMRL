package com.dergoogler.mmrl.ui.component

import android.graphics.drawable.AnimatedVectorDrawable
import android.os.Build
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import com.dergoogler.mmrl.BuildConfig
import com.dergoogler.mmrl.R
import com.dergoogler.mmrl.app.Event
import java.time.LocalDate
import java.time.temporal.ChronoUnit


@Composable
fun TopAppBarTitle(
    text: String,
    modifier: Modifier = Modifier
) = Row(
    modifier = modifier,
    horizontalArrangement = Arrangement.Start,
    verticalAlignment = Alignment.CenterVertically
) {
    Text(
        text = text,
        style = MaterialTheme.typography.titleLarge,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
        color = LocalContentColor.current
    )

    if (BuildConfig.IS_DEV_VERSION) {
        Spacer(modifier = Modifier.width(10.dp))
        Icon(
            painter = painterResource(id = R.drawable.ci_label),
            contentDescription = null,
            tint = LocalContentColor.current
        )
    }

    EventIcon()
}


@Composable
fun EventIcon() {
    val events = when {
        Event.isHalloween -> Triple(
            R.drawable.pumpkin_scary,
            stringResource(R.string.events_halloween),
            null
        )

        Event.isChristmas -> Triple(
            R.drawable.christmas_tree,
            stringResource(R.string.events_christmas),
            null
        )

        Event.isMMRLBirthday -> {
            val initialRelease = LocalDate.of(2022, 4, 25)
            val currentDate = LocalDate.now()
            val yearsCount = ChronoUnit.YEARS.between(initialRelease, currentDate)
            Triple(
                R.drawable.gift, stringResource(R.string.events_birthday, yearsCount),
                null
            )
        }

        Event.isNewYearsEve -> Triple(
            R.drawable.sparkles,
            stringResource(R.string.events_new_years_eve),
            MaterialTheme.colorScheme.surfaceTint
        )

        Event.isSomeRandomDates -> Triple(
            R.drawable.balloon,
            null,
            Color(0xFFB90000)
        )

        else -> Triple(null, null, null)
    }

    if (events.first == null) return

    val color = if (events.third == null) {
        MaterialTheme.colorScheme.surfaceTint
    } else {
        events.third!!
    }

    Icon(
        painter = painterResource(id = events.first!!),
        tint = color,
        contentDescription = null,
    )

    Spacer(modifier = Modifier.width(5.dp))

    events.second?.let {
        Text(
            text = it,
            style = MaterialTheme.typography.titleSmall,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            color = color
        )
    }
}