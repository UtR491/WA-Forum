package com.waforum.backend.controllers;

import com.waforum.backend.configuration.SecurityConfiguration;
import com.waforum.backend.models.AuthenticationRequest;
import com.waforum.backend.models.AuthenticationResponse;
import com.waforum.backend.models.LoginResponse;
import com.waforum.backend.models.User;
import com.waforum.backend.repository.UserRepository;
import com.waforum.backend.services.UserDetailsServiceImpl;
import com.waforum.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    SecurityConfiguration securityConfiguration;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    JwtUtil jwtTokenUtil;

    @PostMapping("/signup")
    public User addUser(@RequestBody User user) {
        user.setPassword(securityConfiguration.getPasswordEncoder().encode(user.getPassword()));
        System.out.println("User sent is " + user);
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public EntityModel<LoginResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            new UsernamePasswordAuthenticationToken(authenticationRequest.getRegistrationNumber(), authenticationRequest.getPassword());
            UserDetails userDetails = userDetailsService.loadUserByRegistrationNumber(Integer.parseInt(authenticationRequest.getRegistrationNumber()));
            System.out.println("UserDetails in UserController.java " + userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwtTokenUtil.generateToken(userDetails)));
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
