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
string concat(Args &&... a_args) {
    std::ostringstream s;
    addToStream(s, std::forward<Args>(a_args)...);
    return s.str();
}

string ConvertJString(JNIEnv *env, jstring str) {
    if (!str) std::string();
    const jsize len = env->GetStringUTFLength(str);
    const char *strChars = env->GetStringUTFChars(str, (jboolean *) 0);
    std::string Result(strChars, len);
    env->ReleaseStringUTFChars(str, strChars);
    return Result;
}

string jstring2string(JNIEnv *env, jstring jStr) {
    if (!jStr)
        return "";

    const jclass stringClass = env->GetObjectClass(jStr);
    const jmethodID getBytes = env->GetMethodID(stringClass, "getBytes", "(Ljava/lang/String;)[B");
    const auto stringJbytes = (jbyteArray) env->CallObjectMethod(jStr, getBytes,
                                                                 env->NewStringUTF("UTF-8"));

    auto length = (size_t) env->GetArrayLength(stringJbytes);
    jbyte *pBytes = env->GetByteArrayElements(stringJbytes, nullptr);

    std::string ret = std::string((char *) pBytes, length);
    env->ReleaseByteArrayElements(stringJbytes, pBytes, JNI_ABORT);

    env->DeleteLocalRef(stringJbytes);
    env->DeleteLocalRef(stringClass);
    return ret;
}

string cppExec(const char *cmd) {
    char buffer[128];
    std::string result;
    FILE *pipe = popen(cmd, "r");
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
    string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_baseUrl(JNIEnv *env, jclass clazz) {
    string result = "file:///android_asset/";
    return env->NewStringUTF(result.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_interfaceName(JNIEnv *env, jclass clazz) {
    string result = "android";
    return env->NewStringUTF(result.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_getStorageKey(JNIEnv *env, jclass clazz) {
    string result = "localstorage";
    return env->NewStringUTF(result.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_getUserAgent(JNIEnv *env, jclass clazz) {
    string result = "MMRL";
    return env->NewStringUTF(result.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_mmrl_Lib_pageContent(JNIEnv *env, jclass clazz, jstring cssInject) {
    string doctype = R"(<!DOCTYPE html>)";
    string htmlStart = R"(<html>)";
    string headStart = R"(<head>)";
    string styleVendor = R"(<link rel="stylesheet" type="text/css" href="bundle/vendor.bundle.css"/>)";
    string styleApp = R"(<link rel="stylesheet" type="text/css" href="bundle/app.bundle.css"/>)";
    string meta = R"(<meta charset="utf-8" />)";
    string cssInject1 = R"(<script>)";
    string cssInject2 = R"(var parent = document.getElementsByTagName('head').item(0);)";
    string cssInject3 = R"(var style = document.createElement('style');)";
    string cssInject4 = R"(style.type = 'text/css';)";
    string cssInject5 = "style.innerHTML = window.atob('" + jstring2string(env, cssInject) + "');";
    string cssInject6 = R"(parent.appendChild(style))";
    string cssInject7 = R"(</script>)";
    string cssInjectResult =
            cssInject1 + cssInject2 + cssInject3 + cssInject4 + cssInject5 + cssInject6 +
            cssInject7;
    string headEnd = R"(</head>)";
    string bodyStart = R"(<body>)";
    string app = R"(<app></app>)";
    string scriptVendor = R"(<script src="bundle/vendor.bundle.js"></script>)";
    string scriptApp = R"(<script src="bundle/app.bundle.js"></script>)";
    string bodyEnd = R"(</body>)";
    string htmlEnd = R"(</html>)";
    string result = doctype + htmlStart + headStart + styleVendor +
                    styleApp + cssInjectResult + meta + headEnd +
                    bodyStart + app + scriptVendor +
                    scriptApp + bodyEnd + htmlEnd;
    return env->NewStringUTF(result.c_str());
}