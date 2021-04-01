package com.waforum.backend.models;

import org.springframework.hateoas.EntityModel;

import java.util.List;


public class QuestionWithAllAnswerWrapper {
    Posts question;
    List<EntityModel<Posts>> answers;

    public QuestionWithAllAnswerWrapper(Posts question, List<EntityModel<Posts>> answers) {
        this.question = question;
        this.answers = answers;
    }

    public Posts getQuestion() {
        return question;
    }

    public void setQuestion(Posts question) {
        this.question = question;
    }

    public List<EntityModel<Posts>> getAnswers() {
        return answers;
    }

    public void setAnswers(List<EntityModel<Posts>> answers) {
        this.answers = answers;
    }
}
