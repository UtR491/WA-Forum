package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.ProfileController;
import com.waforum.backend.models.Followers;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class FollowersAssembler implements RepresentationModelAssembler<Followers, EntityModel<Followers>> {
    @Override
    public EntityModel<Followers> toModel(Followers entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(ProfileController.class).getFollowingById(entity.getUserId())).withSelfRel(),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(entity.getFollowerId())).withRel("followerProfile"));
    }
}
