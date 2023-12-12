package com.ies2324.projBackend.services.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Keystroke;
import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Status;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;
import com.ies2324.projBackend.repositories.UserStatisticsRepository;
import com.ies2324.projBackend.services.NotificationService;
import com.ies2324.projBackend.services.UserStatisticsService;
import java.lang.Math;

@Service
public class UserStatisticsServiceImpl implements UserStatisticsService {

  @Autowired
  UserStatisticsRepository userStatisticsRepository;
  @Autowired
  private NotificationService notificationService;
  private static final float gamingthreshold = 0.30f;

  @Override
  public UserStatistics createUserStatistics(UserStatistics u) {
    return userStatisticsRepository.save(u);
  }

  @Override
  public UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText, List<Keystroke> keystrokes) {
    Optional<UserStatistics> optUserStatistics = userStatisticsRepository.findByAuthorId(authorId);
    UserStatistics userStatistics = new UserStatistics();
    Float thisMinuteWPM = Float.valueOf(writtenText.split("\\s+").length);
    User author;
    if (optUserStatistics.isEmpty()) {
      author = new User();
      author.setId(authorId);
      userStatistics.setAuthor(author);
      userStatistics.setMinutesTyping(interval);
      userStatistics.setAwpm(thisMinuteWPM / interval);
      userStatistics.setMaxWpm(thisMinuteWPM / interval);
    } else {
      userStatistics = optUserStatistics.get();
      author = userStatistics.getAuthor();
      Float minutesTyping = userStatistics.getMinutesTyping();
      userStatistics.setAwpm((userStatistics.getAwpm() * minutesTyping + thisMinuteWPM) / (minutesTyping + interval));
      userStatistics.setMinutesTyping(minutesTyping + interval);
      userStatistics.setMaxWpm(Math.max(userStatistics.getMaxWpm(), thisMinuteWPM / interval));
    }
    userStatistics.setStatus(getUserStatusAndNotify(author, keystrokes));
    userStatisticsRepository.save(userStatistics);
    return userStatistics;
  }

  public Status getUserStatusAndNotify(User user, List<Keystroke> keystrokes){
    Map<String, Long> keyCounter = keystrokes.stream().collect(Collectors.groupingBy(Keystroke::getPressedKey, Collectors.counting()));
    float gamingPercentage = (keyCounter.getOrDefault("A", 0l) + keyCounter.getOrDefault("W", 0l) + keyCounter.getOrDefault("S", 0l) + keyCounter.getOrDefault("D", 0l))/ (float) keystrokes.size();
    if (gamingPercentage > gamingthreshold){
      Team team = user.getTeam();
      if (team != null){
        Notification n = new Notification();
        n.setStatus(Status.GAMING);
        n.setUser(user);
        notificationService.createAndSendNotification(n);
      }
      return Status.GAMING;
    }
    return Status.CODING;
  }

  @Override
  public Optional<UserStatistics> getUserStatisticsByAuthorId(Long authorId) {
    return userStatisticsRepository.findByAuthorId(authorId);
  }
}