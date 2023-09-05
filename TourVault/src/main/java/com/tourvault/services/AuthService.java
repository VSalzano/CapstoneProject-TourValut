package com.tourvault.services;

import com.tourvault.entities.User;
import com.tourvault.payload.LoginDto;
import com.tourvault.payload.RegisterDto;

public interface AuthService {

    String login(LoginDto loginDto);

    User register(RegisterDto registerDto);
}
