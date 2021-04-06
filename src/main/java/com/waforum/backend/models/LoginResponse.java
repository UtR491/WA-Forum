package com.waforum.backend.models;

public class LoginResponse {

    private AuthenticationResponse jwt;
    private Integer id;

    public LoginResponse(String jwt, Integer id) {
        this.jwt = new AuthenticationResponse(jwt);
        this.id = id;
    }

    public AuthenticationResponse getJwt() {
        return jwt;
    }

    public void setJwt(AuthenticationResponse jwt) {
        this.jwt = jwt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
