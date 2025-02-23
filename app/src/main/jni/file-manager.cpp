#include <jni.h>
#include <sys/stat.h>
#include <jni.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <dirent.h>
#include <cstring>
#include <stack>
#include <cstdio>
#include <cerrno>
#include <string>
#include <fstream>
#include "logging.h"

#define MMRL_UNUSED(x) x __attribute__((__unused__))

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeSetOwner(JNIEnv *env, jobject MMRL_UNUSED(thiz),
                                                                     jstring path, jint owner,
                                                                     jint group) {
    const char *cpath = env->GetStringUTFChars(path, nullptr);
    bool success = (chown(cpath, owner, group) == 0);
    env->ReleaseStringUTFChars(path, cpath);
    return success ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeSetPermissions(JNIEnv *env,
                                                                           jobject MMRL_UNUSED(thiz),
                                                                           jstring path,
                                                                           jint mode) {
    const char *cpath = env->GetStringUTFChars(path, nullptr);
    bool success = (chmod(cpath, static_cast<mode_t>(mode)) == 0);
    env->ReleaseStringUTFChars(path, cpath);
    return success ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jobject JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeReadByteBuffer(JNIEnv *env, jobject MMRL_UNUSED(thiz),
                                                                    jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return nullptr;

    int fd = open(filePath, O_RDONLY);
    env->ReleaseStringUTFChars(path, filePath);

    if (fd < 0) {
        LOGI("Failed to open file");
        return nullptr;
    }

    off_t fileSize = lseek(fd, 0, SEEK_END);
    lseek(fd, 0, SEEK_SET);
    if (fileSize <= 0) {
        close(fd);
        return nullptr;
    }

    void* mappedFile = mmap(nullptr, fileSize, PROT_READ, MAP_PRIVATE | MAP_POPULATE, fd, 0);
    close(fd);

    if (mappedFile == MAP_FAILED) {
        return nullptr;
    }

    posix_madvise(mappedFile, fileSize, MADV_SEQUENTIAL | MADV_WILLNEED);

    return env->NewDirectByteBuffer(mappedFile, fileSize);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeWriteBytes(JNIEnv *env, jobject MMRL_UNUSED(thiz),
                                                                      jstring path, jbyteArray data) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    int fd = open(filePath, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    env->ReleaseStringUTFChars(path, filePath);

    if (fd < 0) {
        LOGI("Failed to open file for writing");
        return JNI_FALSE;
    }

    jsize length = env->GetArrayLength(data);
    jbyte *bytes = env->GetByteArrayElements(data, nullptr);

    if (write(fd, bytes, length) != length) {
        LOGI("Failed to write full data to file");
        env->ReleaseByteArrayElements(data, bytes, JNI_ABORT);
        close(fd);
        return JNI_FALSE;
    }

    env->ReleaseByteArrayElements(data, bytes, JNI_ABORT);
    close(fd);
    return JNI_TRUE;
}

extern "C"
JNIEXPORT jobject JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeList(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *dirPath = env->GetStringUTFChars(path, nullptr);
    if (!dirPath) return nullptr;

    DIR *dir = opendir(dirPath);
    env->ReleaseStringUTFChars(path, dirPath);

    if (!dir) return nullptr;

    jclass arrayListClass = env->FindClass("java/util/ArrayList");
    jmethodID arrayListInit = env->GetMethodID(arrayListClass, "<init>", "()V");
    jmethodID arrayListAdd = env->GetMethodID(arrayListClass, "add", "(Ljava/lang/Object;)Z");

    jobject fileList = env->NewObject(arrayListClass, arrayListInit);

    struct dirent *entry;
    while ((entry = readdir(dir)) != nullptr) {
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) continue;
        jstring fileName = env->NewStringUTF(entry->d_name);
        env->CallBooleanMethod(fileList, arrayListAdd, fileName);
        env->DeleteLocalRef(fileName);
    }

    closedir(dir);
    return fileList;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeSize(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return -1;

    struct stat fileStat{};
    jlong size = (stat(filePath, &fileStat) == 0) ? fileStat.st_size : -1;

    env->ReleaseStringUTFChars(path, filePath);
    return size;
}

static jlong getRecursiveSize(const char *rootPath) {
    struct stat fileStat{};
    if (stat(rootPath, &fileStat) != 0) return 0;

    if (S_ISREG(fileStat.st_mode)) return fileStat.st_size;
    if (!S_ISDIR(fileStat.st_mode)) return 0;

    jlong totalSize = 0;
    std::stack<std::string> dirStack;
    dirStack.emplace(rootPath);

    while (!dirStack.empty()) {
        std::string currentDir = dirStack.top();
        dirStack.pop();

        DIR *dir = opendir(currentDir.c_str());
        if (!dir) continue;

        struct dirent *entry;
        while ((entry = readdir(dir)) != nullptr) {
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) continue;

            std::string fullPath = currentDir + "/" + entry->d_name;

            if (stat(fullPath.c_str(), &fileStat) == 0) {
                if (S_ISREG(fileStat.st_mode)) {
                    totalSize += fileStat.st_size;
                } else if (S_ISDIR(fileStat.st_mode)) {
                    dirStack.push(fullPath);
                }
            }
        }

        closedir(dir);
    }

    return totalSize;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeSizeRecursive(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return -1;

    jlong size = getRecursiveSize(filePath);
    env->ReleaseStringUTFChars(path, filePath);
    return size;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeStat(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return -1;

    struct stat fileStat{};
    jlong lastModified = (stat(filePath, &fileStat) == 0) ? fileStat.st_mtime : -1;

    env->ReleaseStringUTFChars(path, filePath);
    return lastModified;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeExists(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    jboolean result = (access(filePath, F_OK) == 0) ? JNI_TRUE : JNI_FALSE;

    env->ReleaseStringUTFChars(path, filePath);
    return result;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeIsDirectory(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    struct stat fileStat{};
    jboolean result = (stat(filePath, &fileStat) == 0 && S_ISDIR(fileStat.st_mode)) ? JNI_TRUE : JNI_FALSE;

    env->ReleaseStringUTFChars(path, filePath);
    return result;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeIsFile(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    struct stat fileStat{};
    jboolean result = (stat(filePath, &fileStat) == 0 && S_ISREG(fileStat.st_mode)) ? JNI_TRUE : JNI_FALSE;

    env->ReleaseStringUTFChars(path, filePath);
    return result;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeMkdir(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *dirPath = env->GetStringUTFChars(path, nullptr);
    if (!dirPath) return JNI_FALSE;

    jboolean result = (mkdir(dirPath, 0755) == 0) ? JNI_TRUE : JNI_FALSE;

    env->ReleaseStringUTFChars(path, dirPath);
    return result;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeMkdirs(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *dirPath = env->GetStringUTFChars(path, nullptr);
    if (!dirPath) return JNI_FALSE;

    jboolean result = (mkdir(dirPath, 0755) == 0 || errno == EEXIST) ? JNI_TRUE : JNI_FALSE;

    env->ReleaseStringUTFChars(path, dirPath);
    return result;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeDelete(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;  // Null path provided

    struct stat pathStat{};
    if (stat(filePath, &pathStat) != 0) {
        env->ReleaseStringUTFChars(path, filePath);
        return JNI_FALSE;  // File or directory doesn't exist
    }

    if (S_ISREG(pathStat.st_mode) || S_ISLNK(pathStat.st_mode)) {
        // It's a regular file or symlink, delete it
        bool result = (unlink(filePath) == 0);
        env->ReleaseStringUTFChars(path, filePath);
        return result ? JNI_TRUE : JNI_FALSE;
    }

    if (!S_ISDIR(pathStat.st_mode)) {
        env->ReleaseStringUTFChars(path, filePath);
        return JNI_FALSE;
    }

    std::vector<std::string> dirStack;
    dirStack.emplace_back(filePath);

    while (!dirStack.empty()) {
        std::string currentDir = dirStack.back();
        dirStack.pop_back();

        DIR *dir = opendir(currentDir.c_str());
        if (!dir) continue;

        struct dirent *entry;
        std::vector<std::string> filesToDelete;

        while ((entry = readdir(dir)) != nullptr) {
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) continue;

            std::string fullPath = currentDir + "/" + entry->d_name;

            if (stat(fullPath.c_str(), &pathStat) == 0) {
                if (S_ISDIR(pathStat.st_mode)) {
                    dirStack.push_back(fullPath);  // Push subdir for later deletion
                } else {
                    filesToDelete.push_back(fullPath);  // Files are deleted after closing dir
                }
            }
        }

        closedir(dir);

        // Delete all files first before deleting directory
        for (const std::string &file : filesToDelete) {
            unlink(file.c_str());
        }

        // Finally, remove the directory itself
        rmdir(currentDir.c_str());
    }

    bool result = (rmdir(filePath) == 0);  // Remove the top-level directory
    env->ReleaseStringUTFChars(path, filePath);
    return result ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeCreateNewFile(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;  // Null path provided

    struct stat pathStat{};
    if (stat(filePath, &pathStat) == 0) {
        // File already exists
        env->ReleaseStringUTFChars(path, filePath);
        return JNI_FALSE;
    }

    // Create an empty file with read/write permissions for the owner
    int fd = open(filePath, O_CREAT | O_EXCL | O_WRONLY, S_IRUSR | S_IWUSR);
    if (fd == -1) {
        env->ReleaseStringUTFChars(path, filePath);
        return JNI_FALSE;  // Error creating the file
    }

    close(fd);
    env->ReleaseStringUTFChars(path, filePath);
    return JNI_TRUE;  // Successfully created the file
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeRenameTo(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring srcPath, jstring destPath) {
    const char *src = env->GetStringUTFChars(srcPath, nullptr);
    const char *dest = env->GetStringUTFChars(destPath, nullptr);

    if (!src || !dest) {
        env->ReleaseStringUTFChars(srcPath, src);
        env->ReleaseStringUTFChars(destPath, dest);
        return JNI_FALSE;
    }

    bool result = (rename(src, dest) == 0);

    env->ReleaseStringUTFChars(srcPath, src);
    env->ReleaseStringUTFChars(destPath, dest);
    return result ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeCopyTo(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring srcPath, jstring destPath, jboolean overwrite) {
    const char *src = env->GetStringUTFChars(srcPath, nullptr);
    const char *dest = env->GetStringUTFChars(destPath, nullptr);

    if (!src || !dest) {
        env->ReleaseStringUTFChars(srcPath, src);
        env->ReleaseStringUTFChars(destPath, dest);
        return JNI_FALSE;
    }

    std::ifstream srcFile(src, std::ios::binary);
    if (!srcFile.is_open()) {
        env->ReleaseStringUTFChars(srcPath, src);
        env->ReleaseStringUTFChars(destPath, dest);
        return JNI_FALSE;
    }

    std::ofstream destFile(dest, std::ios::binary | std::ios::trunc);
    if (!destFile.is_open()) {
        env->ReleaseStringUTFChars(srcPath, src);
        env->ReleaseStringUTFChars(destPath, dest);
        return JNI_FALSE;
    }

    destFile << srcFile.rdbuf();

    env->ReleaseStringUTFChars(srcPath, src);
    env->ReleaseStringUTFChars(destPath, dest);
    return JNI_TRUE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeCanExecute(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    struct stat fileStat{};
    bool result = (stat(filePath, &fileStat) == 0 && (fileStat.st_mode & S_IXUSR));

    env->ReleaseStringUTFChars(path, filePath);
    return result ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeCanWrite(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    struct stat fileStat{};
    bool result = (stat(filePath, &fileStat) == 0 && (fileStat.st_mode & S_IWUSR));

    env->ReleaseStringUTFChars(path, filePath);
    return result ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeCanRead(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    struct stat fileStat{};
    bool result = (stat(filePath, &fileStat) == 0 && (fileStat.st_mode & S_IRUSR));

    env->ReleaseStringUTFChars(path, filePath);
    return result ? JNI_TRUE : JNI_FALSE;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_dev_dergoogler_mmrl_compat_impl_FileManagerImpl_nativeIsHidden(JNIEnv *env, jobject MMRL_UNUSED(thiz), jstring path) {
    const char *filePath = env->GetStringUTFChars(path, nullptr);
    if (!filePath) return JNI_FALSE;

    bool result = (filePath[0] == '.');

    env->ReleaseStringUTFChars(path, filePath);
    return result ? JNI_TRUE : JNI_FALSE;
}

