-verbose
-dontpreverify
-optimizationpasses 5
-dontskipnonpubliclibraryclasses

-dontwarn org.conscrypt.**
-dontwarn kotlinx.serialization.**

# Keep DataStore fields
-keepclassmembers class * extends com.google.protobuf.GeneratedMessageLite* {
   <fields>;
}

-repackageclasses com.dergoogler.mmrl