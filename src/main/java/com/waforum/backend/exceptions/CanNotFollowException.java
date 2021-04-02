package com.waforum.backend.exceptions;

public class CanNotFollowException extends RuntimeException {
    private Integer id;
    public CanNotFollowException(Integer id){
        super("Can Not Follow User with ID: "+id);
    }
}
