package com.waforum.backend.assemblers;

import com.waforum.backend.models.Posts;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

public class PostsAssembler implements RepresentationModelAssembler<Posts, EntityModel<Posts>> {
    @Override
    public EntityModel<Posts> toModel(Posts entity) {

    }
}
