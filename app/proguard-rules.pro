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