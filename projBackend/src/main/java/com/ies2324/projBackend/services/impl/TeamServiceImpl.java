package com.ies2324.projBackend.services.impl;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.InviteLinkResponse;
import com.ies2324.projBackend.dao.JoinTeamResponse;
import com.ies2324.projBackend.dao.TeamLeaderDTO;
import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.repositories.TeamRepository;
import com.ies2324.projBackend.services.RedisService;
import com.ies2324.projBackend.services.TeamService;
import com.ies2324.projBackend.services.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final UserService userService;
    private final RedisService redisService;

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
        String inviteToken = UUID.randomUUID().toString() + System.currentTimeMillis();
        redisService.saveToken(String.valueOf(team.getId()), inviteToken);
        return new InviteLinkResponse(
            String.format("http://localhost:5173/invite/%s", inviteToken),
            team
        );
    }

    @Override
    public JoinTeamResponse joinTeam(User user, String token) {
        String teamid = redisService.getTokenTeam(token);
        if (teamid != null){
            Optional<Team> optTeam = teamRepository.findById(Long.parseLong(teamid));
            if (optTeam.isPresent()){
                Team team = optTeam.get();
                team.addMember(user);
                return new JoinTeamResponse(team);
            }
        }
        return null;
    }

    @Override
    public void deleteTeam(Team team) {
        teamRepository.delete(team);
    }

}
