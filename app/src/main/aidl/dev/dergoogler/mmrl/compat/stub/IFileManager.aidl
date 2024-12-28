package dev.dergoogler.mmrl.compat.stub;

import android.os.ParcelFileDescriptor;

interface IFileManager {
    boolean deleteOnExit(String path);
    void write(String path, String data);
    String read(String path);
    String readAsBase64(String path);
    List<String> list(String path);
    long stat(String path);
    long size(String path);
    long totalStat(String path);
    boolean delete(String path);
    boolean exists(String path);
    boolean isDirectory(String path);
    boolean isFile(String path);
    boolean isAccessRestricted(String path, boolean disable);
}