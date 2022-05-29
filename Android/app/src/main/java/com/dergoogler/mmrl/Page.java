package com.dergoogler.mmrl;

public class Page {
    public static String load() {
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
        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }
}
