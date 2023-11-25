package com.ies2324.projBackend;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long>{
  Optional<UserStatistics> findByAuthorId(Long authorId);
}
