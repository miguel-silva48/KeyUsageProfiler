package com.ies2324.projBackend.controllers;

import lombok.AllArgsConstructor;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;
import com.ies2324.projBackend.services.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
public class UserController {

  private UserService userService;

  @PutMapping("/leaveteam")
  public ResponseEntity<User> leaveTeam() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (user.getRole() != Role.TEAM_MEMBER)
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    userService.removeFromTeam(user);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

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