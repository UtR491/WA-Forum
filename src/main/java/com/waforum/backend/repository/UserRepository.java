package com.waforum.backend.repository;

import com.waforum.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByRegistrationNumber(Integer registrationNumber);
}
