package com.dergoogler.core;

import android.util.Log;
import android.webkit.JavascriptInterface;

import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.spi.FileSystemProvider;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class NativeZipFS {
    private final String TAG = "NativeZipFS";

    public NativeZipFS() {}

    private String parseSlashes(String path) {
        if (!path.endsWith("/")) {
            path = path.replaceAll("/$", "");
        }
        if (!path.startsWith("/")) {
            path =  "/" + path;
        }
        return path;
    }

    @JavascriptInterface
    public Object newFS(String zipPath) {
        Map<String, byte[]> zipContent = new HashMap<>();
        Set<String> directories = new HashSet<>();

        try (ZipInputStream zipInputStream = new ZipInputStream(SuFileInputStream.open(new SuFile(zipPath)))) {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                if (entry.isDirectory()) {
                    directories.add(parseSlashes(entry.getName()));
                } else {
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    byte[] buffer = new byte[1024];
                    int len;
                    while ((len = zipInputStream.read(buffer)) > -1) {
                        baos.write(buffer, 0, len);
                    }
                    zipContent.put(parseSlashes(entry.getName()), baos.toByteArray());
                }
            }
        } catch (IOException e) {
            Log.e(TAG, e.toString());
            return "";
        }

        return new Object() {
            @JavascriptInterface
            public String list() {
                return String.join(",", new ArrayList<>(zipContent.keySet()));
            }

            @JavascriptInterface
            public String read(String path) {
                byte[] content = zipContent.get(parseSlashes(path));
                if (content == null) {
                    Log.e(TAG, "File not found: " + path);
                    return "";
                }
                return new String(content, StandardCharsets.UTF_8);
            }

            @JavascriptInterface
            public boolean exists(String path) {
                return zipContent.containsKey(parseSlashes(path)) || directories.contains(parseSlashes(path));
            }

            @JavascriptInterface
            public boolean isDirectory(String path) {
                return directories.contains(parseSlashes(path));
            }

            @JavascriptInterface
            public boolean isFile(String path) {
                return zipContent.containsKey(parseSlashes(path));
            }
        };
    }
}
