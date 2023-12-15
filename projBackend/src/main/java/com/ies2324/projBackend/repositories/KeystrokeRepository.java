package com.ies2324.projBackend.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ies2324.projBackend.dao.KeystrokeFrequency;
import com.ies2324.projBackend.entities.Keystroke;
import com.ies2324.projBackend.entities.User;

public interface KeystrokeRepository extends JpaRepository<Keystroke, Long> {
  List<Keystroke> findByAuthorIdOrderByTsAsc(Long id);

  @Query("select new com.ies2324.projBackend.dao.KeystrokeFrequency(k.keyValue, COUNT(*)) from Keystroke as k where k.author = ?1 group by k.keyValue order by count(*) desc")
  List<KeystrokeFrequency> findKeystrokeFrequenciesByAuthor(User author);
}
