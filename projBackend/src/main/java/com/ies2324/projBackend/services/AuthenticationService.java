package com.ies2324.projBackend.services;

import com.ies2324.projBackend.dao.JwtAuthenticationResponse;
import com.ies2324.projBackend.dao.SignInRequest;
import com.ies2324.projBackend.dao.SignUpRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);
}
