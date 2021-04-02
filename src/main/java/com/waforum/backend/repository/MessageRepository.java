package com.waforum.backend.repository;

import com.waforum.backend.models.MessageStatus;
import com.waforum.backend.models.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Messages, Integer> {
    Integer countBySenderUserIdAndRecipientUserIdAndStatus(Integer senderUserId, Integer recipientUserId, MessageStatus status);
    List<Messages>findByChatId(Integer chatId);
    List<Messages>findAllBySenderUserIdAndRecipientUserId(Integer senderUserId, Integer recipientUserId);
}
