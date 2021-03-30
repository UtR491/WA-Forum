package com.waforum.backend.models;

public class AuthenticationRequest {
    private String registrationNumber;
    private String password;

    public AuthenticationRequest(String registrationNumber, String password) {
        this.registrationNumber = registrationNumber;
        this.password = password;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthenticationRequest{" +
                "registrationNumber='" + registrationNumber + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
