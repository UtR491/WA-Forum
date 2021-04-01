package com.waforum.backend.repository;

import com.waforum.backend.models.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagsRepository extends JpaRepository<Tags, Integer> {
    List<Tags> findAllByPostId(Integer postId);
}
