package com.waforum.backend.repository;

import com.waforum.backend.models.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepository extends JpaRepository<Posts, Integer> {
    List<Posts> findAllByParentId(Integer parentId);
    List<Posts> findAllByPostTypeIdOrderByLastActivityDate(Integer postTypeId);
    List<Posts> findAllByPostTypeIdAndOwnerUserId(Integer postTypeId, Integer ownerUserId);
    @Query(value = "select * from Posts where ( select count(*) from Tags where Tags.postID=Posts.id and Tags.tagID in ?1)=?2",
    nativeQuery = true)
    List<Posts> findAllByTags(List<Integer> tags, int size);
    Posts findOneByParentId(Integer parentId);
}
