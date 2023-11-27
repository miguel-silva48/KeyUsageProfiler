package com.ies2324.projBackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ies2324.projBackend.entities.UserStatistics;

public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {
  Optional<UserStatistics> findByAuthorId(Long authorId);
}
