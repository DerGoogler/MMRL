package com.dergoogler.plugin;

import android.util.Base64;
import android.util.Log;

import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.Call;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class FetchPlugin extends CordovaPlugin {

    public static final String LOG_TAG = "FetchPlugin";
    private static CallbackContext callbackContext;

    private OkHttpClient mClient = new OkHttpClient();
    public static final MediaType MEDIA_TYPE_MARKDOWN = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");

    private static final long DEFAULT_TIMEOUT = 10;

    @Override
    public boolean execute(final String action, final JSONArray data, final CallbackContext callbackContext) {

        if (action.equals("fetch")) {

            try {
                String method = data.getString(0);
                // Log.v(LOG_TAG, "execute: method = " + method.toString());

                String urlString = data.getString(1);
                // Log.v(LOG_TAG, "execute: urlString = " + urlString.toString());

                String postBody = data.getString(2);
                // Log.v(LOG_TAG, "execute: postBody = " + postBody.toString());

                JSONObject headers = data.getJSONObject(3);
                if (headers.has("map") && headers.getJSONObject("map") != null) {
                    headers = headers.getJSONObject("map");
                }

                // Log.v(LOG_TAG, "execute: headers = " + headers.toString());

                Request.Builder requestBuilder = new Request.Builder();

                // method + postBody
                if (postBody != null && !postBody.equals("null")) {
                    // requestBuilder.post(RequestBody.create(MEDIA_TYPE_MARKDOWN, postBody.toString()));
                    String contentType;
                    if (headers.has("content-type")) {
                        JSONArray contentTypeHeaders = headers.getJSONArray("content-type");
                        contentType = contentTypeHeaders.getString(0);
                    } else {
                        contentType = "application/json";
                    }
                    requestBuilder.post(RequestBody.create(MediaType.parse(contentType), postBody.toString()));
                } else {
                    requestBuilder.method(method, null);
                }

                // url
                requestBuilder.url(urlString);

                // headers
                if (headers != null && headers.names() != null && headers.names().length() > 0) {
                    for (int i = 0; i < headers.names().length(); i++) {

                        String headerName = headers.names().getString(i);
                        JSONArray headerValues = headers.getJSONArray(headers.names().getString(i));

                        if (headerValues.length() > 0) {
                            String headerValue = headerValues.getString(0);
                            // Log.v(LOG_TAG, "key = " + headerName + " value = " + headerValue);
                            requestBuilder.addHeader(headerName, headerValue);
                        }
                    }
                }

                Request request = requestBuilder.build();

                mClient.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException throwable) {
                        throwable.printStackTrace();
                        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, throwable.getMessage()));
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {

                        JSONObject result = new JSONObject();
                        try {
                            Headers responseHeaders = response.headers();

                            JSONObject allHeaders = new JSONObject();

                            if (responseHeaders != null) {
                                for (int i = 0; i < responseHeaders.size(); i++) {
                                    if (responseHeaders.name(i).compareToIgnoreCase("set-cookie") == 0 &&
                                            allHeaders.has(responseHeaders.name(i))) {
                                        allHeaders.put(responseHeaders.name(i), allHeaders.get(responseHeaders.name(i)) + ",\n" + responseHeaders.value(i));
                                        continue;
                                    }
                                    allHeaders.put(responseHeaders.name(i), responseHeaders.value(i));
                                }
                            }

                            result.put("headers", allHeaders);

                            if (response.body().contentType().type().equals("image")) {
                                result.put("isBlob", true);
                                result.put("body", Base64.encodeToString(response.body().bytes(), Base64.DEFAULT));
                            } else {
                                result.put("body", response.body().string());
                            }

                            result.put("statusText", response.message());
                            result.put("status", response.code());
                            result.put("url", response.request().url().toString());

                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                        // Log.v(LOG_TAG, "HTTP code: " + response.code());
                        // Log.v(LOG_TAG, "returning: " + result.toString());

                        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
                    }
                });

            } catch (JSONException e) {
                Log.e(LOG_TAG, "execute: Got JSON Exception " + e.getMessage());
                callbackContext.error(e.getMessage());
            }

        } else if (action.equals("setTimeout")) {
            this.setTimeout(data.optLong(0, DEFAULT_TIMEOUT));
        } else {
            Log.e(LOG_TAG, "Invalid action : " + action);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
            return false;
        }

        return true;
    }

    private void setTimeout(long seconds) {
        // Log.v(LOG_TAG, "setTimeout: " + seconds);

        mClient = mClient.newBuilder()
                .connectTimeout(seconds, TimeUnit.SECONDS)
                .readTimeout(seconds, TimeUnit.SECONDS)
                .writeTimeout(seconds, TimeUnit.SECONDS)
                .build();
    }
}