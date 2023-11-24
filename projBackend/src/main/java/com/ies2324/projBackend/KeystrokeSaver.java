package com.ies2324.projBackend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.ies2324.projBackend.consumer.RedisService;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class KeystrokeSaver {
  
  private RedisService redisService;
  private KeystrokeService keystrokeService;
  private UserService userService;

  public void addKeyStroke(String userId, Keystroke k){
    redisService.addKeystroke(userId, k);
  }

  @Scheduled(fixedRate = 5000)
  private void flushToSql(){
    User user;
    List<Keystroke> keystrokes = new ArrayList<>();
    for (String user_id : redisService.getAllUserIds()) {
      user = userService.getUserById(Long.parseLong(user_id));
      keystrokes = new ArrayList<>();
      redisService.getAllKeystrokes(user_id);
      for (Keystroke k : redisService.getAllKeystrokes(user_id)) {
        k.setAuthor(user);
        keystrokes.add(k);
      }
    }
    keystrokeService.createKeystrokes(keystrokes);
  }
}
