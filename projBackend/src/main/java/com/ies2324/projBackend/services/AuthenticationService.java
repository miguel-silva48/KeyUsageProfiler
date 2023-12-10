package com.ies2324.projBackend.services;

import com.ies2324.projBackend.dao.JwtAuthenticationResponse;
import com.ies2324.projBackend.dao.JwtRefreshRequest;
import com.ies2324.projBackend.dao.JwtRefreshResponse;
import com.ies2324.projBackend.dao.SignInRequest;
import com.ies2324.projBackend.dao.SignUpRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);

    JwtRefreshResponse refreshToken(JwtRefreshRequest request);
}
