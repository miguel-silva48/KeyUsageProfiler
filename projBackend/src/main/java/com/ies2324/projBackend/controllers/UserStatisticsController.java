package com.ies2324.projBackend.controllers;

import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;
import com.ies2324.projBackend.services.UserStatisticsService;

@RestController
@AllArgsConstructor
@RequestMapping("api/statistics")
public class UserStatisticsController {

  private UserStatisticsService userStatisticsService;

  @GetMapping("{id}")
  public ResponseEntity<UserStatistics> getUserStatisticsByAuthorId(@PathVariable("id") Long userId) {
    Optional<UserStatistics> optStatistics = userStatisticsService.getUserStatisticsByAuthorId(userId);
    User requester = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (requester.getRole() == Role.USER || optStatistics.isEmpty())
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    UserStatistics userStatistics = optStatistics.get();
    // only get data if you're a team member and its your data
    // or you're the team leader of this user
    if ((requester.getRole() == Role.TEAM_LEADER && userStatistics.getAuthor().getTeam().getLeader().getId() == requester.getId())
        || (requester.getRole() == Role.TEAM_MEMBER && userId == requester.getId()))
      return new ResponseEntity<>(userStatistics, HttpStatus.OK);
    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

}