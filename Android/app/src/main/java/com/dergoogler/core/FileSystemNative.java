package com.dergoogler.core;

import android.content.Context;
import android.content.ContextWrapper;
import android.os.Environment;
import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;

import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;
import com.topjohnwu.superuser.io.SuFileOutputStream;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class FileSystemNative {
    private final Context ctx;

    public FileSystemNative(Context ctx) {
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

    @JavascriptInterface
    public String getExternalStorageDir() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    @JavascriptInterface
    public void download(String output, String url) {
        try {
            URL u = new URL(url);
            InputStream is = u.openStream();
            DataInputStream dis = new DataInputStream(is);
            byte[] buffer = new byte[1024];
            int length;
            SuFile file = new SuFile(getDataDir() + "/Download");
            if (!file.exists()) {
                file.mkdirs();
            }
            OutputStream fos = SuFileOutputStream.open(new SuFile(getDataDir() + "/Download/" + output));
            while ((length = dis.read(buffer)) > 0) {
                fos.write(buffer, 0, length);
            }
        } catch (IOException | SecurityException e) {
            e.printStackTrace();
        }
    }

    public void unpackZip(String path, String zipname) {
        InputStream is;
        ZipInputStream zis;
        try {
            String filename;
            is = SuFileInputStream.open(path + "/" + zipname);
            zis = new ZipInputStream(new BufferedInputStream(is));
            ZipEntry ze;
            byte[] buffer = new byte[1024];
            int count;
            while ((ze = zis.getNextEntry()) != null) {
                filename = ze.getName();
                if (ze.isDirectory()) {
                    File fmd = new SuFile(path + filename);
                    fmd.mkdirs();
                    continue;
                }
                OutputStream fout = SuFileOutputStream.open(path + filename);
                while ((count = zis.read(buffer)) != -1) {
                    fout.write(buffer, 0, count);
                }
                fout.close();
                zis.closeEntry();
            }
            zis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public String getPackageDataDir() {
        return this.ctx.getExternalFilesDir(null).getAbsolutePath();
    }

    @JavascriptInterface
    public String getPublicDir(String type) {
        return Environment.getExternalStoragePublicDirectory(type).getAbsolutePath();
    }

    @JavascriptInterface
    public String getDataDir() {
        return new ContextWrapper(this.ctx).getFilesDir().getPath();
    }

}
