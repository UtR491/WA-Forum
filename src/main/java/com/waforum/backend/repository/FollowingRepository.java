package com.waforum.backend.repository;

import com.waforum.backend.models.Following;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowingRepository extends JpaRepository<Following, Integer> {
    List<Following> findAllByUserId(Integer userId);
    Following findByUserIdAndFollowingId(Integer userId, Integer followingId);
}
