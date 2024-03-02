package com.dergoogler.core;

import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Base64OutputStream;
import android.webkit.JavascriptInterface;

import androidx.annotation.NonNull;

import com.dergoogler.mmrl.MainActivity;
import com.topjohnwu.superuser.io.SuFile;
import com.topjohnwu.superuser.io.SuFileInputStream;
import com.topjohnwu.superuser.io.SuFileOutputStream;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
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
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @JavascriptInterface
            public String read(String def) {
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
                    return def;
                }
            }

            @JavascriptInterface
            public String readAsBase64() {
                try {
                    InputStream is = SuFileInputStream.open(file);
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    Base64OutputStream b64os = new Base64OutputStream(baos, Base64.DEFAULT);
                    byte[] buffer = new byte[8192];
                    int bytesRead;
                    try {
                        while ((bytesRead = is.read(buffer)) > -1) {
                            b64os.write(buffer, 0, bytesRead);
                        }
                        return baos.toString();
                    } catch (IOException e) {
                        e.printStackTrace();
                        return "";
                    } finally {
                        closeQuietly(is);
                        closeQuietly(b64os); // This also closes baos
                    }
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                    return "";
                }
            }

            private  void closeQuietly(Closeable closeable) {
                try {
                    closeable.close();
                } catch (IOException e) {
                }
            }

            @JavascriptInterface
            public String list(String delimiter) {
                String[] files = file.list();
                if (delimiter == null) {
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

            @JavascriptInterface
            public boolean canTypeMethod(int type) {
                switch (type) {
                    case 0:
                        return file.canRead();
                    case 1:
                        return file.canWrite();
                    case 2:
                        return file.canExecute();
                }
                return false;
            }

            @JavascriptInterface
            public boolean _is_TypeMethod(int type) {
                switch (type) {
                    case 0:
                        return file.isFile();
                    case 1:
                        return file.isSymlink();
                    case 2:
                        return file.isDirectory();
                    case 3:
                        return file.isBlock();
                    case 4:
                        return file.isCharacter();
                    case 5:
                        return file.isNamedPipe();
                    case 6:
                        return file.isSocket();
                    case 7:
                        return file.isHidden();
                }
                return false;
            }

            @JavascriptInterface
            public boolean createNewSym_link(int type, String existing) {
                switch (type) {
                    case 0:
                        return file.createNewLink(existing);
                    case 1:
                        return file.createNewSymlink(existing);
                }
                return false;
            }

            @JavascriptInterface
            public int hasCode() {
                return file.hashCode();
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
