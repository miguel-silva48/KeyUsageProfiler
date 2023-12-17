package com.ies2324.projBackend.services.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
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

    @Override
    public List<Notification> getFirst10NotifAfterTs(Team t, Timestamp ts) {
        List<Notification> notifications;
        if (t == null)
            notifications = new ArrayList<>();
        else {
            notifications = notificationRepository.findFirst10NotifAfterTs(t, ts);
        }
        return notifications;
    }

    @Override
    public void deleteNotifications(User u) {
        notificationRepository.deleteByUser(u);    
    }

}
