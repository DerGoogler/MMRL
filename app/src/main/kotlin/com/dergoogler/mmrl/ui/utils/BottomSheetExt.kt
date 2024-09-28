package com.dergoogler.mmrl.ui.utils

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.ui.unit.Dp

@Suppress("UnusedReceiverParameter")
fun BottomSheetDefaults.expandedShape(size: Dp) =
    RoundedCornerShape(topStart = size, topEnd = size)