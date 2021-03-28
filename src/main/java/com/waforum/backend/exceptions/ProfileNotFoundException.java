package com.waforum.backend.exceptions;

public class ProfileNotFoundException extends RuntimeException {
    public ProfileNotFoundException(Integer Id){
        super("Profile with ID "+Id+" Not found");
    }
}
