package com.waforum.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Comments {
   @GeneratedValue @Id
   private Integer Id;
   private Integer postId;
   private String body;
   private Date creationDate;
   private String userDisplayName;
   private Integer userId;

   public Comments(){}

   public Comments(Integer id, Integer postId, String body, Date creationDate, String userDisplayName, Integer userId) {
        Id = id;
        this.postId = postId;
        this.body = body;
        this.creationDate = creationDate;
        this.userDisplayName = userDisplayName;
        this.userId = userId;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getUserDisplayName() {
        return userDisplayName;
    }

    public void setUserDisplayName(String userDisplayName) {
        this.userDisplayName = userDisplayName;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Comments{"+
                "id="+Id+
                "postId="+postId+
                "body="+body+
                "creationDate="+creationDate+
                "userDisplayName="+userDisplayName+
                "userId="+userId+
                "}";
    }
}
