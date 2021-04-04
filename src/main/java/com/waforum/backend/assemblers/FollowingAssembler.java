package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.UserProfileController;
import com.waforum.backend.models.Following;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

public class FollowingAssembler implements RepresentationModelAssembler<Following, EntityModel<Following>> {
    @Override
    public EntityModel<Following> toModel(Following entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(UserProfileController.class).getFollowingById(entity.getUserId())).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getFollowingId())).withRel("followerProfile"));
    }
}
