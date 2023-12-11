package com.ies2324.projBackend.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    // extracts subject (email in our case) from JWT payload
    String extractSubject(String token);

    // generates JWT for given UserDetails object (from spring security)
    String generateToken(UserDetails user);

    // generates refresh token so users don't have to login a bunch of times
    // and instead just refresh their tokens
    String generateRefreshToken(UserDetails user);

    // Verifies if JWT is valid for given user
    boolean isTokenValid(String token, UserDetails user);

    boolean isRefreshTokenValid(UserDetails user, String refreshToken);
}
