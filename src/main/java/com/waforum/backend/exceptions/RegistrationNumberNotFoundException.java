package com.waforum.backend.exceptions;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class RegistrationNumberNotFoundException extends UsernameNotFoundException {
    public RegistrationNumberNotFoundException(Integer registrationNumber) {
        super("Registration number " + registrationNumber + " not found in the database");
    }
}
