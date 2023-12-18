package com.ies2324.projBackend.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.services.NotificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/notifications")
public class NotificationController {
  
  private final NotificationService notificationService;

  @Operation(summary = "Returns the 10 most recent notifications after the requested timestamp (for pagination).")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Returns 10 most recent notifications after requested timestamp."),
          @ApiResponse(responseCode = "404", description = "Requester has no team, therefore, cannot fetch notifications for his team."),
  })
  @GetMapping("{timestamp}")
  public ResponseEntity<List<Notification>> getTeamNotifications(@PathVariable("timestamp") Timestamp timestamp) {
    Team team = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTeam();
    if (team == null)
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    return new ResponseEntity<>(notificationService.getFirst10NotifAfterTs(team, timestamp), HttpStatus.OK);
  }

}
