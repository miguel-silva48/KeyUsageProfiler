package com.ies2324.projBackend.services;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.InviteLinkResponse;
import com.ies2324.projBackend.dao.JoinTeamResponse;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;

@Service
public interface TeamService {
    CreateTeamResponse createTeam(Team team);

    InviteLinkResponse createInviteLink(Team team);

    JoinTeamResponse joinTeam(User user, String token);

    void deleteTeam(Team team);

    Map<String, Object> getUserStatisticsTeam(Team t);

    Map<String, Object> getLeaderboardDataTeam(Team t);

}
