package com.waforum.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Messages {
    @GeneratedValue @Id
    private Integer Id;
    private Integer chatId;
    private Integer senderUserId;
    private Integer recipientUserId;
    private String senderName;
    private String recipientName;
    private String content;
    private Date timestamp;
    private MessageStatus status;

    public Messages() {
    }

    public Messages(Integer id, Integer chatId, Integer senderUserId, Integer recipientUserId, String senderName, String recipientName, String content, Date timestamp, MessageStatus status) {
        Id = id;
        this.chatId = chatId;
        this.senderUserId = senderUserId;
        this.recipientUserId = recipientUserId;
        this.senderName = senderName;
        this.recipientName = recipientName;
        this.content = content;
        this.timestamp = timestamp;
        this.status = status;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public Integer getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(Integer senderUserId) {
        this.senderUserId = senderUserId;
    }

    public Integer getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(Integer recipientUserId) {
        this.recipientUserId = recipientUserId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }
}
