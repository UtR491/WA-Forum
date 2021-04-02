package com.waforum.backend.repository;

import com.waforum.backend.models.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Integer> {
    Optional<ChatRoom> findBySenderUserIdAndRecipientUserId(Integer senderUserId,Integer recipientUserId);
}
