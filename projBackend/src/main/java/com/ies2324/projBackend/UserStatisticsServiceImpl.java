package com.ies2324.projBackend;

import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserStatisticsServiceImpl implements UserStatisticsService{

  UserStatisticsRepository userStatisticsRepository;
  
  @Override
  public UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText) {
    Optional<UserStatistics> optUserStatistics = userStatisticsRepository.findByAuthorId(authorId);
    UserStatistics userStatistics = new UserStatistics();
    Float thisMinuteWPM = Float.valueOf(writtenText.split("\\s+").length);
    User author = new User();
    author.setId(authorId);
    userStatistics.setAuthor(author);
    if (optUserStatistics.isEmpty()){
      userStatistics.setMinutesTyping(interval);
      userStatistics.setAwpm(thisMinuteWPM/interval);
    }else{
      userStatistics = optUserStatistics.get();
      Float minutesTyping = userStatistics.getMinutesTyping();
      userStatistics.setAwpm( (userStatistics.getAwpm() * minutesTyping + thisMinuteWPM) / (minutesTyping + interval) );
      userStatistics.setMinutesTyping(minutesTyping + interval);
    }
    System.out.println(userStatistics);
    userStatisticsRepository.save(userStatistics);
    return userStatistics;
  }

  @Override
  public UserStatistics getUserStatisticsByAuthorId(Long authorId) {
    return userStatisticsRepository.findByAuthorId(authorId).get();
  }
}