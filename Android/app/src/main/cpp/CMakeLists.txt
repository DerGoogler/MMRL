# Sets the minimum version of CMake required to build your native library.
# This ensures that a certain set of CMake features is available to
# your build.


cmake_minimum_required(VERSION 3.4.1)

# Specifies a library name, specifies whether the library is STATIC or
# SHARED, and provides relative paths to the source code. You can
# define multiple libraries by adding multiple add_library() commands,
# and CMake builds them for you. When you build your app, Gradle
# automatically packages shared libraries with your APK.

add_library(native-lib SHARED
            native.cpp)