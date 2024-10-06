-verbose
-dontpreverify
-optimizationpasses 5
-dontskipnonpubliclibraryclasses
-dontobfuscate

-dontwarn org.conscrypt.**
-dontwarn kotlinx.serialization.**

# Keep DataStore fields
-keepclassmembers class * extends com.google.protobuf.GeneratedMessageLite* {
   <fields>;
}

-keep class androidx.compose.runtime.** { *; }
-keep class androidx.compose.ui.** { *; }
-keep class androidx.compose.foundation.** { *; }

#-repackageclasses com.dergoogler.mmrl