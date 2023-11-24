package com.ies2324.projBackend.consumer;

import java.nio.charset.StandardCharsets;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.Keystroke;
import com.ies2324.projBackend.KeystrokeService;
import com.ies2324.projBackend.User;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@RabbitListener(queues = { "strokes" })
public class KeystrokesConsumer {


    private RedisService redisService;
    private KeystrokeService keystrokeService;

    @RabbitHandler
    public void receive(byte[] in) {
        redisService.addKeystroke("1", "{pressedKey: \"a\", ts: \"2023-11-24T12:30:45Z\"}");
        System.out.println(" [x] Received '" + new String(in, StandardCharsets.UTF_8) + "'");
    }
}
