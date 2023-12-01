package com.ies2324.projBackend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ies2324.projBackend.dao.CreateTeamRequest;
import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.services.TeamService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/teams")
public class TeamController {
    private final TeamService teamService;

    @PostMapping("create")
    public ResponseEntity<CreateTeamResponse> createTeam(@RequestBody CreateTeamRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Team team = Team.builder().leader(user).name(request.getName()).build();
        return ResponseEntity.ok(teamService.createTeam(team));
    }
}
