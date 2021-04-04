package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.CommentsController;
import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.ProfileController;
import com.waforum.backend.models.SingleAnswerAllCommentsWrapper;
import com.waforum.backend.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

public class SingleAnswerAllCommentsWrapperAssembler implements RepresentationModelAssembler<SingleAnswerAllCommentsWrapper, EntityModel<SingleAnswerAllCommentsWrapper>> {
    @Autowired
    PostsRepository postsRepository;
    @Override
    public EntityModel<SingleAnswerAllCommentsWrapper> toModel(SingleAnswerAllCommentsWrapper entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(CommentsController.class).getCommentsByAnswerId(entity.getAnswer().getParentId(),entity.getAnswer().getId())).withSelfRel(),
                linkTo(methodOn(PostsController.class).getAnswerByIdByQuestionId(postsRepository.findOneByParentId(entity.getAnswer().getParentId()).getId(),
                        entity.getAnswer().getParentId())).withRel("answers"),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(entity.getAnswer().getOwnerUserId())).withRel("answeredBy"));
    }
}
