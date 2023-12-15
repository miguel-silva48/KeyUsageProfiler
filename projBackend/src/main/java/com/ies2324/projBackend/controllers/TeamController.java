package com.ies2324.projBackend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ies2324.projBackend.dao.CreateTeamRequest;
import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.InviteLinkResponse;
import com.ies2324.projBackend.dao.JoinTeamResponse;
import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;
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
        if (user.getTeam() != null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Team team = Team.builder().leader(user).name(request.getName()).build();
        return ResponseEntity.ok(teamService.createTeam(team));
    }

    @PostMapping("invite")
    public ResponseEntity<InviteLinkResponse> generateInviteLink() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() != Role.TEAM_LEADER)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return ResponseEntity.ok(teamService.createInviteLink(user.getTeam()));
    }

    @PostMapping("join/{token}")
    public ResponseEntity<JoinTeamResponse> join(@PathVariable("token") String token) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getTeam() != null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        JoinTeamResponse res = teamService.joinTeam(user, token);
        if (res == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(res);
    }

    @GetMapping("user")
    public ResponseEntity<Team> getUserTeam() {
        // necessary because of new team members
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() == Role.USER)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user.getTeam(), HttpStatus.OK);
    }

    @GetMapping("userstatistics")
    public ResponseEntity<List<UserStatistics>> getUserStatisticsTeam() {
        // necessary because of new team members
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // only team leader can get team statistics
        if (user.getRole() != Role.TEAM_LEADER)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(teamService.getUserStatisticsTeam(user.getTeam()), HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Void> deleteUsersTeam() {
        Team team;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() != Role.TEAM_LEADER || (team = user.getTeam()) == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        teamService.deleteTeam(team);
        return ResponseEntity.ok().build();
    }
}
