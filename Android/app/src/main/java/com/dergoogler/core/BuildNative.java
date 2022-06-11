package com.dergoogler.core;

import android.os.Build;
import android.webkit.JavascriptInterface;


public class BuildNative extends Build {
    public BuildNative() {

    }

    @JavascriptInterface
    public Object VERSION() {
        class retn {
            @JavascriptInterface
            public String SECURITY_PATCH() {
                return VERSION.SECURITY_PATCH;
            }

            @JavascriptInterface
            public int SDK_INT() {
                return Build.VERSION.SDK_INT;
            }

            @JavascriptInterface
            public String CODENAME() {
                return Build.VERSION.CODENAME;
            }

            @JavascriptInterface
            public String RELEASE() {
                return Build.VERSION.RELEASE;
            }

        }
        return new retn();
    }

    @JavascriptInterface
    public Object VERSION_CODES() {
        class retn {

            @JavascriptInterface
            public int LOLLIPOP() {
                return Build.VERSION_CODES.LOLLIPOP;
            }


            @JavascriptInterface
            public int LOLLIPOP_MR1() {
                return Build.VERSION_CODES.LOLLIPOP_MR1;
            }

            @JavascriptInterface
            public int M() {
                return Build.VERSION_CODES.M;
            }


            @JavascriptInterface
            public int N() {
                return Build.VERSION_CODES.N;
            }


            @JavascriptInterface
            public int N_MR1() {
                return Build.VERSION_CODES.N_MR1;
            }


            @JavascriptInterface
            public int O() {
                return Build.VERSION_CODES.O;
            }


            @JavascriptInterface
            public int O_MR1() {
                return Build.VERSION_CODES.O_MR1;
            }


            @JavascriptInterface
            public int P() {
                return Build.VERSION_CODES.P;
            }


            @JavascriptInterface
            public int Q() {
                return Build.VERSION_CODES.Q;
            }


            @JavascriptInterface
            public int R() {
                return Build.VERSION_CODES.R;
            }


            @JavascriptInterface
            public int S() {
                return Build.VERSION_CODES.S;
            }


            @JavascriptInterface
            public int S_V2() {
                return Build.VERSION_CODES.S_V2;
            }
        }
        return new retn();
    }

}
