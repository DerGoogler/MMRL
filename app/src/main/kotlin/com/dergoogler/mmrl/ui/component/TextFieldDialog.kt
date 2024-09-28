package com.dergoogler.mmrl.ui.component

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material3.AlertDialogDefaults
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ProvideTextStyle
import androidx.compose.material3.Surface
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.DialogProperties

@Composable
fun TextFieldDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    dismissButton: @Composable (() -> Unit)? = null,
    icon: @Composable (() -> Unit)? = null,
    title: @Composable (() -> Unit)? = null,
    shape: Shape = AlertDialogDefaults.shape,
    containerColor: Color = AlertDialogDefaults.containerColor,
    iconContentColor: Color = AlertDialogDefaults.iconContentColor,
    titleContentColor: Color = AlertDialogDefaults.titleContentColor,
    textContentColor: Color = AlertDialogDefaults.textContentColor,
    tonalElevation: Dp = AlertDialogDefaults.TonalElevation,
    properties: DialogProperties = DialogProperties(usePlatformDefaultWidth = false),
    launchKeyboard: Boolean = true,
    content: @Composable (FocusRequester) -> Unit
) = BasicAlertDialog(
    onDismissRequest = onDismissRequest,
    modifier = modifier.wrapContentHeight(),
    properties = properties
) {
    val focusRequester = remember { FocusRequester() }
    val keyboardController = LocalSoftwareKeyboardController.current

    LaunchedEffect(focusRequester) {
        if (launchKeyboard) {
            focusRequester.requestFocus()
            keyboardController?.show()
        }
    }

    Surface(
        modifier = modifier.requiredWidth(TextFieldDefaults.MinWidth + 40.dp),
        shape = shape,
        color = containerColor,
        tonalElevation = tonalElevation,
    ) {
        Column(
            modifier = Modifier.padding(DialogPadding)
        ) {
            icon?.let {
                CompositionLocalProvider(LocalContentColor provides iconContentColor) {
                    Box(
                        Modifier
                            .padding(IconPadding)
                            .align(Alignment.CenterHorizontally)
                    ) {
                        icon()
                    }
                }
            }
            title?.let {
                CompositionLocalProvider(LocalContentColor provides titleContentColor) {
                    val textStyle = MaterialTheme.typography.headlineSmall
                    ProvideTextStyle(textStyle) {
                        Box(
                            // Align the title to the center when an icon is present.
                            Modifier
                                .padding(TitlePadding)
                                .align(
                                    if (icon == null) {
                                        Alignment.Start
                                    } else {
                                        Alignment.CenterHorizontally
                                    }
                                )
                        ) {
                            title()
                        }
                    }
                }
            }
            CompositionLocalProvider(LocalContentColor provides textContentColor) {
                val textStyle = MaterialTheme.typography.bodyMedium
                ProvideTextStyle(textStyle) {
                    Box(
                        Modifier
                            .weight(weight = 1f, fill = false)
                            .padding(TextPadding)
                            .align(Alignment.Start)
                    ) {
                        content(focusRequester)
                    }
                }
            }

            Box(modifier = Modifier.align(Alignment.End)) {
                CompositionLocalProvider(
                    LocalContentColor provides MaterialTheme.colorScheme.primary
                ) {
                    val textStyle = MaterialTheme.typography.labelLarge
                    ProvideTextStyle(value = textStyle) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(ButtonsMainAxisSpacing)
                        ) {
                            Spacer(modifier = Modifier.weight(1f))

                            dismissButton?.invoke()
                            confirmButton()
                        }
                    }
                }
            }
        }
    }
}

private val DialogPadding = PaddingValues(all = 24.dp)
private val IconPadding = PaddingValues(bottom = 16.dp)
private val TitlePadding = PaddingValues(bottom = 16.dp)
private val TextPadding = PaddingValues(bottom = 24.dp)

private val ButtonsMainAxisSpacing = 8.dp