package com.ies2324.projBackend.services;

import java.util.List;
import java.util.Set;

import org.springframework.boot.autoconfigure.web.ServerProperties.Reactive.Session;
import org.springframework.data.redis.core.RedisKeyExpiredEvent;

import com.ies2324.projBackend.entities.Keystroke;

public interface RedisService {

  void addKeystroke(String userId, Keystroke k);

  Set<String> getAllUserIds();

  List<Keystroke> popAllKeystrokes(String userId);

  String createToken(String teamId);

  String validateTokenAndGetTeamId(String token);

  void handleRedisKeyExpiredEvent(RedisKeyExpiredEvent<Session> event);

}
