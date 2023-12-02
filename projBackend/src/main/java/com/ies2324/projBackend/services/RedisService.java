package com.ies2324.projBackend.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties.Reactive.Session;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisKeyExpiredEvent;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Keystroke;

import jakarta.annotation.Resource;

@Service
public class RedisService {

  @Autowired
  private RedisTemplate<String, String> template;

  @Resource(name = "redisTemplate")
  private ValueOperations<String, String> valueOps;
  @Resource(name = "redisTemplate")
  private ListOperations<String, Keystroke> listOps;

  private final String ttl = "ttl:";

  public void addKeystroke(String userId, Keystroke k) {
    String keyname = ttl+userId;
    valueOps.set(keyname, userId); // value as name of the other variable
    template.expire(keyname, 29l, TimeUnit.SECONDS);
    listOps.rightPush(userId, k);
  }

  public Set<String> getAllUserIds() {
    Cursor<String> cursor = template.scan(ScanOptions.scanOptions().match(ttl+"*").build());
    Set<String> user_ids = new HashSet<>();
    while (cursor.hasNext()) {
      user_ids.add(valueOps.get(cursor.next()));
    }
    return user_ids;
  }

  public List<Keystroke> popAllKeystrokes(String userId) {
    Long numberKeystrokes = listOps.size(userId);
    List<Keystroke> keystrokes = listOps.leftPop(userId, numberKeystrokes);
    return keystrokes;
  }

  @Component
  public static class SessionExpiredEventListener {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private SimpUserRegistry simpUserRegistry;

    @EventListener
    public void handleRedisKeyExpiredEvent(RedisKeyExpiredEvent<Session> event) {
      System.out.println(simpUserRegistry.getUsers());
      simpMessagingTemplate.convertAndSendToUser(
        "miguel.belchior@ua.pt",
        "/topic/notifications", 
        String.format("User with id %s is inactive", new String(event.getSource()).split(":")[1])
      );
      return ;
    }
  }

}

