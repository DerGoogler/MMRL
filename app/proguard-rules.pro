-verbose
-optimizationpasses 5
-dontpreverify
-dontskipnonpubliclibraryclasses
-dontobfuscate

-dontwarn org.conscrypt.**
-dontwarn kotlinx.serialization.**

# Keep DataStore fields
-keepclassmembers class * extends com.google.protobuf.GeneratedMessageLite* {
   <fields>;
}