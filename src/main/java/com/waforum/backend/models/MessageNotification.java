package com.waforum.backend.models;

public class MessageNotification {
    private Integer Id;
    private Integer senderUserId;
    private Integer recipientUserId;

    public MessageNotification(Integer id, Integer senderUserId, Integer recipientUserId) {
        Id = id;
        this.senderUserId = senderUserId;
        this.recipientUserId = recipientUserId;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
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
