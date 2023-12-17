package com.mibef108287.app;

import java.io.IOException;
import java.sql.Timestamp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.kwhat.jnativehook.keyboard.NativeKeyEvent;
import com.github.kwhat.jnativehook.keyboard.NativeKeyListener;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Keylogger implements NativeKeyListener{
  private final String EXCHANGE_NAME = "strokes";
  private final Long id;
  private final Logger logger = LoggerFactory.getLogger(Keylogger.class);
  private Channel channel; 

  public Keylogger(Long id) throws Exception{
    this.id = id;
    ConnectionFactory factory = new ConnectionFactory();
    Connection connection = factory.newConnection();
    factory.setHost("localhost");
    channel = connection.createChannel();
    channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
  }

  @Override
  public void nativeKeyPressed(NativeKeyEvent nativeEvent){
    try {
      String key = MyKeyEvent.getKeyText(nativeEvent.getKeyCode());
      channel.basicPublish(EXCHANGE_NAME,"",null,buildMessage(key, true).getBytes());
    } catch (IOException e) {
      logger.error(e.getMessage());
    }
  }

  @Override
  public void nativeKeyReleased(NativeKeyEvent nativeEvent) {
    try {
      String key = MyKeyEvent.getKeyText(nativeEvent.getKeyCode());
      channel.basicPublish(EXCHANGE_NAME,"",null,buildMessage(key, false).getBytes());
    } catch (IOException e) {
      logger.error(e.getMessage());
    }
  }

  private String buildMessage(String key, boolean isKeyPress){
    return String.format("{\"author\": {\"id\" : \"%d\"},\"keyValue\": \"%s\", \"isKeyPress\": \"%b\", \"ts\": \"%s\"}", id, key, isKeyPress, new Timestamp(System.currentTimeMillis()).toString());
  }
}
