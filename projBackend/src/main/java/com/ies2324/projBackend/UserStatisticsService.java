package com.ies2324.projBackend;

public interface UserStatisticsService {
  UserStatistics createOrAddUserStatistics(Long authorId, String writtenText);

  UserStatistics getUserStatisticsByAuthorId(Long authorId);
}