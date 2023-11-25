package com.ies2324.projBackend;

public interface UserStatisticsService {
  UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText);

  UserStatistics getUserStatisticsByAuthorId(Long authorId);
}