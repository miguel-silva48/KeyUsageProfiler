package com.ies2324.projBackend.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTeamResponse {
    private Long id;
    private String name;
    private TeamLeaderDTO leader;
}
