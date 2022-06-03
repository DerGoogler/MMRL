package com.dergoogler.mmrl;

import android.content.Context;
import android.util.Log;

import com.dergoogler.core.FileSystemNative;

public class Page {
    private final FileSystemNative fs;

    public Page(Context ctx) {
        this.fs = new FileSystemNative(ctx);
    }

    private String loadCss() {
        String css = fs.getExternalStorageDir() + "/MMRL/Theme.css";
        if (fs.existFile(css)) {
            Log.i("TAG", "loadCss: " + fs.readFile(css));
            return fs.readFile(css);
        } else {
            return "";
        }
    }

    public String load() {
        StringBuilder sb = new StringBuilder();
        sb.append("<!DOCTYPE html>");
        sb.append("<html>");
        sb.append("<head>");
        sb.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"bundle/vendor.bundle.css\"/>");
        sb.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"bundle/app.bundle.css\"/>");
        sb.append("<meta charset=\"utf-8\" />");
        sb.append("</head>");
        sb.append("<body>");
        sb.append("<app></app>");
        sb.append("<script src=\"bundle/vendor.bundle.js\"></script>");
        sb.append("<script src=\"bundle/app.bundle.js\"></script>");
        sb.append("<script>const styles = `").append(this.loadCss()).append("`;const styleSheet = document.createElement(\"style\");styleSheet.innerText = styles; document.head.appendChild(styleSheet)</script>");
        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }
}
