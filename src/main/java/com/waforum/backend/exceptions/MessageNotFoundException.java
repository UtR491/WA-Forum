package com.waforum.backend.exceptions;

public class MessageNotFoundException extends RuntimeException {
    public MessageNotFoundException(Integer id){
        super("Message With Id: "+id+" not found");
    }
}
