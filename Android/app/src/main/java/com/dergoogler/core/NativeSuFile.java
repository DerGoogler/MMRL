package com.dergoogler.core;

import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;

import com.dergoogler.mmrl.MainActivity;
import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;
import com.topjohnwu.superuser.io.SuFileOutputStream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;

import java.nio.charset.StandardCharsets;
import java.util.Date;

public class NativeSuFile {
    private final MainActivity ctx;

    public NativeSuFile(MainActivity ctx) {
        this.ctx = ctx;
    }

    @JavascriptInterface
    public Object v2(String path) {
        SuFile file = new SuFile(path);
        return new Object() {
            @JavascriptInterface
            public void write(String data) {
                try {
                    OutputStream outputStream = SuFileOutputStream.open(file);
                    outputStream.write(data.getBytes(StandardCharsets.UTF_8));
                    outputStream.flush();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @JavascriptInterface
            public String read() {
                try {
                    try (BufferedReader br = new BufferedReader(new InputStreamReader(SuFileInputStream.open(file)))) {
                        StringBuilder sb = new StringBuilder();
                        String line;
                        while ((line = br.readLine()) != null) {
                            sb.append(line);
                            sb.append('\n');
                        }
                        return sb.toString();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    return "";
                }
            }

            @JavascriptInterface
            public String list(String delimiter) {
                String[] files = file.list();
                if(delimiter == null) {
                    return String.join(",", files);
                } else {
                    return String.join(delimiter, files);
                }
            }

            @JavascriptInterface
            public long lastModified() {
                return file.lastModified();
            }

            @JavascriptInterface
            public boolean create(int type) {
                switch (type) {
                    case 0:
                        return file.createNewFile();
                    case 1:
                        return file.mkdirs();
                    case 2:
                        return file.mkdir();
                }
                return false;
            }

            @JavascriptInterface
            public boolean delete() {
                return file.delete();
            }


            @JavascriptInterface
            public boolean deleteRecursive() {
                return file.deleteRecursive();
            }


            @JavascriptInterface
            public boolean exists() {
                return file.exists();
            }
        };
    }

    @JavascriptInterface
    public String readFile(String path) {
        try {
            try (BufferedReader br = new BufferedReader(new InputStreamReader(SuFileInputStream.open(path)))) {
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line);
                    sb.append('\n');
                }
                return sb.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

    @NonNull
    @JavascriptInterface
    public String listFiles(String path) {
        String[] modules = new SuFile(path).list();
        return String.join(",", modules);
    }

    @JavascriptInterface
    public boolean createFile(String path) {
        return new SuFile(path).createNewFile();
    }

    @JavascriptInterface
    public boolean deleteFile(String path) {
        return new SuFile(path).delete();
    }

    @JavascriptInterface
    public void deleteRecursive(String path) {
        new SuFile(path).deleteRecursive();
    }

    @JavascriptInterface
    public boolean existFile(String path) {
        return new SuFile(path).exists();
    }
}
