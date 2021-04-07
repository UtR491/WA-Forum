package com.waforum.backend.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private Integer id;
    private Integer registrationNumber;
    private Integer contribution;
    private String displayName;
    private String aboutMe;
    private String github;
    private String codechef;
    private String codeforces;
    private String email;
    private String password;

    public UserDetailsImpl() {}

    public UserDetailsImpl(User user) {
        this.id = user.getId();
        this.registrationNumber = user.getRegistrationNumber();
        this.contribution = user.getContribution();
        this.displayName = user.getDisplayName();
        this.aboutMe = user.getAboutMe();
        this.github = user.getGithub();
        this.codechef = user.getCodechef();
        this.codeforces = user.getCodeforces();
        this.email = user.getEmail();
        this.password = user.getPassword();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return String.valueOf(registrationNumber);
    }

    public Integer getRegistrationNumber() {
        return registrationNumber;
    }

    public Integer getContribution() {
        return contribution;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public String getGithub() {
        return github;
    }

    public String getCodechef() {
        return codechef;
    }

    public String getCodeforces() {
        return codeforces;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "UserDetailsImpl{" +
                "registrationNumber=" + registrationNumber +
                ", contribution=" + contribution +
                ", displayName='" + displayName + '\'' +
                ", aboutMe='" + aboutMe + '\'' +
                ", github='" + github + '\'' +
                ", codechef='" + codechef + '\'' +
                ", codeforces='" + codeforces + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
