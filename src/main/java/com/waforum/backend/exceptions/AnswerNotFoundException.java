package com.waforum.backend.exceptions;

public class AnswerNotFoundException extends RuntimeException {
    public AnswerNotFoundException(Integer aid) {
        super("Answer with id " + aid + " not found.");
    }
}
