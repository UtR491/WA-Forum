package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.CommentsAssembler;
import com.waforum.backend.assemblers.SingleAnswerAllCommentsWrapperAssembler;
import com.waforum.backend.exceptions.AnswerNotForQuestionException;
import com.waforum.backend.models.Comments;
import com.waforum.backend.models.SingleAnswerAllCommentsWrapper;
import com.waforum.backend.models.User;
import com.waforum.backend.models.UserDetailsImpl;
import com.waforum.backend.repository.CommentsRepository;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.UserRepository;
import com.waforum.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
public class CommentsController {
    @Autowired
    CommentsRepository commentsRepository;
    @Autowired
    CommentsAssembler commentsAssembler;
    @Autowired
    PostsRepository postsRepository;
    @Autowired
    SingleAnswerAllCommentsWrapperAssembler singleAnswerAllCommentsWrapperAssembler;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/posts/answers/{aid}/comments")
    public EntityModel<SingleAnswerAllCommentsWrapper> getCommentsByAnswerId(@PathVariable Integer aid){
        List<EntityModel<Comments>> c=commentsRepository.findAllByPostId(aid).stream().
                map(comments -> commentsAssembler.toModel(comments)).collect(Collectors.toList());
        Collections.reverse(c);
        CollectionModel<EntityModel<Comments>> collectionModel=CollectionModel.of(c,
                linkTo(methodOn(CommentsController.class).getCommentsByAnswerId(aid)).withSelfRel());
         EntityModel<SingleAnswerAllCommentsWrapper> singleAnswerAllCommentsWrapperEntityModel=  singleAnswerAllCommentsWrapperAssembler.toModel(new SingleAnswerAllCommentsWrapper(postsRepository.findById(aid).
                orElseThrow(()->new AnswerNotForQuestionException(aid,-1)),collectionModel));
         return singleAnswerAllCommentsWrapperEntityModel;
    }
    @PostMapping("/comments/create/{aid}")
    public ResponseEntity<EntityModel<Comments>> commentOnAnswer(@PathVariable Integer aid, @RequestBody Comments comment){
        System.out.println("Timepass " + SecurityContextHolder.getContext().getAuthentication());
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        comment.setUserId(userDetails.getId());
        comment.setUserDisplayName(userDetails.getDisplayName());
        comment.setPostId(aid);
        comment.setCreationDate(new Date());
        EntityModel<Comments> commentsEntityModel=commentsAssembler.toModel(commentsRepository.save(comment));
        return ResponseEntity.created(commentsEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(commentsEntityModel);
    }
}
