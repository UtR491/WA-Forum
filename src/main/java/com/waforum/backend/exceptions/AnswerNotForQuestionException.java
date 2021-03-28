package com.waforum.backend.exceptions;

public class AnswerNotForQuestionException extends RuntimeException {
    public AnswerNotForQuestionException(Integer aid, Integer qid) {
        super("Answer with id " + aid + " not for question with id " + qid);
    }
}
