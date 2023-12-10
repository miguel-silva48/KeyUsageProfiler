package com.ies2324.projBackend.dao;

import com.ies2324.projBackend.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamLeaderDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
