package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.UserProfileController;
import com.waforum.backend.models.QuestionWithAllAnswerWrapper;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;


public class QuestionWithAllAnswerWrapperAssembler implements RepresentationModelAssembler<QuestionWithAllAnswerWrapper, EntityModel<QuestionWithAllAnswerWrapper>>{
    @Override
    public EntityModel<QuestionWithAllAnswerWrapper> toModel(QuestionWithAllAnswerWrapper entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(PostsController.class).getAnswerByQuestionId(entity.getQuestion().getId())).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(PostsController.class).acceptAnswer(entity.getQuestion().getId(), null)).withRel("acceptAnswer"),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(entity.getQuestion().getOwnerUserId())).withRel("userProfile"),
                linkTo(methodOn(PostsController.class).answerQuestion(entity.getQuestion().getId(), null)).withRel("answerQuestion"));
    }
}
