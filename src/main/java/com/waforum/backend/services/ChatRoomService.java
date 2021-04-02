package com.waforum.backend.services;

import com.waforum.backend.models.ChatRoom;
import com.waforum.backend.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {
    @Autowired
    ChatRoomRepository chatRoomRepository;

    public Optional<Integer> getChatId(Integer senderUserId,Integer recipientUserId,boolean createIfDoesNotExist){
        return chatRoomRepository
                .findBySenderUserIdAndRecipientUserId(senderUserId, recipientUserId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if(!createIfDoesNotExist) {
                        return  Optional.empty();
                    }
                    Integer chatId =
                            Integer.parseInt(String.format("%s%s", senderUserId, recipientUserId));

                    chatRoomRepository.save(new ChatRoom(chatId,senderUserId,recipientUserId));
                    chatRoomRepository.save(new ChatRoom(chatId,recipientUserId,senderUserId));

                    return Optional.of(chatId);
                });
    }
}
