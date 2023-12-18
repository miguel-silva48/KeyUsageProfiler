package com.ies2324.projBackend.controllers;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
public class UserController {

  private UserService userService;

  @Operation(summary = "Removes requester from his team. Only authorized to Team Members.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully removes requester from his own team."),
      @ApiResponse(responseCode = "401", description = "Unauthorized. Only team members can perform this operation."),
  })
  @PutMapping("/leaveteam")
  public ResponseEntity<User> leaveTeam() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (user.getRole() != Role.TEAM_MEMBER)
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    userService.removeFromTeam(user);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @Operation(summary = "Kicks requested user from his team. Only authorized to Team Leaders. Requested user must belong to same team as the requester (who is a team leader).")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully removes requested user from requesters' team."),
      @ApiResponse(responseCode = "401", description = "Unauthorized. Only team leaders can perform this operation and can only remove members from his own team."),
  })
  @PutMapping("/removefromteam/{id}")
  public ResponseEntity<Team> removeUserFromTeam(@PathVariable("id") String userId) {
    // necessary because of new team members
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Optional<User> expeledToBe = userService.getUserById(Long.parseLong(userId));

    // always return UNAUTHORIZED (can't return NOT FOUND when expeledToBe isEmpty
    // because we then would be which users don't have a team)
    if (user.getRole() != Role.TEAM_LEADER || expeledToBe.isEmpty()
        || !user.getTeam().equals(expeledToBe.get().getTeam()))
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    return new ResponseEntity<>(userService.removeFromTeam(expeledToBe.get()), HttpStatus.OK);
  }
}