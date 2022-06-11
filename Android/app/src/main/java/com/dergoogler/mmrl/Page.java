package com.dergoogler.mmrl;

import android.content.Context;

import com.dergoogler.core.FileSystemNative;

public class Page {
    private final FileSystemNative fs;

    public Page(Context ctx) {
        this.fs = new FileSystemNative(ctx);
    }

    private String loadCss() {
        String css = fs.getExternalStorageDir() + "/MMRL/Theme.css";
        if (fs.existFile(css)) {
            return fs.readFile(css);
        } else {
            return "";
        }
    }

    public String load() {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"bundle/vendor.bundle.css\"/>" +
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"bundle/app.bundle.css\"/>" +
                "<meta charset=\"utf-8\" />" +
                "</head>" +
                "<body>" +
                "<app></app>" +
                "<script src=\"bundle/vendor.bundle.js\"></script>" +
                "<script src=\"bundle/app.bundle.js\"></script>" +
                "<script>const styles = `" + this.loadCss() + "`;const styleSheet = document.createElement(\"style\");styleSheet.innerText = styles; document.head.appendChild(styleSheet)</script>" +
                "</body>" +
                "</html>";
    }
}
