package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.UserProfileController;
import com.waforum.backend.models.User;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class ProfileAssembler implements RepresentationModelAssembler<User, EntityModel<User>> {
    @Override
    public EntityModel<User> toModel(User profile) {
        EntityModel<User> entityModel = EntityModel.of(profile,
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(profile.getId())).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getQuestionsByUserId(profile.getId())).withRel("userQuestions"),
                linkTo(methodOn(UserProfileController.class).editProfile(profile.getId(), null)).withRel("editProfile"),
                linkTo(methodOn(UserProfileController.class).follow(profile.getId())).withRel("follow"),
                linkTo(methodOn(UserProfileController.class).getFollowersById(profile.getId())).withRel("getFollowers"),
                linkTo(methodOn(UserProfileController.class).getFollowingById(profile.getId())).withRel("getFollowing"),
                linkTo(methodOn(UserProfileController.class).getAnswersById(profile.getId())).withRel("userAnswers"));
        return entityModel;
    }
}
