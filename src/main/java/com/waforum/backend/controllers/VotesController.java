package com.waforum.backend.controllers;

import com.waforum.backend.models.Votes;
import com.waforum.backend.repository.VotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VotesController {

    @Autowired
    VotesRepository votesRepository;

    @PostMapping("/vote/add")
    public ResponseEntity<?> addVoteOnPost(@RequestBody Votes votes) {
        votesRepository.save(votes);
        return ResponseEntity.ok(votes);
    }

    @PostMapping("/vote/remove")
    public ResponseEntity<?> removeVoteOnPost(@RequestBody Votes votes) {
        votesRepository.delete(votes);
        return ResponseEntity.noContent().build();
    }
}
