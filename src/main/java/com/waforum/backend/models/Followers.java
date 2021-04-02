package com.waforum.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "followerData")
public class Followers {
    @GeneratedValue @Id
    private Integer Id;
    private Integer userId,followerId;

    public Followers(Integer userId, Integer followerId) {
        this.userId = userId;
        this.followerId = followerId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Integer followerId) {
        this.followerId = followerId;
    }
}
