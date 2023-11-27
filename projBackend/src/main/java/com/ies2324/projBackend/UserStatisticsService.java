package com.ies2324.projBackend;

import java.util.Optional;

public interface UserStatisticsService {
  UserStatistics createOrAddUserStatistics(Long authorId, Float interval, String writtenText);

  Optional<UserStatistics> getUserStatisticsByAuthorId(Long authorId);
}