package com.waforum.backend.repository;

import com.waforum.backend.models.Votes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface VotesRepository extends JpaRepository<Votes, Integer> {
    Votes findByUserIdAndPostId(Integer userId, Integer postId);
    List<Votes> findAllByPostId(Integer postId);
    List<Votes> findAllByPostIdAndTypeOf(Integer id, Integer typeOf);
}
