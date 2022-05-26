#include <jni.h>
#include <iostream>
#include <stdexcept>
#include <cstdio>
#include <string>
#include <sstream>
#include <stdexcept>
#include <istream>
#include <fstream>

using namespace std;

void addToStream(std::ostringstream &) {
}

template<typename T, typename... Args>
void addToStream(std::ostringstream &a_stream, T &&a_value, Args &&... a_args) {
    a_stream << std::forward<T>(a_value);
    addToStream(a_stream, std::forward<Args>(a_args)...);
}

template<typename... Args>
std::string concat(Args &&... a_args) {
    std::ostringstream s;
    addToStream(s, std::forward<Args>(a_args)...);
    return s.str();
}

std::string ConvertJString(JNIEnv *env, jstring str) {
    if (!str) std::string();
    const jsize len = env->GetStringUTFLength(str);
    const char *strChars = env->GetStringUTFChars(str, (jboolean *) 0);
    std::string Result(strChars, len);
    env->ReleaseStringUTFChars(str, strChars);
    return Result;
}

std::string cppExec(const char* cmd) {
    char buffer[128];
    std::string result;
    FILE* pipe = popen(cmd, "r");
    if (!pipe) throw std::runtime_error("popen() failed!");
    try {
        while (fgets(buffer, sizeof buffer, pipe) != nullptr) {
            result += buffer;
        }
    } catch (...) {
        pclose(pipe);
        throw;
    }
    pclose(pipe);
    return result;
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_test(JNIEnv *env, jclass clazz) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_indexFile(JNIEnv *env, jclass clazz) {
    std::string result = "file:///android_asset/index.html";
    return env->NewStringUTF(result.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_interfaceName(JNIEnv *env, jclass clazz) {
    std::string result = "android";
    return env->NewStringUTF(result.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_getStorageKey(JNIEnv *env, jclass clazz) {
    std::string result = "localstorage";
    return env->NewStringUTF(result.c_str());
}
extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_getUserAgent(JNIEnv *env, jclass clazz) {
    std::string result = "MMRL";
    return env->NewStringUTF(result.c_str());
}
