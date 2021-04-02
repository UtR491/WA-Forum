package com.waforum.backend.models;

import org.springframework.hateoas.EntityModel;

import java.util.List;


public class QuestionWithAllAnswerWrapper {

    List<EntityModel<Posts>> answers;
    Posts question, acceptedAnswer;

    public QuestionWithAllAnswerWrapper(Posts question, Posts acceptedAnswer, List<EntityModel<Posts>> answers) {
        this.question = question;
        this.acceptedAnswer = acceptedAnswer;
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
