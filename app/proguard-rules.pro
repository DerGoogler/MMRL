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

-keep class androidx.navigation.** { *; }
-keep class androidx.compose.navigation.** { *; }

-keep class com.topjohnwu.superuser.** { *; }
-dontwarn com.topjohnwu.superuser.**

-keep class androidx.compose.runtime.ComposablesKt {
    *;
}
-keepclassmembers class androidx.compose.runtime.ComposablesKt {
    public static androidx.compose.runtime.Composer getCurrentComposer(...);
}

#-repackageclasses com.dergoogler.mmrl