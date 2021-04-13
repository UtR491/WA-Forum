package com.waforum.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ChatRoom {
    @Id @GeneratedValue
    private Integer Id;
    private Integer chatId;
    private Integer senderUserId;
    private Integer recipientUserId;

    public ChatRoom(Integer chatId, Integer senderUserId, Integer recipientUserId) {

        this.chatId = chatId;
        this.senderUserId = senderUserId;
        this.recipientUserId = recipientUserId;
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
}
