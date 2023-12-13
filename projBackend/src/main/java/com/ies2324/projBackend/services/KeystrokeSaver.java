package com.ies2324.projBackend.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ies2324.projBackend.entities.Keystroke;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class KeystrokeSaver {

  private RedisService redisService;
  private KeystrokeService keystrokeService;
  private UserStatisticsService userStatisticsService;

  public void addKeyStroke(String userId, Keystroke k) {
    redisService.addKeystroke(userId, k);
  }

  @Scheduled(fixedRate = 15000)
  private void flushToSql() {
    StringBuilder sb;
    List<Keystroke> keystrokes; 
    for (String user_id : redisService.getAllUserIds()) {
      sb = new StringBuilder();
      keystrokes = new ArrayList<>();
      keystrokes = redisService.popAllKeystrokes(user_id);
      for (Keystroke k : keystrokes) {
        sb.append(k.getPressedKey());
      }
      if (sb.length() != 0){
        userStatisticsService.createOrAddUserStatistics(Long.parseLong(user_id), 0.25f, sb.toString(), keystrokes);
        keystrokeService.createKeystrokes(keystrokes);
      }
    }
  }
}
