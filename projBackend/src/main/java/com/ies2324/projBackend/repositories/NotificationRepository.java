package com.ies2324.projBackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ies2324.projBackend.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
