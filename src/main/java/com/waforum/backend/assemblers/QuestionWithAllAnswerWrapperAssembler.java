package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.ProfileController;
import com.waforum.backend.models.QuestionWithAllAnswerWrapper;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;


public class QuestionWithAllAnswerWrapperAssembler implements RepresentationModelAssembler<QuestionWithAllAnswerWrapper, EntityModel<QuestionWithAllAnswerWrapper>>{
    @Override
    public EntityModel<QuestionWithAllAnswerWrapper> toModel(QuestionWithAllAnswerWrapper entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(PostsController.class).getAnswerByQuestionId(entity.getQuestion().getId())).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions()).withRel("home"),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(entity.getQuestion().getOwnerUserId())).withRel("userProfile"));
    }
}
