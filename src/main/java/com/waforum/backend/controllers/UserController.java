package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.configuration.SecurityConfiguration;
import com.waforum.backend.models.AuthenticationRequest;
import com.waforum.backend.models.AuthenticationResponse;
import com.waforum.backend.models.LoginResponse;
import com.waforum.backend.models.User;
import com.waforum.backend.models.UserDetailsImpl;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.UserRepository;
import com.waforum.backend.services.UserDetailsServiceImpl;
import com.waforum.backend.util.JwtUtil;
import com.waforum.backend.util.PostsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    PostsAssembler postsAssembler;

    @Autowired
    PostsUtil postsUtil;

    @PostMapping("/signup")
    public User addUser(@RequestBody User user) {
        user.setPassword(securityConfiguration.getPasswordEncoder().encode(user.getPassword()));
        System.out.println("User sent is " + user);
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        System.out.println("Sending the login request with body " + authenticationRequest);
        try {
            UserDetailsImpl userDetails = userDetailsService.loadUserByRegistrationNumber(Integer.parseInt(authenticationRequest.getRegistrationNumber()));
            System.out.println("UserDetails in UserController.java " + userDetails);
            System.out.println("Now creating the login response. I think the SecurityContextHolder has not been modified still...");
            return ResponseEntity.ok(new LoginResponse(jwtTokenUtil.generateToken(userDetails),
                    postsRepository.findAllByPostTypeIdOrderByLastActivityDate(1)
                            .stream().map(post -> {
                                postsUtil.setVoteStatus(post, userDetails);
                                return postsAssembler.toModel(post);
                    }).collect(Collectors.toList())));
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
