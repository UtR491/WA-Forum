package com.waforum.backend.util;

import com.waforum.backend.models.FollowStatus;
import com.waforum.backend.models.Following;
import com.waforum.backend.models.User;
import com.waforum.backend.models.UserDetailsImpl;
import com.waforum.backend.repository.FollowersRepository;
import com.waforum.backend.repository.FollowingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserUtil {

    @Autowired
    FollowingRepository followingRepository;

    public void setIsItYou(User user) {
         user.setItYou(user.getId().equals(
                 ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()));
    }

    public void setFollowStatus(User user, UserDetailsImpl currentUser) {
        Integer userId;
        if(currentUser == null) {
            userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                    .getId();
        } else {
            userId = currentUser.getId();
        }
        Following following = followingRepository.findByUserIdAndFollowingId(userId, user.getId());
        if(following == null) {
            user.setFollowStatus(FollowStatus.YOU_DONT);
        } else {
            user.setFollowStatus(FollowStatus.YOU_FOLLOW);
        }
    }
}
