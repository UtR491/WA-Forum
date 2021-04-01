package com.waforum.backend.repository;

import com.waforum.backend.models.AllTags;
import com.waforum.backend.models.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllTagsRepository extends JpaRepository<AllTags, Integer> {
    List<AllTags> findAllByTagIn(List<String> tag);
    List<AllTags> findByTagIn(List<String> tag);
}
