package com.ies2324.projBackend.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;

@Service
public class RedisService {

  @Resource(name="redisTemplate")
  private ListOperations<String, String> keystrokes_by_id;

  public void addKeystroke(String userId, String k) {
    keystrokes_by_id.leftPush(userId, k);
    for (String keystroke : keystrokes_by_id.range(userId, 0, -1)) {
      System.out.println(keystroke);
    }
  }
}

@Configuration
class ApplicationConfig {

  @Bean
  public RedisConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory();
  }

  public @Bean RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory) {

    RedisTemplate<Object, Object> template = new RedisTemplate<>();
    template.setConnectionFactory(connectionFactory);
    template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
    
    return template;
}
}