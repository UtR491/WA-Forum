package com.waforum.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Tags {

    private @GeneratedValue @Id Integer id;
    private Integer postTypeId;
    private Integer tagId;
    private Integer postId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPostTypeId() {
        return postTypeId;
    }

    public void setPostTypeId(Integer postTypeId) {
        this.postTypeId = postTypeId;
    }

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
