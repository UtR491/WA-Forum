package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.UserController;
import com.waforum.backend.models.Posts;
import org.springframework.hateoas.Affordance;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.mediatype.Affordances;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class PostsAssembler implements RepresentationModelAssembler<Posts, EntityModel<Posts>> {
    @Override
    public EntityModel<Posts> toModel(Posts entity) {
        EntityModel<Posts> post = EntityModel.of(entity);
        if(entity.getPostTypeId() == 1) {
            post.add(
                    linkTo(methodOn(PostsController.class).getQuestionById(entity.getId())).withSelfRel(), // self link
                    linkTo(methodOn(PostsController.class).getAnswerByQuestionId(entity.getId())).withRel("answers") // answers to question
                    );
        } else {
            post.add(linkTo(methodOn(PostsController.class)
                    .getAnswerByIdByQuestionId(entity.getParentId(), entity.getId())).withSelfRel());
        }
        return post;
    }
}
