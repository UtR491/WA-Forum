package com.waforum.backend.controllers;

import com.waforum.backend.models.Posts;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostsController {

    @GetMapping("/posts/questions")
    public CollectionModel<EntityModel<Posts>> getQuestions() {

    }

    @GetMapping("/posts/questions/{id}")
    public EntityModel<Posts> getQuestionById(@PathVariable Integer id) {

    }

    @GetMapping("/posts/questions/{id}/answers/")
    public CollectionModel<EntityModel<Posts>> getAnswerByQuestionId(@PathVariable Integer id) {

    }

    @GetMapping("/posts/questions/{qid}/answers/{aid}")
    public EntityModel<Posts> getAnswerByIdByQuestionId(@PathVariable Integer qid, @PathVariable Integer aid) {

    }

    @PostMapping("/posts/create/questions/")
    public ResponseEntity<EntityModel<Posts>> askQuestion() {

    }

    @PostMapping("/posts/create/questions/{id}/answers/")
    public ResponseEntity<EntityModel<Posts>> answerQuestion(@PathVariable Integer id) {

    }

    @PutMapping("/posts/edit/questions/{id}")
    public ResponseEntity<EntityModel<Posts>> editQuestion(@PathVariable Integer id) {

    }

    @PutMapping("/posts/edit/questions/{qid}/answers/{aid}")
    public ResponseEntity<EntityModel<Posts>> editAnswer(@PathVariable Integer qid, @PathVariable Integer aid) {

    }

    @DeleteMapping("/posts/delete/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Integer id) {

    }

    @DeleteMapping("/posts/delete/questions/{qid}/answers/{aid}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Integer qid, @PathVariable Integer aid) {

    }

}
