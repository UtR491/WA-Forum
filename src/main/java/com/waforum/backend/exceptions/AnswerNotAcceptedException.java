package com.waforum.backend.exceptions;

public class AnswerNotAcceptedException extends RuntimeException {
    public AnswerNotAcceptedException(Integer qid,Integer aid){
        super("Answer with id: "+aid+" to the question: "+qid+" cannot be accepted");
    }
}
