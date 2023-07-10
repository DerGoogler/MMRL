#include <jni.h>
#include <android/log.h>


extern "C"
JNIEXPORT void JNICALL
Java_com_dergoogler_core_NativeLog_native_1log(JNIEnv *env, jclass clazz, jint prio, jstring tag,
                                               jstring msg) {
//    unsigned int myPrio = (unsigned int)prio;

    const char *myTag = env->GetStringUTFChars(tag, 0);
    const char *myMsg = env->GetStringUTFChars(msg, 0);
    __android_log_write(prio, myTag, myMsg);
}