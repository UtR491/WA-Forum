package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.CommentsAssembler;
import com.waforum.backend.assemblers.SingleAnswerAllCommentsWrapperAssembler;
import com.waforum.backend.exceptions.AnswerNotForQuestionException;
import com.waforum.backend.models.Comments;
import com.waforum.backend.models.SingleAnswerAllCommentsWrapper;
import com.waforum.backend.repository.CommentsRepository;
import com.waforum.backend.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class CommentsController {
    @Autowired
    CommentsRepository commentsRepository;
    @Autowired
    CommentsAssembler commentsAssembler;
    @Autowired
    PostsRepository postsRepository;
    @Autowired
    SingleAnswerAllCommentsWrapperAssembler singleAnswerAllCommentsWrapperAssembler;

    @GetMapping("/posts/questions/{qid}/answers/{aid}/comments")
    public EntityModel<SingleAnswerAllCommentsWrapper> getCommentsByAnswerId(@PathVariable Integer qid,@PathVariable Integer aid){
        List<EntityModel<Comments>> c=commentsRepository.findAllByPostId(aid).stream().
                map(comments -> commentsAssembler.toModel(comments)).collect(Collectors.toList());
        CollectionModel<EntityModel<Comments>> collectionModel=CollectionModel.of(c,
                linkTo(methodOn(CommentsController.class).getCommentsByAnswerId(qid,aid)).withSelfRel());
         EntityModel<SingleAnswerAllCommentsWrapper> singleAnswerAllCommentsWrapperEntityModel=  singleAnswerAllCommentsWrapperAssembler.toModel(new SingleAnswerAllCommentsWrapper(postsRepository.findById(aid).
                orElseThrow(()->new AnswerNotForQuestionException(aid,qid)),collectionModel));
         return singleAnswerAllCommentsWrapperEntityModel;
    }
    @PostMapping("/comments/create/{aid}")
    public ResponseEntity<EntityModel<Comments>> commentOnAnswer(@PathVariable Integer aid, @RequestBody Comments comment){
        comment.setPostId(aid);
        EntityModel<Comments> commentsEntityModel=commentsAssembler.toModel(commentsRepository.save(comment));
        return ResponseEntity.created(commentsEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(commentsEntityModel);
    }
}
