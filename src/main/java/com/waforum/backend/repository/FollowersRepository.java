package com.waforum.backend.repository;

import com.waforum.backend.models.Followers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowersRepository extends JpaRepository<Followers,Integer> {
    List<Followers> findAllByUserId(Integer userId);
}
