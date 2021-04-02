package com.waforum.backend.models;

import java.util.List;


public class QuestionWithAllAnswerWrapper {
    Posts question,acceptedAnswer;
    List<Posts>answers;

    public QuestionWithAllAnswerWrapper(Posts question, Posts acceptedAnswer, List<Posts> answers) {
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

    public List<Posts> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Posts> answers) {
        this.answers = answers;
    }
}
