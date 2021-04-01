package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.assemblers.ProfileAssembler;
import com.waforum.backend.assemblers.SingleQuestionAnswerWrapperAssembler;
import com.waforum.backend.exceptions.ProfileNotFoundException;
import com.waforum.backend.exceptions.QuestionNotFoundException;
import com.waforum.backend.models.Posts;
import com.waforum.backend.models.SingleQuestionAnswerWrapper;
import com.waforum.backend.models.User;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class ProfileController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    ProfileAssembler profileAssembler;

    @Autowired
    PostsAssembler postsAssembler;


    @Autowired
    SingleQuestionAnswerWrapperAssembler singleQuestionAnswerWrapperAssembler;

    @GetMapping("/profile/{id}")
    public EntityModel<User> getProfileInfoById(@PathVariable Integer Id) {
        return profileAssembler.toModel(userRepository.findById(Id).orElseThrow(() -> new ProfileNotFoundException(Id)));

    }

    //method to show all the questions asked by the user
    @GetMapping("/profile/{id}/questions")
    public CollectionModel<EntityModel<Posts>> getQuestionsByUserId(@PathVariable Integer Id) {
        List<EntityModel<Posts>> questions = postsRepository.findAllByPostTypeIdAndOwnerUserId(1, Id).stream().
                map((ques) -> postsAssembler.toModel(ques)).collect(Collectors.toList());
        return CollectionModel.of(questions,
                linkTo(methodOn(ProfileController.class).getQuestionsByUserId(Id)).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"));
    }


    @GetMapping("/profile/{id}/answers")
    public CollectionModel<EntityModel<SingleQuestionAnswerWrapper>> getAnswersById(@PathVariable Integer Id) {
        List<SingleQuestionAnswerWrapper>wrappers=new ArrayList<>();
        for (Posts ans: postsRepository.findAllByPostTypeIdAndOwnerUserId(2, Id)) {
            wrappers.add(new SingleQuestionAnswerWrapper(
                    postsRepository.findById(ans.getParentId()).orElseThrow(()->new QuestionNotFoundException(ans.getParentId())), ans));
        }
        List<EntityModel<SingleQuestionAnswerWrapper>> wrapperEntityModel=wrappers.stream().map(w->singleQuestionAnswerWrapperAssembler.toModel(w)).collect(Collectors.toList());
        return CollectionModel.of(wrapperEntityModel,
                linkTo(methodOn(ProfileController.class)).withSelfRel(),
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(ProfileController.class).getProfileInfoById(Id)).withRel("userProfile"));
    } 

}
