package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.configuration.SecurityConfiguration;
import com.waforum.backend.models.AuthenticationRequest;
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
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api")
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

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/signup")
    public User addUser(@RequestBody User user) {
        user.setPassword(securityConfiguration.getPasswordEncoder().encode(user.getPassword()));
        System.out.println("User sent is " + user);
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<EntityModel<LoginResponse>> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        System.out.println("Sending the login request with body " + authenticationRequest);
        try {
            UserDetailsImpl userDetails = userDetailsService.loadUserByRegistrationNumber(Integer.parseInt(authenticationRequest.getRegistrationNumber()));
            if(bCryptPasswordEncoder.matches(authenticationRequest.getPassword(), userDetails.getPassword()))
               // return ResponseEntity.ok(new LoginResponse(jwtTokenUtil.generateToken(userDetails)));
            {
                System.out.println("User id is "+userDetails.getId());
                return ResponseEntity.ok(EntityModel.of(new LoginResponse(jwtTokenUtil.generateToken(userDetails)),
                        linkTo(methodOn(UserProfileController.class).getProfileInfoById(userDetails.getId())).withRel("ownerId")));

            }

            else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
