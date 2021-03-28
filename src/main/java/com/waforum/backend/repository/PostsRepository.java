package com.waforum.backend.repository;

import com.waforum.backend.models.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Integer> {
    List<Posts> findAllByParentId(Integer parentId);
    List<Posts> findAllByPostTypeIdOrderByLastActivityDate(Integer postTypeId);
    List<Posts> findAllByOwnerUserIdByPostTypeId(Integer ownerUserId,Integer postTypeId);
}
