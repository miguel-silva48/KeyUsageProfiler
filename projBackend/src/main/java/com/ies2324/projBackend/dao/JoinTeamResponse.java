package com.ies2324.projBackend.dao;

import com.ies2324.projBackend.entities.Team;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JoinTeamResponse {
  private Team team;
}
