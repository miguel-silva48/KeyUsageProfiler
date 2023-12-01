package com.ies2324.projBackend.dao;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInRequest {
    private String username;
    private String email;
    private String password;
}
