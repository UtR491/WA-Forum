package com.waforum.backend.models;

public class SingleQuestionAnswerWrapper {
    Posts question,answer;

    public SingleQuestionAnswerWrapper(Posts question, Posts answer) {
        this.question = question;
        this.answer = answer;
    }

    public Posts getQuestion() {
        return question;
    }

    public void setQuestion(Posts question) {
        this.question = question;
    }

    public Posts getAnswer() {
        return answer;
    }

    public void setAnswer(Posts answer) {
        this.answer = answer;
    }
}
