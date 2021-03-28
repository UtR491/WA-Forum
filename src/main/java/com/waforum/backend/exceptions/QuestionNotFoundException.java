package com.waforum.backend.exceptions;

public class QuestionNotFoundException extends RuntimeException {
    public QuestionNotFoundException(Integer id) {
        super("Could not find question with ID " + id);
    }
}
