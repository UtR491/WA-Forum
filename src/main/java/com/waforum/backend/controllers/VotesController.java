package com.waforum.backend.controllers;

import com.waforum.backend.models.Votes;
import com.waforum.backend.repository.VotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class VotesController {

    @Autowired
    VotesRepository votesRepository;

    @PostMapping("/vote/add")
    public ResponseEntity<?> addVoteOnPost(@RequestBody Votes votes) {
        Votes currentVote = votesRepository.findByUserIdAndPostId(votes.getUserId(), votes.getPostId());
        if(currentVote != null)
            votes.setId(currentVote.getId());

        votesRepository.save(votes);
        return ResponseEntity.ok(votes);
    }

    @PostMapping("/vote/remove")
    public ResponseEntity<?> removeVoteOnPost(@RequestBody Votes votes) {
        System.out.println(votesRepository.findByUserIdAndPostId(votes.getUserId(), votes.getPostId()));
        votesRepository.delete(votesRepository.findByUserIdAndPostId(votes.getUserId(), votes.getPostId()));
        return ResponseEntity.noContent().build();
    }
}
