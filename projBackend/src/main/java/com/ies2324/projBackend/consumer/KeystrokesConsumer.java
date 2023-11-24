package com.ies2324.projBackend.consumer;

import java.nio.charset.StandardCharsets;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = { "strokes" })
public class KeystrokesConsumer {

    @RabbitHandler
    public void receive(byte[] in) {
        System.out.println(" [x] Received '" + new String(in, StandardCharsets.UTF_8) + "'");
    }
}
