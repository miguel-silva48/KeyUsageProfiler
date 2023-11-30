package com.ies2324.projBackend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ies2324.projBackend.dao.JwtAuthenticationResponse;
import com.ies2324.projBackend.dao.SignInRequest;
import com.ies2324.projBackend.dao.SignUpRequest;
import com.ies2324.projBackend.services.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("signup")
    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody SignUpRequest req) {
        return ResponseEntity.ok(authenticationService.signup(req));
    }

    @PostMapping("signin")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest req) {
        return ResponseEntity.ok(authenticationService.signin(req));
    }

}
