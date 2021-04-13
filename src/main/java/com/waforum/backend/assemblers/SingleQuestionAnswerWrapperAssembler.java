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
                linkTo(methodOn(PostsController.class).getAnswerByIdByQuestionId(entity.getQuestion().getContent().getId(),entity.getAnswer().getContent().getId())).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getQuestion().getContent().getOwnerUserId())).withRel("answeredBy"),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getAnswer().getContent().getOwnerUserId())).withRel("askedBy"),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(CommentsController.class).getCommentsByAnswerId(entity.getAnswer().getContent().getId())).withRel("comments"),
                linkTo(methodOn(PostsController.class).getAnswerByQuestionId(entity.getQuestion().getContent().getId())).withRel("allAnswers"),
                linkTo(methodOn(PostsController.class).answerQuestion(entity.getQuestion().getContent().getId(), null)).withRel("answerQuestion")
        );
    }
}
