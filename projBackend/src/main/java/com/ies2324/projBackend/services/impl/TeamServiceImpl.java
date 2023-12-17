package com.ies2324.projBackend.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.InviteLinkResponse;
import com.ies2324.projBackend.dao.JoinTeamResponse;
import com.ies2324.projBackend.dao.TeamLeaderDTO;
import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;
import com.ies2324.projBackend.repositories.TeamRepository;
import com.ies2324.projBackend.services.RedisService;
import com.ies2324.projBackend.services.TeamService;
import com.ies2324.projBackend.services.UserService;
import com.ies2324.projBackend.services.UserStatisticsService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final UserService userService;
    private final RedisService redisService;
    private final UserStatisticsService userStatisticsService;

    @Override
    @Transactional
    public CreateTeamResponse createTeam(Team team) {
        Team t = teamRepository.save(team);
        User lead = t.getLeader();
        // update user's roles and team
        lead.setTeam(team);
        lead.setRole(Role.TEAM_LEADER);
        lead = userService.updateUser(lead);

        TeamLeaderDTO lead_dto = TeamLeaderDTO.builder().id(lead.getId()).email(lead.getEmail())
                .name(lead.getUsername()).role(lead.getRole()).build();
        return CreateTeamResponse.builder().id(t.getId()).name(t.getName()).leader(lead_dto).build();
    }

    @Override
    public InviteLinkResponse createInviteLink(Team team) {
        Long teamId = team.getId();
        return new InviteLinkResponse(
                redisService.createToken(String.valueOf(teamId)),
                team);
    }

    @Override
    @Transactional
    public JoinTeamResponse joinTeam(User user, String token) {
        String teamid = redisService.validateTokenAndGetTeamId(token);
        if (teamid != null) {
            Optional<Team> optTeam = teamRepository.findById(Long.parseLong(teamid));
            if (optTeam.isPresent()) {
                Team team = optTeam.get();
                user.setTeam(team);
                user.setRole(Role.TEAM_MEMBER);
                userService.updateUser(user);
                team.addMember(user);
                teamRepository.save(team);
                return new JoinTeamResponse(team);
            }
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteTeam(Team team) {
        if (team != null) {
            User u;
            Iterator<User> teamIterator =  team.getMembers().iterator();
            while (teamIterator.hasNext()) {
                u = teamIterator.next();
                userService.clearTeamFromUser(u);
            }
            teamRepository.delete(team);
        }
    }

    public Map<String, Object> getUserStatisticsTeam(Team t) {
        Map<String, Object> document = new HashMap<>();
        List<UserStatistics> userStats = new ArrayList<>();
        Optional<UserStatistics> stat;
        for (User user : t.getMembers()) {
            stat = userStatisticsService.getUserStatisticsByAuthorId(user.getId());
            if (stat.isPresent())
                userStats.add(stat.get());
        }
        document.put("teamName", t.getName());
        document.put("members", userStats);
        return document;
    }
}
