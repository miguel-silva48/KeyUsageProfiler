package com.ies2324.projBackend.services;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Notification;

@Service
public interface NotificationService {
    Notification createAndSendNotification(Notification notification);
}
