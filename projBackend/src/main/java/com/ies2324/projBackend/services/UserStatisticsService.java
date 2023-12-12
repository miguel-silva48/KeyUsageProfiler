package com.ies2324.projBackend.services;

import java.util.List;
import java.util.Optional;

import com.ies2324.projBackend.entities.Keystroke;
import com.ies2324.projBackend.entities.UserStatistics;

public interface UserStatisticsService {
  UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText, List<Keystroke> keystrokes);

  Optional<UserStatistics> getUserStatisticsByAuthorId(Long authorId);

  UserStatistics createUserStatistics(UserStatistics userStatistics);
}