package com.ies2324.projBackend.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ies2324.projBackend.entities.Keystroke;

public interface KeystrokeRepository extends JpaRepository<Keystroke, Long> {
  List<Keystroke> findByAuthorIdOrderByTsAsc(Long id);
}
