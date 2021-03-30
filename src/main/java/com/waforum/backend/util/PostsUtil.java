package com.waforum.backend.util;

import com.waforum.backend.models.Posts;
import com.waforum.backend.models.UserDetailsImpl;
import com.waforum.backend.models.VoteType;
import com.waforum.backend.models.Votes;
import com.waforum.backend.repository.VotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PostsUtil {

    @Autowired
    VotesRepository votesRepository;

    public boolean postIsAnswer(Posts posts) {
        Integer postTypeId = posts.getPostTypeId();
        // TODO Hard coded for now, make a table of postTypeIds as well.
        return postTypeId == 2;
    }

    public void setVoteStatus(Posts posts, UserDetailsImpl userDetails) {
        Integer userId;
        if(userDetails == null) {
            System.out.println("UserDetails is null.");
            System.out.println("So userdetails impl is :::::::");
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            userId = ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                    .getId();
        }
        else
            userId = userDetails.getId();
        Votes vote = votesRepository.findByUserIdAndPostId(userId, posts.getId());
        if(vote == null)
            posts.setCurrentHasVoted(VoteType.NOTHING);
        else if(vote.getTypeOf() == 1)
            posts.setCurrentHasVoted(VoteType.UPVOTE);
        else
            posts.setCurrentHasVoted(VoteType.DOWNVOTE);
    }
}
