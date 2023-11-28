package com.ies2324.projBackend.services;

import com.ies2324.projBackend.entities.User;

public interface JwtService {
    // extracts username from JWT payload
    String extractUserName(String token);

    // generates JWT for given user
    String generateToken(User user);

    // Verifies if JWT is valid for given user
    boolean isTokenValid(String token, User user);
}
