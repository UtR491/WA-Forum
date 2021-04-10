package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.UserProfileController;
import com.waforum.backend.controllers.VotesController;
import com.waforum.backend.models.Posts;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class PostsAssembler implements RepresentationModelAssembler<Posts, EntityModel<Posts>> {
    @Override
    public EntityModel<Posts> toModel(Posts entity) {
        EntityModel<Posts> post = EntityModel.of(entity);
        post.add(
                linkTo(methodOn(VotesController.class).addVoteOnPost(null)).withRel("addVotePost"),
                linkTo(methodOn(VotesController.class).removeVoteOnPost(null)).withRel("removeVotePost"));
        if(entity.getPostTypeId() == 1) {
            post.add(
                    linkTo(methodOn(PostsController.class).getQuestionById(entity.getId())).withSelfRel(), // self link
                    linkTo(methodOn(PostsController.class).getAnswerByQuestionId(entity.getId())).withRel("answers") ,// answers to question
                    linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getOwnerUserId())).withRel("ownerProfile"));
        } else {
            post.add(linkTo(methodOn(PostsController.class).getAnswerByIdByQuestionId(entity.getParentId(), entity.getId())).withSelfRel(),
                    linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getOwnerUserId())).withRel("ownerProfile"));
        }
        return post;
    }

}
