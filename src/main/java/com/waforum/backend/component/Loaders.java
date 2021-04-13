package com.waforum.backend.component;

import com.waforum.backend.elasticrepository.PostsSearchRepository;
import com.waforum.backend.models.Posts;
import com.waforum.backend.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
public class Loaders {

    @Autowired
    PostsSearchRepository postsSearchRepository;
    @Autowired
    PostsRepository postsRepository;
    @Autowired
    ElasticsearchOperations elasticsearchOperations;

    @PostConstruct
    @Transactional
    public void loadAll(){
        elasticsearchOperations.putMapping(Posts.class);
        postsSearchRepository.saveAll(postsRepository.findAll());
    }
}
