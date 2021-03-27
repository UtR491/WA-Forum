package com.waforum.backend.models;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;

public class LoginResponse {
    private ResponseEntity<?> responseEntity;
    private CollectionModel<EntityModel<Posts>> questions;
}
