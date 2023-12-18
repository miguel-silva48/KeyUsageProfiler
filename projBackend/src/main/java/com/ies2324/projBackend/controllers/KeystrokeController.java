package com.ies2324.projBackend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ies2324.projBackend.dao.KeystrokeFrequency;
import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.services.KeystrokeService;
import com.ies2324.projBackend.services.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/keystrokes")
public class KeystrokeController {

  private KeystrokeService keystrokeService;
  private UserService userService;

  @GetMapping("frequencies/{id}")
  public ResponseEntity<List<KeystrokeFrequency>> getKeystrokeFrequencies(@PathVariable("id") Long userId) {
    User requester = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (requester.getRole() != Role.TEAM_LEADER)
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    Optional<User> optRequestedUser = userService.getUserById(userId);
    if (optRequestedUser.isEmpty())
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    User requestedUser = optRequestedUser.get();
    // access control - only his team leader may see his data
    System.out.println("requester: " + requester);
    System.out.println("team leader: " + requestedUser.getTeam().getLeader());

    if (requestedUser.getTeam().getLeader().getId() != requester.getId())
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    List<KeystrokeFrequency> frequencies = keystrokeService.getKeystrokeFrequencies(requestedUser);
    return ResponseEntity.ok(frequencies);
  }
}