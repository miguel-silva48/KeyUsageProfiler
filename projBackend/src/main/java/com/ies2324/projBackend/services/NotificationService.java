package com.ies2324.projBackend.services;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;

@Service
public interface NotificationService {
    Notification createAndSendNotification(Notification notification);

    List<Notification> getFirst10NotifAfterTs(Team t, Timestamp ts);
}
