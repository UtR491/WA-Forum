package com.waforum.backend.exceptions;

public class CanNotEditProfileException extends RuntimeException {
    public CanNotEditProfileException() {
        super("Can not edit someone else's profile");
    }
}
