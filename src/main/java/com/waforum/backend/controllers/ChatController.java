package com.waforum.backend.controllers;

import com.waforum.backend.exceptions.MessageNotFoundException;
import com.waforum.backend.models.MessageNotification;
import com.waforum.backend.models.MessageStatus;
import com.waforum.backend.models.Messages;
import com.waforum.backend.repository.MessageRepository;
import com.waforum.backend.services.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ChatController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    ChatRoomService chatRoomService;
    @Autowired
    MessageRepository messageRepository;

    @MessageMapping("/chat")
    public void processMessage(@Payload Messages message){
        Optional<Integer> chatId=chatRoomService.getChatId(message.getSenderUserId(),message.getRecipientUserId(),true);
        message.setChatId(chatId.get());
        Messages saved = messageRepository.save(message);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getRecipientUserId()),
                "/queue/messages",
                new MessageNotification(saved.getId(),saved.getSenderUserId(),saved.getRecipientUserId()));
    }
    @GetMapping("/messages/{sid}/{rid}/count")
    public ResponseEntity<Integer>countNewMessages(@PathVariable Integer sid,@PathVariable Integer rid){
        return ResponseEntity.ok(messageRepository.countBySenderUserIdAndRecipientUserIdAndStatus(sid,rid, MessageStatus.DELIVERED));
    }
    @GetMapping("/messages/{sid}/{rid}")
    public ResponseEntity<?>findMessages(@PathVariable Integer sid,@PathVariable Integer rid){
        Optional<Integer> chatId = chatRoomService.getChatId(sid, rid, false);
        List<Messages>messagesList=chatId.map(cId->messageRepository.findByChatId(cId)).orElse(new ArrayList<>());
        if(messagesList.size()>0){
            updateStatuses(sid,rid,MessageStatus.DELIVERED);
        }
        return ResponseEntity.ok(messagesList);
    }
    @GetMapping("/messages/{id}")
    public ResponseEntity<?>findMessage(@PathVariable Integer id){
        return ResponseEntity.ok(messageRepository.findById(id).map(messages -> {
            messages.setStatus(MessageStatus.DELIVERED); return messageRepository.save(messages);})
                .orElseThrow(()-> new MessageNotFoundException(id)));
    }
    public void updateStatuses(Integer sid,Integer rid,MessageStatus status){
        List<Messages>messagesList=messageRepository.findAllBySenderUserIdAndRecipientUserId(sid,rid);
        for (Messages m: messagesList) {
            m.setStatus(status);
            messageRepository.save(m);
        }
    }
}
