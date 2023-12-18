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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@AllArgsConstructor
@RequestMapping("api/statistics")
public class UserStatisticsController {

  private UserStatisticsService userStatisticsService;

  @Operation(summary = "Returns user statistics information about requested user. Only authorized to Team Leaders & Team Members.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Returns user statistics about requested user.", content = { @Content(mediaType = "application/json", 
      schema = @Schema(implementation = UserStatistics.class)) }),
      @ApiResponse(responseCode = "401", description = "Unauthorized. Only team leaders (may request to their teams' members) and members may request this data.", content = @Content),
      @ApiResponse(responseCode = "404", description = "User statistics not found.", content = @Content),
  })
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