package com.ies2324.projBackend.services.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Keystroke;
import com.ies2324.projBackend.entities.Status;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;
import com.ies2324.projBackend.repositories.UserStatisticsRepository;
import com.ies2324.projBackend.services.UserStatisticsService;

import lombok.AllArgsConstructor;
import java.lang.Math;

@Service
@AllArgsConstructor
public class UserStatisticsServiceImpl implements UserStatisticsService {

  UserStatisticsRepository userStatisticsRepository;
  private static final float gamingthreshold = 0.25f;

  @Override
  public UserStatistics createUserStatistics(UserStatistics u) {
    return userStatisticsRepository.save(u);
  }

  @Override
  public UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText, List<Keystroke> keystrokes) {
    Optional<UserStatistics> optUserStatistics = userStatisticsRepository.findByAuthorId(authorId);
    UserStatistics userStatistics = new UserStatistics();
    Float thisMinuteWPM = Float.valueOf(writtenText.split("\\s+").length);
    User author = new User();
    author.setId(authorId);
    userStatistics.setAuthor(author);
    userStatistics.setStatus(getUserStatus(keystrokes));
    if (optUserStatistics.isEmpty()) {
      userStatistics.setMinutesTyping(interval);
      userStatistics.setAwpm(thisMinuteWPM / interval);
      userStatistics.setMaxWpm(thisMinuteWPM / interval);
    } else {
      userStatistics = optUserStatistics.get();
      Float minutesTyping = userStatistics.getMinutesTyping();
      userStatistics.setAwpm((userStatistics.getAwpm() * minutesTyping + thisMinuteWPM) / (minutesTyping + interval));
      userStatistics.setMinutesTyping(minutesTyping + interval);
      userStatistics.setMaxWpm(Math.max(userStatistics.getMaxWpm(), thisMinuteWPM / interval));
    }
    System.out.println(userStatistics);
    userStatisticsRepository.save(userStatistics);
    return userStatistics;
  }

  public Status getUserStatus(List<Keystroke> keystrokes){
    Map<String, Long> keyCounter = keystrokes.stream().collect(Collectors.groupingBy(Keystroke::getPressedKey, Collectors.counting()));
    System.out.println(keyCounter);
    float gamingPercentage = 100 * (keyCounter.getOrDefault("A", 0l) + keyCounter.getOrDefault("W", 0l) + keyCounter.getOrDefault("S", 0l) + keyCounter.getOrDefault("D", 0l))/keystrokes.size();
    if (gamingPercentage > gamingthreshold)
      return Status.GAMING;
    return Status.CODING;
  }

  @Override
  public Optional<UserStatistics> getUserStatisticsByAuthorId(Long authorId) {
    return userStatisticsRepository.findByAuthorId(authorId);
  }
}