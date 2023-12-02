package com.ies2324.projBackend.services;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.InviteLinkResponse;
import com.ies2324.projBackend.entities.Team;

@Service
public interface TeamService {
    CreateTeamResponse createTeam(Team team);

    InviteLinkResponse createInviteLink(Team team);

    void deleteTeam(Team team);
}
