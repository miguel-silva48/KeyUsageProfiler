package com.ies2324.projBackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ies2324.projBackend.dao.JwtAuthenticationResponse;
import com.ies2324.projBackend.dao.JwtRefreshRequest;
import com.ies2324.projBackend.dao.JwtRefreshResponse;
import com.ies2324.projBackend.dao.SignInRequest;
import com.ies2324.projBackend.dao.SignUpRequest;
import com.ies2324.projBackend.services.AuthenticationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "Create an account.")
    @ApiResponse(responseCode = "200", description = "Account created successfully.")
    @PostMapping("signup")
    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody SignUpRequest req) {
        return ResponseEntity.ok(authenticationService.signup(req));
    }

    @Operation(summary = "Authenticate an account and log in.")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated and logged user in.")
    @PostMapping("signin")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest req) {
        return ResponseEntity.ok(authenticationService.signin(req));
    }

    @Operation(summary = "Refresh JWT access token using a JWT refresh token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully refreshed JWT with given request token.", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = JwtRefreshResponse.class)) }),
            @ApiResponse(responseCode = "403", description = "Invalid refresh token"),
    })
    @PostMapping("refreshToken")
    public ResponseEntity<JwtRefreshResponse> refreshToken(@RequestBody JwtRefreshRequest req) {
        JwtRefreshResponse res = authenticationService.refreshToken(req);
        if (res == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(authenticationService.refreshToken(req));
    }

}
