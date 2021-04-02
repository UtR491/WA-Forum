package com.waforum.backend.controllers;

import com.waforum.backend.assemblers.PostsAssembler;
import com.waforum.backend.assemblers.QuestionWithAllAnswerWrapperAssembler;
import com.waforum.backend.assemblers.SingleQuestionAnswerWrapperAssembler;
import com.waforum.backend.exceptions.AnswerNotForQuestionException;
import com.waforum.backend.exceptions.AnswerNotFoundException;
import com.waforum.backend.exceptions.QuestionNotFoundException;
import com.waforum.backend.models.Posts;
import com.waforum.backend.models.QuestionWithAllAnswerWrapper;
import com.waforum.backend.models.SingleQuestionAnswerWrapper;
import com.waforum.backend.repository.PostsRepository;
import com.waforum.backend.repository.VotesRepository;
import com.waforum.backend.util.JwtUtil;
import com.waforum.backend.util.PostsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
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



    @GetMapping("/posts/questions")
    public CollectionModel<EntityModel<Posts>> getQuestions() {
        List<EntityModel<Posts>> questions = postsRepository.findAll().stream()
                .map((question) -> {
                    postsUtil.setVoteStatus(question, null);
                    System.out.println("Adding post = " + question + " to the list.");
                    return postsAssembler.toModel(question);
                }).collect(Collectors.toList());
        return CollectionModel.of(questions,
                WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PostsController.class).getQuestions())
                        .withSelfRel());
    }

    @GetMapping("/posts/questions/{id}")
    public EntityModel<Posts> getQuestionById(@PathVariable Integer id) {
        Optional<Posts> post = Optional.ofNullable(postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id)));
        postsUtil.setVoteStatus(post.get(), null);
        return postsAssembler.toModel(post.get());
    }

    @GetMapping("/posts/questions/{id}/answers")
    public EntityModel<QuestionWithAllAnswerWrapper> getAnswerByQuestionId(@PathVariable Integer id) {

        Integer acceptedAnswerId = postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id)).getAcceptedAnswerId();
        Optional<Posts> question = Optional.ofNullable(postsRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(id)));
        postsUtil.setVoteStatus(question.get(), null);
        List<Posts> answers = postsRepository.findAllByParentId(id).stream().map(answer -> {
            postsUtil.setVoteStatus(answer, null);
            return answer;
        }).collect(Collectors.toList());
        return questionWithAllAnswerWrapperAssembler.toModel(new QuestionWithAllAnswerWrapper(question.get(),
                acceptedAnswerId==null?
                        null: postsRepository.findById(acceptedAnswerId).orElseThrow(()->new AnswerNotFoundException(acceptedAnswerId)),
                answers));
    }

    @GetMapping("/posts/questions/{qid}/answers/{aid}")
    public EntityModel<SingleQuestionAnswerWrapper> getAnswerByIdByQuestionId(@PathVariable Integer qid, @PathVariable Integer aid) {

        Optional<Posts> question = Optional.ofNullable(postsRepository.findById(qid).orElseThrow(() -> new QuestionNotFoundException(qid)));
        postsUtil.setVoteStatus(question.get(), null);
        Optional<Posts> answer = Optional.ofNullable(postsRepository.findById(aid).orElseThrow(() -> new AnswerNotForQuestionException(aid, qid)));
        postsUtil.setVoteStatus(answer.get(), null);
        return singleQuestionAnswerWrapperAssembler.toModel(new SingleQuestionAnswerWrapper(question.get(), answer.get()));
    }

    @PostMapping("/posts/create/questions")
    public ResponseEntity<EntityModel<Posts>> askQuestion(@RequestBody Posts post) {
        System.out.println("Hellooooooooooo");
        EntityModel<Posts> postEntityModel = postsAssembler.toModel(postsRepository.save(post));
        return ResponseEntity
                .created(postEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(postEntityModel);
    }

    @PostMapping("/posts/create/questions/{id}/answers")
    public ResponseEntity<EntityModel<Posts>> answerQuestion(@PathVariable Integer id, @RequestBody Posts posts) {
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
}
