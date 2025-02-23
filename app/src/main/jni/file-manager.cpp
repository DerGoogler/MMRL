#include <jni.h>
#include <sys/stat.h>
#include <unistd.h>

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_changeFileOwner(JNIEnv *env, jobject thiz,
                                                                     jstring path, jint owner,
                                                                     jint group) {
    const char *cpath = env->GetStringUTFChars(path, nullptr);
    bool success = (chown(cpath, owner, group) == 0);
    env->ReleaseStringUTFChars(path, cpath);
    return success ? JNI_TRUE : JNI_FALSE;
}
extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_changeFilePermissions(JNIEnv *env,
                                                                           jobject thiz,
                                                                           jstring path,
                                                                           jint mode) {
    const char *cpath = env->GetStringUTFChars(path, nullptr);
    bool success = (chmod(cpath, static_cast<mode_t>(mode)) == 0);
    env->ReleaseStringUTFChars(path, cpath);
    return success ? JNI_TRUE : JNI_FALSE;
}