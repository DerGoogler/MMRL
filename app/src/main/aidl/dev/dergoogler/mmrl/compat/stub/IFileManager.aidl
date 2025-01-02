package dev.dergoogler.mmrl.compat.stub;

import android.os.ParcelFileDescriptor;

interface IFileManager {
    boolean deleteOnExit(String path);
    void writeText(String path, String data);
    void writeBytes(String path, in byte[] data);
    String readText(String path);
    List readLines(String path);
    byte[] readBytes(String path);
    String readAsBase64(String path);
    List<String> list(String path);
    long stat(String path);
    long size(String path);
    long sizeRecursive(String path);
    long totalStat(String path);
    boolean delete(String path);
    boolean exists(String path);
    boolean isDirectory(String path);
    boolean isFile(String path);
    boolean isAccessRestricted(String path, boolean disable);
}