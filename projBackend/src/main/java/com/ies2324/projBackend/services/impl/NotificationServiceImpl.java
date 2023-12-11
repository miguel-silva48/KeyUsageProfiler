package com.ies2324.projBackend.services.impl;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.repositories.NotificationRepository;
import com.ies2324.projBackend.services.NotificationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private NotificationRepository notificationRepository;

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

}
