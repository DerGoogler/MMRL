package com.dergoogler.mmrl.modules.SuFile; // replace com.your-app-name with your app’s name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
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

import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;
import com.topjohnwu.superuser.io.SuFileOutputStream;

import android.content.ContextWrapper;
import android.os.Environment;

public class SuFileModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext ctx;

    SuFileModule(ReactApplicationContext context) {
        super(context);
        this.ctx = context;
    }

    @Override
    public String getName() {
        return "SuFileModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
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

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String listFiles(String path) {
        String[] modules = new SuFile(path).list();
        return String.join(",", modules);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean createFile(String path) {
        return new SuFile(path).createNewFile();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean deleteFile(String path) {
        return new SuFile(path).delete();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void deleteRecursive(String path) {
        new SuFile(path).deleteRecursive();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean existFile(String path) {
        return new SuFile(path).exists();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getExternalStorageDir() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
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

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getPackageDataDir() {
        return this.ctx.getExternalFilesDir(null).getAbsolutePath();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getPublicDir(String type) {
        return Environment.getExternalStoragePublicDirectory(type).getAbsolutePath();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDataDir() {
        return new ContextWrapper(this.ctx).getFilesDir().getPath();
    }
}