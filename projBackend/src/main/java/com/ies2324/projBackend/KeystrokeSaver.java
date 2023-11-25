package com.ies2324.projBackend;

import java.util.ArrayList;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class KeystrokeSaver {
  
  private RedisService redisService;
  private KeystrokeService keystrokeService;
  private UserStatisticsService userStatisticsService;

  public void addKeyStroke(String userId, Keystroke k){
    redisService.addKeystroke(userId, k);
  }

  @Scheduled(fixedRate = 20000)
  private void flushToSql(){
    StringBuilder sb = new StringBuilder();
    List<Keystroke> keystrokes = new ArrayList<>();
    for (String user_id : redisService.getAllUserIds()) {
      keystrokes = new ArrayList<>();
      redisService.getAllKeystrokes(user_id);
      for (Keystroke k : redisService.getAllKeystrokes(user_id)) {
        keystrokes.add(k);
        sb.append(k.getPressedKey());
      }
      userStatisticsService.createOrAddUserStatistics(Long.parseLong(user_id), sb.toString());
      redisService.deleteKeystrokesOfId(user_id);
    }
    redisService.deleteUserIds();
    keystrokeService.createKeystrokes(keystrokes);
  }
}
