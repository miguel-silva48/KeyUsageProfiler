package com.ies2324.projBackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ies2324.projBackend.dao.CreateTeamResponse;
import com.ies2324.projBackend.dao.InviteLinkResponse;
import com.ies2324.projBackend.dao.JoinTeamResponse;
import com.ies2324.projBackend.entities.Notification;
import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.entities.UserStatistics;

@Service
public interface TeamService {
    CreateTeamResponse createTeam(Team team);

    InviteLinkResponse createInviteLink(Team team);

    JoinTeamResponse joinTeam(User user, String token);

    void deleteTeam(Team team);

    List<UserStatistics> getUserStatisticsTeam(Team t);

    List<Notification> getNotificationsTeam(Team t);
}
