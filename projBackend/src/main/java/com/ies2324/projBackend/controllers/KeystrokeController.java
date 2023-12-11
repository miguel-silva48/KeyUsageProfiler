package com.ies2324.projBackend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ies2324.projBackend.entities.Keystroke;
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

  @GetMapping("{id}")
  public ResponseEntity<List<Keystroke>> getKeystrokesByUserId(@PathVariable("id") Long userId) {
    // control access to this data
    User requester = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (requester.getRole() == Role.USER)
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    Optional<User> optUser = userService.getUserById(userId);
    if (optUser.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    if ((requester.getRole() == Role.TEAM_LEADER && optUser.get().getTeam().getLeader().getId() == requester.getId())
        || (requester.getRole() == Role.TEAM_MEMBER && optUser.get().getId() == requester.getId())) {
          List<Keystroke> keystrokes = keystrokeService.getKeystrokesByAuthorId(userId);
          return new ResponseEntity<>(keystrokes, HttpStatus.OK);
        }
    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }
}