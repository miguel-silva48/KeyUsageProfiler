package com.ies2324.projBackend.services.impl;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.TeamLeaderDTO;
import com.ies2324.projBackend.entities.Role;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.repositories.TeamRepository;
import com.ies2324.projBackend.services.TeamService;
import com.ies2324.projBackend.services.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final UserService userService;

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
    public void deleteTeam(Team team) {
        teamRepository.delete(team);
    }

}
