package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.ProfileController;
import com.waforum.backend.models.User;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class ProfileAssembler implements RepresentationModelAssembler<User, EntityModel<User>> {
    @Override
    public EntityModel<User> toModel(User profile) {
        return EntityModel.of(profile,
                linkTo(methodOn(PostsController.class).getQuestions()).withRel("home"),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(profile.getId())).withSelfRel(),
                linkTo(methodOn(ProfileController.class).getQuestionsById(profile.getId())).withRel("userQuestions"),
                linkTo(methodOn(ProfileController.class).getAnswersById(profile.getId())).withRel("userAnswers"));
    }
}
