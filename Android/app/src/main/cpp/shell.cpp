#include <sys/prctl.h>
#include <cstdint>
#include <cstring>
#include <cstdio>
#include <unistd.h>
#include <malloc.h>
#include <fcntl.h>
#include <jni.h>
#include <cstdlib>
#include <sys/types.h>
#include <pwd.h>

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_core_NativeShell_getenv(JNIEnv *env, jclass clazz, jstring key) {
    const char *name = env->GetStringUTFChars(key, nullptr);
    return env->NewStringUTF(getenv(name));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_dergoogler_core_NativeShell_setenv(JNIEnv *env, jclass clazz, jstring key, jstring value,
                                            jint override) {
    const char *_key = env->GetStringUTFChars(key, nullptr);
    const char *_value = env->GetStringUTFChars(value, nullptr);
    setenv(_key,_value,(int)override);
}

extern "C"
JNIEXPORT jint JNICALL
Java_com_dergoogler_core_NativeShell_pw_1uid(JNIEnv *env, jclass clazz) {
    struct passwd *p;
    if ((p = getpwuid(geteuid())) == nullptr)
        return -1;
    else {
        return (jint) p->pw_uid;
    }
}

extern "C"
JNIEXPORT jint JNICALL
Java_com_dergoogler_core_NativeShell_pw_1gid(JNIEnv *env, jclass clazz) {
    struct passwd *p;
    if ((p = getpwuid(geteuid())) == nullptr)
        return -1;
    else {
        return (jint) p->pw_gid;
    }
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_core_NativeShell_pw_1name(JNIEnv *env, jclass clazz) {
    struct passwd *p;
    if ((p = getpwuid(geteuid())) == nullptr)
        return env->NewStringUTF("null");
    else {
        return env->NewStringUTF(p->pw_name);
    }
}

