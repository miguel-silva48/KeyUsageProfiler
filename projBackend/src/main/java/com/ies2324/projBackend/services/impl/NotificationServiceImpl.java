package com.ies2324.projBackend.services.impl;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.repositories.NotificationRepository;
import com.ies2324.projBackend.services.NotificationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private SimpMessagingTemplate simpMessagingTemplate;
    private NotificationRepository notificationRepository;

    @Override
    public Notification createAndSendNotification(Notification notification) {
        Notification n = notificationRepository.save(notification);
        Team team = notification.getUser().getTeam();
        if (team != null){
            simpMessagingTemplate.convertAndSendToUser(
                team.getLeader().getUsername(),
                "/topic/notifications",
                n);
        }
        return n;
    }

}
