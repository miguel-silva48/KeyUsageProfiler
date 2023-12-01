package com.ies2324.projBackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ies2324.projBackend.entities.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
