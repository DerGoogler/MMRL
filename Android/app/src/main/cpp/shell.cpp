#include <sys/prctl.h>
#include <cstdint>
#include <cstring>
#include <cstdio>
#include <unistd.h>
#include <malloc.h>
#include <fcntl.h>
#include <jni.h>
#include <cstdlib>

bool path_detection(char **paths) {
    int len = sizeof(paths) / sizeof(paths[0]);

    bool bRet = false;
    for (int i = 0; i < len; i++) {
        if (open(paths[i], O_RDONLY) >= 0) {
            bRet = true;
            break;
        }
        if (0 == access(paths[i], R_OK)) {
            bRet = true;
            break;
        }
    }

    return bRet;
}

bool mount_detection(char **searchable_mounts) {
    int len = sizeof(searchable_mounts) / sizeof(searchable_mounts[0]);

    bool bRet = false;

    FILE *fp = fopen("/proc/self/mounts", "r");
    if (fp == nullptr) {
        return false;
    }

    fseek(fp, 0L, SEEK_END);
    long size = ftell(fp);
    /* For some reason size comes as zero */
    if (size == 0)
        size = 20000;  /*This will differ for different devices */
    char *buffer = (char *) calloc(size, sizeof(char));
    if (buffer == nullptr) {
        return false;
    }

    size_t read = fread(buffer, 1, size, fp);
    int count = 0;
    for (int i = 0; i < len; i++) {
        char *rem = strstr(buffer, searchable_mounts[i]);
        if (rem != nullptr) {
            count++;
            break;
        }
    }
    if (count > 0)
        bRet = true;

    exit:

    free(buffer);
    fclose(fp);

    return bRet;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_dergoogler_core_NativeShell_isMagiskSU(JNIEnv *env, jclass clazz) {
    static char *mounts[] = {
            "magisk",
            "core/mirror",
            "core/img"
    };
    static char *paths[] = {
            "/system/bin/magisk",
            "/data/adb/magisk.db",
            "/data/adb/magisk/busybox",
            "/data/adb/magisk/magisk64",
            "/data/adb/magisk/magiskboot",
            "/data/adb/magisk/magiskinit",
            "/data/adb/magisk/magiskpolicy"
    };

    bool bRet = false;
    do {
        bRet = path_detection(paths);
        if (bRet)
            break;
        bRet = mount_detection(mounts);
        if (bRet)
            break;
    } while (false);

    if (bRet) {
        return JNI_TRUE;
    } else {
        return JNI_FALSE;
    }
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_dergoogler_core_NativeShell_isKernelSU(JNIEnv *env, jclass clazz) {
    static char *mounts[] = {
            "KSU",
            "ksu",
            "KERNELSU",
            "kernelsu"
    };
    static char *paths[] = {
            // syslink
            "/data/adb/ksud",
            "/data/adb/ksu/modules.img",
            "/data/adb/ksu/bin/busybox",
            "/data/adb/ksu/bin/ksud",
            "/data/adb/ksu/bin/resetprop"
    };

    bool bRet = false;
    do {
        bRet = path_detection(paths);
        if (bRet)
            break;
        bRet = mount_detection(mounts);
        if (bRet)
            break;
    } while (false);

    if (bRet) {
        return JNI_TRUE;
    } else {
        return JNI_FALSE;
    }
}

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