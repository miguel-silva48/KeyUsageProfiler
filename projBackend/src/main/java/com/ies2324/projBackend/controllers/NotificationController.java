package com.ies2324.projBackend.controllers;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.services.NotificationService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/notifications")
public class NotificationController {
  
  private final NotificationService notificationService;

  @GetMapping("{timestamp}")
  public ResponseEntity<List<Notification>> getTeamNotifications(@PathVariable("timestamp") Timestamp timestamp) {
    Team team = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTeam();
    if (team == null)
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    return new ResponseEntity<>(notificationService.getFirst10NotifAfterTs(team, timestamp), HttpStatus.OK);
  }

}
