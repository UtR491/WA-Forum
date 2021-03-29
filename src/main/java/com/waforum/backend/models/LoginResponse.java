package com.waforum.backend.models;

import com.waforum.backend.controllers.PostsController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class LoginResponse {

    private AuthenticationResponse jwt;
    private CollectionModel<EntityModel<Posts>> questions;

    public LoginResponse(String jwt, List<EntityModel<Posts>> questions) {
        this.jwt = new AuthenticationResponse(jwt);
        this.questions = CollectionModel.of(questions,
                linkTo(methodOn(PostsController.class).getQuestions()).withSelfRel());
    }

    public AuthenticationResponse getJwt() {
        return jwt;
    }

    public void setJwt(AuthenticationResponse jwt) {
        this.jwt = jwt;
    }

    public CollectionModel<EntityModel<Posts>> getQuestions() {
        return questions;
    }

    public void setQuestions(CollectionModel<EntityModel<Posts>> questions) {
        this.questions = questions;
    }
}
