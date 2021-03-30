package com.waforum.backend.models;

import java.util.List;


public class QuestionWithAllAnswerWrapper {
    Posts question;
    List<Posts>answers;

    public QuestionWithAllAnswerWrapper(Posts question, List<Posts> answers) {
        this.question = question;
        this.answers = answers;
    }

    public Posts getQuestion() {
        return question;
    }

    public void setQuestion(Posts question) {
        this.question = question;
    }

    public List<Posts> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Posts> answers) {
        this.answers = answers;
    }
}
