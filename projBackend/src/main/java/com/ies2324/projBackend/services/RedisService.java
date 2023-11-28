package com.ies2324.projBackend.services;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Keystroke;

import jakarta.annotation.Resource;

@Service
public class RedisService {

  @Autowired
  private RedisTemplate<String, String> template;

  @Resource(name = "redisTemplate")
  private SetOperations<String, String> setOps;
  @Resource(name = "redisTemplate")
  private ListOperations<String, Keystroke> listOps;

  private final String user_ids = "stroked_users";

  public void addKeystroke(String userId, Keystroke k) {
    setOps.add(user_ids, userId);
    template.expire(userId, 120, TimeUnit.SECONDS);
    listOps.rightPush(userId, k);
  }

  public Set<String> getAllUserIds() {
    return setOps.members(user_ids);
  }

  public List<Keystroke> popAllKeystrokes(String userId) {
    Long numberKeystrokes = listOps.size(userId);
    List<Keystroke> keystrokes = listOps.leftPop(userId, numberKeystrokes);
    return keystrokes;
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
    template.setDefaultSerializer(new GenericJackson2JsonRedisSerializer());
    template.setKeySerializer(new StringRedisSerializer());
    template.setHashKeySerializer(new GenericJackson2JsonRedisSerializer());
    template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
    return template;
  }
}