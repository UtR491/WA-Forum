package com.waforum.backend.models;

import org.springframework.hateoas.EntityModel;

public class SingleQuestionAnswerWrapper {
    EntityModel<Posts> question,answer;

    public SingleQuestionAnswerWrapper(EntityModel<Posts> question, EntityModel<Posts> answer) {
        this.question = question;
        this.answer = answer;
    }

    public EntityModel<Posts> getQuestion() {
        return question;
    }

    public void setQuestion(EntityModel<Posts> question) {
        this.question = question;
    }

    public EntityModel<Posts> getAnswer() {
        return answer;
    }

    public void setAnswer(EntityModel<Posts> answer) {
        this.answer = answer;
    }
}
