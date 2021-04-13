package com.waforum.backend.models;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Date;
import java.util.List;

@Entity
@Document(indexName = "waforum", shards = 2)
public class Posts {
    @GeneratedValue @Id
    private Integer id;
    private Integer postTypeId;
    private Integer acceptedAnswerId;
    private Integer parentId;
    private Date creationDate;
    private int upvoteCount;
    private String body;
    private Integer ownerUserId;
    private String ownerDisplayName;
    private Integer lastEditorUserId;
    private String lastEditorDisplayName;
    private Date lastEditDate;
    private Date lastActivityDate;
    private int answerCount;
    private int commentCount;
    @Transient
    private VoteType currentHasVoted;
    @Transient
    private List<String> tags;

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

    public Integer getAcceptedAnswerId() {
        return acceptedAnswerId;
    }

    public void setAcceptedAnswerId(Integer acceptedAnswerId) {
        this.acceptedAnswerId = acceptedAnswerId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public int getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(int upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Integer getOwnerUserId() {
        return ownerUserId;
    }

    public void setOwnerUserId(Integer ownerUserId) {
        this.ownerUserId = ownerUserId;
    }

    public String getOwnerDisplayName() {
        return ownerDisplayName;
    }

    public void setOwnerDisplayName(String ownerDisplayName) {
        this.ownerDisplayName = ownerDisplayName;
    }

    public Integer getLastEditorUserId() {
        return lastEditorUserId;
    }

    public void setLastEditorUserId(Integer lastEditorUserId) {
        this.lastEditorUserId = lastEditorUserId;
    }

    public String getLastEditorDisplayName() {
        return lastEditorDisplayName;
    }

    public void setLastEditorDisplayName(String lastEditorDisplayName) {
        this.lastEditorDisplayName = lastEditorDisplayName;
    }

    public Date getLastEditDate() {
        return lastEditDate;
    }

    public void setLastEditDate(Date lastEditDate) {
        this.lastEditDate = lastEditDate;
    }

    public Date getLastActivityDate() {
        return lastActivityDate;
    }

    public void setLastActivityDate(Date lastActivityDate) {
        this.lastActivityDate = lastActivityDate;
    }

    public int getAnswerCount() {
        return answerCount;
    }

    public void setAnswerCount(int answerCount) {
        this.answerCount = answerCount;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public VoteType getCurrentHasVoted() {
        return currentHasVoted;
    }

    public void setCurrentHasVoted(VoteType currentHasVoted) {
        this.currentHasVoted = currentHasVoted;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Posts{" +
                "id=" + id +
                ", postTypeId=" + postTypeId +
                ", acceptedAnswerId=" + acceptedAnswerId +
                ", parentId=" + parentId +
                ", creationDate=" + creationDate +
                ", upvoteCount=" + upvoteCount +
                ", body='" + body + '\'' +
                ", ownerUserId=" + ownerUserId +
                ", ownerDisplayName='" + ownerDisplayName + '\'' +
                ", lastEditorUserId=" + lastEditorUserId +
                ", lastEditorDisplayName='" + lastEditorDisplayName + '\'' +
                ", lastEditDate=" + lastEditDate +
                ", lastActivityDate=" + lastActivityDate +
                ", answerCount=" + answerCount +
                ", commentCount=" + commentCount +
                '}';
    }
}
