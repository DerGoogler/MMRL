package com.dergoogler.mmrl;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.jraska.console.Console;
import com.topjohnwu.superuser.CallbackList;
import com.topjohnwu.superuser.Shell;

import java.util.List;

public class TerminalActivity extends AppCompatActivity {

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.terminal);

        List<String> callbackList = new CallbackList<String>() {
            @Override
            public void onAddElement(String s) {

                Console.writeLine(s);

            }
        };

        Shell.cmd("magisk --install-module \"/sdcard/xhhttp.zip\"")
                .to(callbackList)
                .submit(result -> {
//                    call.invoke();
                });


    }
}
