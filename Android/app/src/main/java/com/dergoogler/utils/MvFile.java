package com.dergoogler.utils;

import android.content.Context;
import android.os.Environment;

import androidx.annotation.NonNull;

import com.topjohnwu.superuser.io.SuFileInputStream;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class MvFile extends File {
    private Context context;
    private final String pathname;

    public MvFile(String pathname) {
        super(pathname);
        this.pathname = pathname;
    }

    public String read() {
        try {
            FileInputStream fis = new FileInputStream(this.pathname);  // 2nd line
            InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
            BufferedReader bufferedReader = new BufferedReader(isr);
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            fis.close();
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

    public String suRead() throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(SuFileInputStream.open(this.pathname)))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
                sb.append('\n');
            }
            return sb.toString();
        }
    }

    public static String getExternalStorageDir() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    public static String getPackageDataDir(Context context) {
        return context.getExternalFilesDir(null).getAbsolutePath();
    }

    public static String getPublicDir(String type) {
        return Environment.getExternalStoragePublicDirectory(type).getAbsolutePath();
    }
}
