package com.ies2324.projBackend.dao;

import com.ies2324.projBackend.entities.Team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InviteLinkResponse {
  private String link;
  private Team team;
}
