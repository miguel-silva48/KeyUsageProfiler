package com.ies2324.projBackend.repositories;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

  @Query("SELECT n FROM Notification n WHERE n.user.team=?1 AND n.ts < ?2 ORDER BY n.ts DESC LIMIT 10")
  List<Notification> findFirst10NotifAfterTs(Team t, Timestamp ts);
}
