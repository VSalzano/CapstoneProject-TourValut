package com.tourvault.services;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tourvault.entities.Role;
import com.tourvault.entities.User;
import com.tourvault.enums.ERole;
import com.tourvault.exceptions.MyAPIException;
import com.tourvault.payload.LoginDto;
import com.tourvault.payload.RegisterDto;
import com.tourvault.repos.RoleRepository;
import com.tourvault.repos.UserRepository;
import com.tourvault.security.JwtTokenProvider;



@Service
public class AuthServiceImpl implements AuthService {


    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public User register(RegisterDto registerDto) {

        // add check for username exists in database
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        // add check for email exists in database
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setTelefono(registerDto.getTelefono());
        user.setIndirizzo(registerDto.getIndirizzo());


        // user role default
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
        roles.add(userRole);

        user.setRoles(roles);
        // System.out.println(user);
        userRepository.save(user);

        return user;
    }

    public ERole getRole(String role) {
        if (role.equals("ADMIN"))
            return ERole.ROLE_ADMIN;
        else if (role.equals("MODERATOR"))
            return ERole.ROLE_MODERATOR;
        else
            return ERole.ROLE_USER;
    }

}
