#include <jni.h>
#include <cstring>
#include <sys/system_properties.h>
//#include <cutils/properties.h>

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_core_NativeProperties_get(JNIEnv *env, jclass clazz, jstring key,
                                                      jstring def) {
    const char *myKey = env->GetStringUTFChars(key, 0);
    const char *myDef = env->GetStringUTFChars(def, 0);

    char value[PROP_VALUE_MAX] = {0};

    int iReturn = __system_property_get(myKey, value);
    if (!iReturn) strcpy(value, myDef);

    return env->NewStringUTF(value);
}

extern "C"
JNIEXPORT int JNICALL
Java_com_dergoogler_core_NativeProperties_set(JNIEnv *env, jclass clazz, jstring key,
                                              jstring value) {
    const char *myKey = env->GetStringUTFChars(key, 0);
    const char *myValue = env->GetStringUTFChars(value, 0);

    int rc = __system_property_set(myKey, myValue);
    if (rc == -1) {
        return 0;
    }

    return 1;
}