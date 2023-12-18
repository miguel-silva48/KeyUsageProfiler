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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/keystrokes")
public class KeystrokeController {

  private KeystrokeService keystrokeService;
  private UserService userService;

  @Operation(summary = "Returns a list with pairs (Key, Number of presses) for every key the requested user has pressed.")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Returns keystroke frequencies related to requested user.", content = { @Content(mediaType = "application/json", 
      schema = @Schema(implementation = KeystrokeFrequency.class)) }),
          @ApiResponse(responseCode = "401", description = "Unauthorized. Only Team Leader may request this data.", content = @Content),
          @ApiResponse(responseCode = "404", description = "Requested user has no keystroke data at this time.", content = @Content),
  })
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