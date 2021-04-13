package com.waforum.backend.repository;

import com.waforum.backend.models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments,Integer> {
    List<Comments> findAllByPostId(Integer Id);
    List<Comments> findAllByUserId(Integer Id);
}
