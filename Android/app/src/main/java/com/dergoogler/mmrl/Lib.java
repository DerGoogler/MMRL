package com.dergoogler.mmrl;

public class Lib {

    static {
            System.loadLibrary("native-lib");
    }

    public static native String indexFile();

    public static native String interfaceName();

    public static native String getStorageKey();

    public static native String getUserAgent();
}
