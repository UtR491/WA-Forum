package com.waforum.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

@Entity(name = "followingData")
public class Following {
    @GeneratedValue @javax.persistence.Id
    private Integer Id;
    private Integer userId, followingId;

    public Following(Integer userId, Integer followingId) {
        this.userId = userId;
        this.followingId = followingId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFollowingId() {
        return followingId;
    }

    public void setFollowingId(Integer followingId) {
        this.followingId = followingId;
    }
}
