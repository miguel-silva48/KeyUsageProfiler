package com.ies2324.projBackend.consumer;

import java.nio.charset.StandardCharsets;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ies2324.projBackend.KeystrokeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@RabbitListener(queues = { "strokes" })
public class KeystrokesConsumer {

    private final ObjectMapper mapper = new ObjectMapper();
    private RedisService redisService;
    private KeystrokeService keystrokeService;

    @RabbitHandler
    public void receive(byte[] in) throws JsonProcessingException, JsonMappingException{
        JsonNode jn = mapper.readTree(new String(in, StandardCharsets.UTF_8));
        redisService.addKeystroke("1", jn);
    }

    @Scheduled
    public void flushToDb(){

    }
}
