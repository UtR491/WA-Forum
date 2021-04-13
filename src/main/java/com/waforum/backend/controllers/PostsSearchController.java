package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.elasticrepository.PostsSearchRepository;
import com.waforum.backend.models.Posts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/search")
public class PostsSearchController {
    @Autowired
    PostsSearchRepository postsSearchRepository;
    @Autowired
    PostsAssembler postsAssembler;

    @GetMapping("/posts/searchBody/{body}")
    public CollectionModel<EntityModel<Posts>> searchByBody(@PathVariable final String body){
        List<EntityModel<Posts>>questions=postsSearchRepository.findByBody(body).stream().
                filter(Objects::nonNull).
                map(q->{
                    System.out.println("This is searched question"+q);
                    return postsAssembler.toModel(q);}).collect(Collectors.toList());
        return CollectionModel.of(questions,
                linkTo(methodOn(PostsController.class).getQuestions(null)).withSelfRel());
    }
    @GetMapping("/posts/{ownerDisplayName}")
    public CollectionModel<EntityModel<Posts>> searchByName(@PathVariable final String ownerDisplayName){
        List<EntityModel<Posts>>questions=postsSearchRepository.findByOwnerDisplayName(ownerDisplayName).stream().
                map(q->postsAssembler.toModel(q)).collect(Collectors.toList());
        return CollectionModel.of(questions,
                linkTo(methodOn(PostsController.class).getQuestions(null)).withSelfRel());
    }
}
