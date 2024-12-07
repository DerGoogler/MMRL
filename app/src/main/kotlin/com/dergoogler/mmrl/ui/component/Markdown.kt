package com.dergoogler.mmrl.ui.component

import android.content.Context
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextDecoration
import coil.compose.AsyncImagePainter
import coil.compose.rememberAsyncImagePainter
import coil.request.CachePolicy
import coil.request.ImageRequest
import com.mikepenz.markdown.compose.Markdown
import com.mikepenz.markdown.model.DefaultMarkdownColors
import com.mikepenz.markdown.model.DefaultMarkdownTypography
import com.mikepenz.markdown.model.ImageData
import com.mikepenz.markdown.model.ImageTransformer
import com.mikepenz.markdown.model.markdownAnnotator
import com.mikepenz.markdown.utils.EntityConverter
import org.intellij.markdown.MarkdownElementTypes
import org.intellij.markdown.ast.ASTNode
import org.intellij.markdown.ast.getTextInNode
import org.intellij.markdown.flavours.gfm.GFMFlavourDescriptor
import org.intellij.markdown.flavours.gfm.GFMTokenTypes


class MarkdownImageTransformerImpl(private val context: Context) : ImageTransformer {

    @Composable
    override fun transform(link: String): ImageData {


        return rememberAsyncImagePainter(
            model = ImageRequest.Builder(context)
                .data(link)
                .memoryCacheKey(link)
                .diskCacheKey(link)
                .diskCachePolicy(CachePolicy.ENABLED)
                .memoryCachePolicy(CachePolicy.ENABLED)
                .build()
        ).let { ImageData(it) }
    }

    @Composable
    override fun intrinsicSize(painter: Painter): Size {
        var size by remember(painter) { mutableStateOf(painter.intrinsicSize) }
        if (painter is AsyncImagePainter) {
            val painterState = painter.state
            val intrinsicSize = painterState.painter?.intrinsicSize
            intrinsicSize?.also { size = it }
        }
        return size
    }
}


@Composable
fun MarkdownText(
    text: String,
    modifier: Modifier = Modifier,
    style: TextStyle = LocalTextStyle.current,
) = Markdown(
    modifier = modifier,
    content = text,
    imageTransformer = MarkdownImageTransformerImpl(LocalContext.current),
    colors = DefaultMarkdownColors(
        text = MaterialTheme.colorScheme.onBackground,
        codeText = MaterialTheme.colorScheme.onBackground,
        inlineCodeText = MaterialTheme.colorScheme.onBackground,
        linkText = MaterialTheme.colorScheme.primary,
        codeBackground = MaterialTheme.colorScheme.background,
        inlineCodeBackground = MaterialTheme.colorScheme.background,
        dividerColor = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.12f)
    ),
    flavour = GFMFlavourDescriptor(
        useSafeLinks = true,
        absolutizeAnchorLinks = true
    ),
    annotator = markdownAnnotator { content, child ->
        fun ASTNode.getUnescapedTextInNode(allFileText: CharSequence): String {
            val escapedText = getTextInNode(allFileText).toString()
            return EntityConverter.replaceEntities(
                escapedText,
                processEntities = false,
                processEscapes = true
            )
        }

        when (child.type) {
            MarkdownElementTypes.AUTOLINK -> {
                append(child.getUnescapedTextInNode(content))
                true
            }

            GFMTokenTypes.GFM_AUTOLINK -> {
                append(child.getUnescapedTextInNode(content))
                true
            }

            else -> false
        }
    },
    typography = DefaultMarkdownTypography(
        h1 = MaterialTheme.typography.headlineLarge,
        h2 = MaterialTheme.typography.headlineMedium,
        h3 = MaterialTheme.typography.headlineSmall,
        h4 = MaterialTheme.typography.titleLarge,
        h5 = MaterialTheme.typography.titleMedium,
        h6 = MaterialTheme.typography.titleSmall,
        text = style,
        code = style.copy(
            background = MaterialTheme.colorScheme.surfaceContainer,
        ),
        inlineCode = style,
        quote = style,
        paragraph = style,
        ordered = style,
        bullet = style,
        list = style,
        link = style.copy(
            color = MaterialTheme.colorScheme.primary,
            textDecoration = TextDecoration.Underline
        )
    )
)
