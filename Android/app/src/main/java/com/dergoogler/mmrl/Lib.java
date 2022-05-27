package com.dergoogler.mmrl;

import androidx.annotation.NonNull;

public class Lib {

    static {
        System.loadLibrary("native-lib");
    }

    public static native String baseUrl();

    public static native String interfaceName();

    public static native String getStorageKey();

    public static native String getUserAgent();

    /**
     * Returns the html page to load. This is to prevent js injection though the html page with <script/> tags
     * @return HTML page string
     */
    public static native String pageContent(@NonNull String cssInject);

    static class log {

    }
}
