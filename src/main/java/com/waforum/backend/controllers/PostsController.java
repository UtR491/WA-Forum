package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.assemblers.QuestionWithAllAnswerWrapperAssembler;
import com.waforum.backend.assemblers.SingleQuestionAnswerWrapperAssembler;
import com.waforum.backend.exceptions.AnswerNotForQuestionException;
import com.waforum.backend.exceptions.AnswerNotFoundException;
import com.waforum.backend.exceptions.QuestionNotFoundException;
import com.waforum.backend.models.*;
import com.waforum.backend.repository.*;
import com.waforum.backend.util.JwtUtil;
import com.waforum.backend.util.PostsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class PostsController {
    @Autowired
    PostsRepository postsRepository;

    @Autowired
    PostsAssembler postsAssembler;

    @Autowired
    QuestionWithAllAnswerWrapperAssembler questionWithAllAnswerWrapperAssembler;

    @Autowired
    SingleQuestionAnswerWrapperAssembler singleQuestionAnswerWrapperAssembler;


    @Autowired
    VotesRepository votesRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    PostsUtil postsUtil;

    @Autowired
    AllTagsRepository allTagsRepository;

    @Autowired
    TagsRepository tagsRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/posts/questions")
    public CollectionModel<EntityModel<Posts>> getQuestions(@RequestParam(required = false) List<String> tags) {
        System.out.println("Hello inside /posts/questions function");
        List<EntityModel<Posts>> questions;
        if(tags == null) {
            questions = postsRepository.findAllByPostTypeIdOrderByLastActivityDate(1).stream()
                    .map((question) -> {
                        postsUtil.setVoteStatus(question, null);
                        postsUtil.setPostTags(question);
                        System.out.println("Adding post = " + question + " to the list.");
                        return postsAssembler.toModel(question);
                    }).collect(Collectors.toList());
        } else {
            System.out.println("Tags are " + tags);
            System.out.println("Tags from which are in the database " + allTagsRepository.findByTagIn(tags));
            System.out.println("Lessee " + allTagsRepository.findByTagIn(List.of("abc", "xyz")));
            List<Integer> tagIds = allTagsRepository.findByTagIn(tags).stream().map(AllTags::getId).collect(Collectors.toList());
            System.out.println("Tag IDs are " + tagIds);
            if(tagIds.size() != tags.size()) // not all tags were found.
                return CollectionModel.empty(WebMvcLinkBuilder
                                .linkTo(WebMvcLinkBuilder.methodOn(PostsController.class).getQuestions(null))
                                .withSelfRel());
            System.out.println("postsRepo.findAllByTags = " + postsRepository.findAllByTags(tagIds, tagIds.size()));
            questions = postsRepository.findAllByTags(tagIds, tagIds.size()).stream()
                    .map((question) -> {
                        System.out.println("Questions are = " + question);
                        postsUtil.setVoteStatus(question, null);
                        postsUtil.setPostTags(question);
                        return postsAssembler.toModel(question);
                    }).collect(Collectors.toList());
        }
        Collections.reverse(questions);
        return CollectionModel.of(questions,
                WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PostsController.class).getQuestions(null))
                        .withSelfRel());
    }

    @GetMapping("/posts/questions/{id}")
    public EntityModel<Posts> getQuestionById(@PathVariable Integer id) {
        Optional<Posts> post = Optional.ofNullable(postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id)));
        postsUtil.setVoteStatus(post.get(), null);
        postsUtil.setPostTags(post.get());
        return postsAssembler.toModel(post.get());
    }

    @GetMapping("/posts/questions/{id}/answers")
    public EntityModel<QuestionWithAllAnswerWrapper> getAnswerByQuestionId(@PathVariable Integer id) {

        Integer acceptedAnswerId = postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id)).getAcceptedAnswerId();
        Optional<Posts> question = Optional.ofNullable(postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id)));
        postsUtil.setVoteStatus(question.get(), null);
        postsUtil.setPostTags(question.get());
        List<EntityModel<Posts>> answers = postsRepository.findAllByParentId(id).stream().map(answer -> {
            postsUtil.setVoteStatus(answer, null);
            postsUtil.setPostTags(answer);
            return postsAssembler.toModel(answer);
        }).collect(Collectors.toList());
        Collections.reverse(answers);
        return questionWithAllAnswerWrapperAssembler.toModel(new QuestionWithAllAnswerWrapper(postsAssembler.toModel(question.get()),
                acceptedAnswerId==null?
                        null: postsAssembler.toModel(postsRepository.findById(acceptedAnswerId).orElseThrow(()->new AnswerNotFoundException(acceptedAnswerId))),
                answers));
    }

    @PostMapping("/posts/questions/{id}/accept")
    public ResponseEntity<?> acceptAnswer(@PathVariable Integer id, @RequestBody Integer acceptingAnswerId) {
        try {
            Posts question = postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id));
            postsRepository.findById(id).orElseThrow(() -> new AnswerNotFoundException(acceptingAnswerId));
            question.setAcceptedAnswerId(acceptingAnswerId);
            postsRepository.save(question);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/posts/questions/{qid}/answers/{aid}")
    public EntityModel<SingleQuestionAnswerWrapper> getAnswerByIdByQuestionId(@PathVariable Integer qid, @PathVariable Integer aid) {

        Optional<Posts> question = Optional.ofNullable(postsRepository.findById(qid).orElseThrow(() -> new QuestionNotFoundException(qid)));
        postsUtil.setVoteStatus(question.get(), null);
        postsUtil.setPostTags(question.get());
        Optional<Posts> answer = Optional.ofNullable(postsRepository.findById(aid).orElseThrow(() -> new AnswerNotForQuestionException(aid, qid)));
        postsUtil.setVoteStatus(answer.get(), null);
        postsUtil.setPostTags(answer.get());
        return singleQuestionAnswerWrapperAssembler.toModel(
                new SingleQuestionAnswerWrapper(postsAssembler.toModel(question.get()),
                        postsAssembler.toModel(answer.get())));
    }

    @PostMapping("/posts/create/questions")
    public ResponseEntity<EntityModel<Posts>> askQuestion(@RequestBody Posts post) {
        System.out.println(post);
        UserDetailsImpl user=((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        post.setOwnerUserId(user.getId());
        post.setPostTypeId(1);
        post.setOwnerDisplayName(user.getDisplayName());
        post.setCreationDate(new Date());
        post.setLastActivityDate(new Date());
        post.setUpvoteCount(0);
        post.setCommentCount(0);
        EntityModel<Posts> postEntityModel = postsAssembler.toModel(postsRepository.save(post));
        handleQuestionTags(post);
        return ResponseEntity
                .created(postEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(postEntityModel);
    }

    @PostMapping("/posts/create/questions/{id}/answers")
    public ResponseEntity<EntityModel<Posts>> answerQuestion(@PathVariable Integer id, @RequestBody Posts posts) {
        UserDetailsImpl user=((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        posts.setOwnerUserId(user.getId());
        posts.setPostTypeId(2);
        posts.setOwnerDisplayName(user.getDisplayName());
        posts.setCreationDate(new Date());
        posts.setLastActivityDate(new Date());
        posts.setUpvoteCount(0);
        posts.setCommentCount(0);
        posts.setParentId(id);
        EntityModel<Posts> postsEntityModel = postsAssembler.toModel(postsRepository.save(posts));
        return ResponseEntity
                .created(postsEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(postsEntityModel);
    }

    @PutMapping("/posts/edit/questions/{id}")
    public ResponseEntity<EntityModel<Posts>> editQuestion(@PathVariable Integer id, @RequestBody Posts editedQuestion) {
        Posts question = postsRepository.getOne(id);
        question.setBody(editedQuestion.getBody());
        question.setLastEditDate(new Date());
        question.setLastEditorUserId(editedQuestion.getLastEditorUserId());
        question.setLastEditorDisplayName(editedQuestion.getLastEditorDisplayName());
        question.setTags(editedQuestion.getTags());
        handleQuestionTags(editedQuestion);

        EntityModel<Posts> postsEntityModel = postsAssembler.toModel(postsRepository.save(question));

        return ResponseEntity
                .created(postsEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(postsEntityModel);
    }

    @PutMapping("/posts/edit/questions/{qid}/answers/{aid}")
    public ResponseEntity<EntityModel<Posts>> editAnswer(@PathVariable Integer qid, @PathVariable Integer aid, @RequestBody Posts newAnswer) {
        Posts answer = postsRepository.findById(aid).orElseThrow(() -> new AnswerNotFoundException(aid));
        if(!answer.getParentId().equals(qid))
            throw new AnswerNotForQuestionException(aid, qid);
        answer.setBody(newAnswer.getBody());
        answer.setLastEditDate(new Date());
        answer.setLastEditorUserId(newAnswer.getLastEditorUserId());
        answer.setLastEditorDisplayName(newAnswer.getLastEditorDisplayName());

        EntityModel<Posts> postsEntityModel = postsAssembler.toModel(postsRepository.save(answer));
        return ResponseEntity
                .created(postsEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(postsEntityModel);
    }

    @DeleteMapping("/posts/delete/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Integer id) {
        postsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/posts/delete/questions/{qid}/answers/{aid}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Integer qid, @PathVariable Integer aid) {
        Posts answer = postsRepository.findById(aid).orElseThrow(() -> new AnswerNotFoundException(aid));
        if(!answer.getParentId().equals(qid))
            throw new AnswerNotForQuestionException(aid, qid);
        postsRepository.delete(answer);
        return ResponseEntity.noContent().build();
    }

    private void handleQuestionTags(Posts post) {
        allTagsRepository.saveAll(
                post.getTags().stream().map(tag -> {
                    AllTags allTags = new AllTags();
                    allTags.setTag(tag);
                    if(allTagsRepository.findByTag(tag) != null)
                        allTags.setId(allTagsRepository.findByTag(tag).getId());
                    return allTags;
                }).collect(Collectors.toList()));
        List<Integer> tagIds = allTagsRepository.findAllByTagIn(post.getTags())
                .stream().map(AllTags::getId).collect(Collectors.toList());
        tagIds.stream().map(tagIdElement -> {
            Tags tag = new Tags();
            tag.setPostId(post.getId());
            tag.setPostTypeId(post.getPostTypeId());
            tag.setTagId(tagIdElement);
            return tag;
        }).forEach(tags -> tagsRepository.save(tags));
    }
}
