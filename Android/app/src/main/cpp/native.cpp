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
Java_com_dergoogler_components_ModuleView_pageContent(JNIEnv *env, jclass clazz,
                                                      jstring cssInject) {
    string doctype = R"(<!DOCTYPE html>)";
    string htmlStart = R"(<html>)";
    string headStart = R"(<head>)";
    string styleVendor = R"(<link rel="stylesheet" type="text/css" href="bundle/vendor.bundle.css"/>)";
    string styleApp = R"(<link rel="stylesheet" type="text/css" href="bundle/app.bundle.css"/>)";
    string meta = R"(<meta charset="utf-8" />)";
    string cssInject1 = R"(<style>)";
    string cssInject2 = jstring2string(env, cssInject);
    string cssInject3 = R"(</style>)";
    string cssInjectResult = cssInject1 + cssInject2 + cssInject3;
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