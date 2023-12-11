package com.ies2324.projBackend.services;

import java.util.Optional;

import com.ies2324.projBackend.entities.UserStatistics;

public interface UserStatisticsService {
  UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText);

  Optional<UserStatistics> getUserStatisticsByAuthorId(Long authorId);

  UserStatistics createUserStatistics(UserStatistics userStatistics);
}