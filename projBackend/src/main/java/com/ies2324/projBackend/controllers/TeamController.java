package com.ies2324.projBackend.controllers;

import java.util.Map;

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
import com.ies2324.projBackend.services.TeamService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/teams")
public class TeamController {

    private final TeamService teamService;

    @Operation(summary = "Creates a new team, with the requester as the team leader.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Team was successfully created."),
        @ApiResponse(responseCode = "401", description = "Requester already belongs to a team. Couldn't create team."),
    })
    @PostMapping("create")
    public ResponseEntity<CreateTeamResponse> createTeam(@RequestBody CreateTeamRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getTeam() != null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Team team = Team.builder().leader(user).name(request.getName()).build();
        return ResponseEntity.ok(teamService.createTeam(team));
    }

    @Operation(summary = "Returns an invite link for the requesters' team. Refer to POST /api/teams/join/{token} for using that link. Only authorized to Team Leaders.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Invite link for requesters' team."),
        @ApiResponse(responseCode = "401", description = "Unauthorized. Only team leader may generate an invite link for his team."),
    })
    @PostMapping("invite")
    public ResponseEntity<InviteLinkResponse> generateInviteLink() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() != Role.TEAM_LEADER)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return ResponseEntity.ok(teamService.createInviteLink(user.getTeam()));
    }

    @Operation(summary = "Attempts to join a team with the given token. The token is part of the invite link generated at POST /api/teams/invite.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Invite link for requesters' team."),
        @ApiResponse(responseCode = "400", description = "Invalid invite link token provided."),
        @ApiResponse(responseCode = "401", description = "Unauthorized. Only regular users may join a team. Team members/leaders cannot join a team, since they already belong to one."),
    })
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

    @Operation(summary = "Returns team name and user statistics for each user that belongs to the requesters' team. Only authorized to Team Leaders.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully returns user statistics data and team name to team leader who requested it."),
        @ApiResponse(responseCode = "401", description = "Unauthorized. Only team leaders can access this data."),
    })
    @GetMapping("userstatistics")
    public ResponseEntity<Map<String, Object>> getUserStatisticsTeam() {
        // necessary because of new team members
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // only team leader can get team statistics
        if (user.getRole() != Role.TEAM_LEADER)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(teamService.getUserStatisticsTeam(user.getTeam()), HttpStatus.OK);
    }

    @Operation(summary = "Deletes the requesters' team. Only authorized to Team Leaders.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully removes all users from team and deletes it."),
        @ApiResponse(responseCode = "401", description = "Unauthorized. Only team leaders can delete their own team."),
    })
    @DeleteMapping("delete")
    public ResponseEntity<Void> deleteUsersTeam() {
        Team team;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() != Role.TEAM_LEADER || (team = user.getTeam()) == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        teamService.deleteTeam(team);
        return ResponseEntity.ok().build();
    }

    // Similar to UserStatistics, but available to Team Members aswell, and hides
    // information
    // related to user status (it's not needed)
    @Operation(summary = "Returns user statistics and team name related to each user in the requesters' team. Similar to /api/teams/userstatistics but hides unneeded information. Only authorized to Team Leaders & Team Members.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully returns necessary user statistics to display leaderboards."),
        @ApiResponse(responseCode = "401", description = "Unauthorized. Only team leaders and members can access this data."),
    })
    @GetMapping("leaderboards")
    public ResponseEntity<Map<String, Object>> getLeaderboardData() {
        // necessary because of new team members
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // only team leader can get team statistics
        if (user.getRole() == Role.USER)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(teamService.getLeaderboardDataTeam(user.getTeam()), HttpStatus.OK);
    }
}
