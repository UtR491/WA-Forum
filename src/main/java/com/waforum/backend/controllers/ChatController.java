package com.waforum.backend.controllers;

import com.waforum.backend.exceptions.MessageNotFoundException;
import com.waforum.backend.models.*;
import com.waforum.backend.repository.MessageRepository;
import com.waforum.backend.repository.UserRepository;
import com.waforum.backend.services.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@RestController
public class ChatController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    ChatRoomService chatRoomService;
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserRepository userRepository;


    @MessageMapping("/chat")
    @SendTo("/user/chat")
    public void processMessage(@Payload Messages message){
        Optional<Integer> chatId=chatRoomService.getChatId(message.getSenderUserId(),message.getRecipientUserId(),true);
        message.setChatId(chatId.get());
        Messages saved = messageRepository.save(message);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getRecipientUserId()),
                "/user/chat",
                new MessageNotification(saved.getId(),saved.getSenderUserId(),saved.getRecipientUserId()));
    }
    @GetMapping("/api/messages/{sid}/{rid}/count")
    public ResponseEntity<Integer>countNewMessages(@PathVariable Integer sid,@PathVariable Integer rid){
        return ResponseEntity.ok(messageRepository.countBySenderUserIdAndRecipientUserIdAndStatus(sid,rid, MessageStatus.DELIVERED));
    }
    @GetMapping("/api/messages/{sid}/{rid}")
    public ResponseEntity<?>findMessages(@PathVariable Integer sid,@PathVariable Integer rid){
        Optional<Integer> chatId = chatRoomService.getChatId(sid, rid, false);
        List<Messages>messagesList=chatId.map(cId->messageRepository.findByChatId(cId)).orElse(new ArrayList<>());
        if(messagesList.size()>0){
            updateStatuses(sid,rid,MessageStatus.DELIVERED);
        }
        return ResponseEntity.ok(messagesList);
    }
    @GetMapping("/api/messages/{id}")
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
    @GetMapping(value = "/users/summaries", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findAllUserSummaries(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(userRepository
                .findAll()
                .stream()
                .map((Function<User, Object>) UserDetailsImpl::new)
                .filter(user -> !((UserDetailsImpl) user).getUsername().equals(userDetails.getUsername()))
                );
    }

    @GetMapping(value = "/users/me", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public UserDetailsImpl getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return userDetails;
    }

    @GetMapping(value = "/users/summary/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserSummary(@PathVariable("username") String username) {
        return  ResponseEntity.ok(new UserDetailsImpl(userRepository
                .findByRegistrationNumber(Integer.parseInt(username))));
    }

}
