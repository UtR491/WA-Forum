package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.assemblers.ProfileAssembler;
import com.waforum.backend.exceptions.ProfileNotFoundException;
import com.waforum.backend.models.Posts;
import com.waforum.backend.models.User;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/profile/{id}")
    public EntityModel<User> getProfileInfoById(@PathVariable Integer id){
        return profileAssembler.toModel(userRepository.findById(id).orElseThrow(()->new ProfileNotFoundException(id)));

    }
    @GetMapping("/profile/{id}/questions")
    public CollectionModel<EntityModel<Posts>>getQuestionsById(@PathVariable Integer id){
        List<EntityModel<Posts>> questions=postsRepository.findAllByOwnerUserIdAndPostTypeId(id,1).stream().
                map((ques)->postsAssembler.toModel(ques)).collect(Collectors.toList());
        return CollectionModel.of(questions, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(ProfileController.class).getQuestionsById(id)).withSelfRel());
    }
    @GetMapping("/profile/{id}/answers")
    public CollectionModel<EntityModel<Posts>>getAnswersById(@PathVariable Integer id){
        List<EntityModel<Posts>> answers=postsRepository.findAllByOwnerUserIdAndPostTypeId(id,1).stream().
                map((ans)->postsAssembler.toModel(ans)).collect(Collectors.toList());
        return CollectionModel.of(answers, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(ProfileController.class).getQuestionsById(id)).withSelfRel());
    }
}
