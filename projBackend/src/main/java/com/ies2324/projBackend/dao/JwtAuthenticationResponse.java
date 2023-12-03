package com.ies2324.projBackend.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private Long id;
    private String username;
    private String email;
    private String token;
    private String userType;
}
