package com.dergoogler.core;

import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;

import com.dergoogler.mmrl.MainActivity;
import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class NativeSuFile {
    private final MainActivity ctx;

    public NativeSuFile(MainActivity ctx) {
        this.ctx = ctx;
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
