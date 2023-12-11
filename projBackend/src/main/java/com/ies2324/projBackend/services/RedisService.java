package com.ies2324.projBackend.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
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
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Keystroke;
import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.NotificationType;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;

import jakarta.annotation.Resource;

@Service
public class RedisService {
  @Autowired
  private NotificationService notificationService;
  @Autowired
  private UserService userService;
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  @Autowired
  private RedisTemplate<String, String> redisTemplate;

  @Resource(name = "redisTemplate")
  private ValueOperations<String, String> valueOps;
  @Resource(name = "redisTemplate")
  private ListOperations<String, Keystroke> listOps;

  private final String ttl = "ttl:";
  private final String invitetoken = "invitetoken:";

  public void addKeystroke(String userId, Keystroke k) {
    String keyname = ttl + userId;
    valueOps.set(keyname, userId); // value as name of the other variable
    redisTemplate.expire(keyname, 29, TimeUnit.SECONDS);
    listOps.rightPush(userId, k);
  }

  public Set<String> getAllUserIds() {
    Cursor<String> cursor = redisTemplate.scan(ScanOptions.scanOptions().match(ttl + "*").build());
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

  public String createToken(String teamId) {
    String token = UUID.randomUUID().toString() + "-" + System.currentTimeMillis() + "-" + teamId;
    String keyname = invitetoken + teamId;
    valueOps.set(keyname, token);
    redisTemplate.expire(keyname, 900, TimeUnit.SECONDS);
    return token;
  }

  public String validateTokenAndGetTeamId(String token) {
    String teamId = token.substring(token.lastIndexOf("-") + 1);
    if (valueOps.get(invitetoken + teamId).equals(token))
      return teamId;
    return null;
  }

  @EventListener
  public void handleRedisKeyExpiredEvent(RedisKeyExpiredEvent<Session> event) {
    String[] keynameParts = new String(event.getSource()).split(":");
    if (keynameParts[0].equals("ttl"))
      handleInactivityExpiredEvent(keynameParts[1]);
  }

  private void handleInactivityExpiredEvent(String userId) {
    Long userid = Long.parseLong(userId);
    Optional<User> user = userService.getUserById(userid);
    if (user.isPresent()) {
      User u = user.get();
      Team userTeam = u.getTeam();
      if (userTeam != null && u.getId() != userTeam.getLeader().getId()) {
        Notification n = new Notification();
        n.setType(NotificationType.INACTIVE);
        n.setUser(u);
        n = notificationService.createNotification(n);
        simpMessagingTemplate.convertAndSendToUser(
            userTeam.getLeader().getUsername(),
            "/topic/notifications",
            n);
      }
    }
  }

}
