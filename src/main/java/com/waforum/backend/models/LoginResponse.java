package com.waforum.backend.models;

import com.waforum.backend.controllers.PostsController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class LoginResponse {

    private AuthenticationResponse jwt;


    public LoginResponse(String jwt) {
        this.jwt = new AuthenticationResponse(jwt);
    }

    public AuthenticationResponse getJwt() {
        return jwt;
    }

    public void setJwt(AuthenticationResponse jwt) {
        this.jwt = jwt;
    }

}
