package com.waforum.backend.elasticrepository;


import com.waforum.backend.models.Posts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface PostsSearchRepository extends ElasticsearchRepository<Posts,Integer> {
    List<Posts> findByBody(String body);
    List<Posts> findByOwnerDisplayName(String name);
}
