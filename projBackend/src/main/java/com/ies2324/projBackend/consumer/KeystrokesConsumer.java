package com.ies2324.projBackend.consumer;

import java.nio.charset.StandardCharsets;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ies2324.projBackend.Keystroke;
import com.ies2324.projBackend.KeystrokeSaver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
@RabbitListener(queues = { "strokes" })
public class KeystrokesConsumer {

    private final ObjectMapper mapper = new ObjectMapper();
    private KeystrokeSaver keystrokeSaver;

    @RabbitHandler
    public void receive(byte[] in) throws JsonProcessingException, JsonMappingException{
        Keystroke k = mapper.readValue(new String(in, StandardCharsets.UTF_8), Keystroke.class);
        keystrokeSaver.addKeyStroke(String.valueOf(k.getAuthor().getId()) , k);
    }
}
