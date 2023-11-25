package com.ies2324.projBackend;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeystrokeRepository extends JpaRepository<Keystroke, Long>{
  List<Keystroke> findByAuthorId(Long id);
}
