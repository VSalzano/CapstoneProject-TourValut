package com.tourvault.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourvault.entities.User;
import com.tourvault.payload.JWTAuthResponse;
import com.tourvault.payload.LoginDto;
import com.tourvault.payload.RegisterDto;
import com.tourvault.services.AuthService;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto) {

        String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDto registerDto) {
        User user = authService.register(registerDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
