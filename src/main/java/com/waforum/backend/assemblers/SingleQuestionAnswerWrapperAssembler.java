package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.CommentsController;
import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.UserProfileController;
import com.waforum.backend.models.SingleQuestionAnswerWrapper;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

public class SingleQuestionAnswerWrapperAssembler implements RepresentationModelAssembler<SingleQuestionAnswerWrapper, EntityModel<SingleQuestionAnswerWrapper>> {
    @Override
    public EntityModel<SingleQuestionAnswerWrapper> toModel(SingleQuestionAnswerWrapper entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(PostsController.class).getAnswerByIdByQuestionId(entity.getQuestion().getId(),entity.getAnswer().getId())).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getQuestion().getOwnerUserId())).withRel("answeredBy"),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getAnswer().getOwnerUserId())).withRel("askedBy"),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(CommentsController.class).getCommentsByAnswerId(entity.getQuestion().getId(),entity.getAnswer().getId())).withRel("comments"));
    }
}
